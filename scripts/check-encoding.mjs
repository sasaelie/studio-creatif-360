import { readdirSync, readFileSync } from 'node:fs'
import { extname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const decoder = new TextDecoder('utf-8', { fatal: true })
// Un fichier UTF-8 valide peut contenir du texte déjà corrompu par une conversion antérieure.
const corruptedText = /\u00C3[\u0080-\u00BF]|\u00C2[\u0080-\u00BF]|\u00E2[\u0080-\u00BF\u20AC\u2010-\u2027]|\uFFFD/u
const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.css', '.json', '.md'])

function collectFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = resolve(directory, entry.name)
    if (entry.isDirectory()) return collectFiles(path)
    return entry.isFile() && sourceExtensions.has(extname(path)) ? [path] : []
  })
}

function checkFile(path) {
  let content
  try {
    content = decoder.decode(readFileSync(path))
  } catch (error) {
    console.error('[check-encoding.mjs > checkFile] Lecture ou décodage UTF-8 impossible ; fichier reçu :', path, error.message)
    return false
  }
  let valid = true
  content.split(/\r?\n/).forEach((line, index) => {
    if (!corruptedText.test(line)) return
    console.error(`[check-encoding.mjs > checkFile] Texte potentiellement corrompu dans ${relative(projectRoot, path)}:${index + 1} ; valeur reçue :`, line.trim())
    valid = false
  })
  return valid
}

function main() {
  try {
    const requestedFiles = process.argv.slice(2)
    const files = requestedFiles.length
      ? requestedFiles.map(path => resolve(path))
      : [
        ...['app', 'components', 'data', 'hooks', 'scripts'].flatMap(directory => collectFiles(resolve(projectRoot, directory))),
        ...['package.json', 'tailwind.config.js', 'postcss.config.js', 'tsconfig.json', 'README.md'].map(path => resolve(projectRoot, path)),
      ]
    const results = files.map(checkFile)
    if (results.includes(false)) {
      process.exitCode = 1
      return
    }
    console.log(`[check-encoding.mjs > main] ${files.length} fichiers vérifiés : UTF-8 valide, aucune séquence suspecte détectée.`)
  } catch (error) {
    console.error('[check-encoding.mjs > main] Vérification interrompue ; erreur reçue :', error.message)
    process.exitCode = 1
  }
}

main()
