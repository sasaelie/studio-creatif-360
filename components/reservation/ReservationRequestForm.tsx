'use client'

import { useState, type FormEvent } from 'react'
import { programs } from '@/data/programs'
import { site } from '@/data/site'
import styles from './ReservationRequestForm.module.css'

export default function ReservationRequestForm({ initialProgram = 'conseil' }: { initialProgram?: string }) {
  const [preparedMail, setPreparedMail] = useState<string | null>(null)
  const [formError, setFormError] = useState('')

  function prepareRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const values = new FormData(form)
    const name = String(values.get('name') ?? '').trim()
    const email = String(values.get('email') ?? '').trim()
    const selection = String(values.get('atelier') ?? '')
    const message = String(values.get('message') ?? '').trim()
    const program = programs.find(item => item.id === selection)
    if (!name || !email || (!program && selection !== 'conseil')) {
      console.error('[ReservationRequestForm.tsx > prepareRequest] Données de demande invalides ; état reçu :', { namePresent: Boolean(name), emailPresent: Boolean(email), atelier: selection })
      setPreparedMail(null)
      setFormError('Vérifiez votre nom, votre adresse e-mail et l’atelier sélectionné.')
      return
    }
    const workshop = program ? `${program.day} — ${program.audience} — ${program.schedule}` : 'Je souhaite être conseillé'
    const body = `Bonjour,\n\nJe souhaite me renseigner sur un atelier.\nAtelier : ${workshop}\nNom : ${name}\nAdresse de réponse : ${email}\n\n${message}\n\nMerci de me confirmer la disponibilité et les modalités de réservation.`
    setPreparedMail(`mailto:${site.email}?subject=${encodeURIComponent('Demande d’atelier — ' + workshop)}&body=${encodeURIComponent(body)}`)
  }

  return <form className={styles.form} onSubmit={prepareRequest} onChange={() => { setPreparedMail(null); setFormError('') }}>
    <div className={styles.fields}>
      <label htmlFor="request-name">Votre nom<input id="request-name" name="name" autoComplete="name" required maxLength={120} /></label>
      <label htmlFor="request-email">Votre adresse e-mail<input id="request-email" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
    </div>
    <label htmlFor="request-workshop">Atelier souhaité<select id="request-workshop" name="atelier" defaultValue={initialProgram}>
      <option value="conseil">Je souhaite être conseillé</option>
      {programs.map(program => <option key={program.id} value={program.id}>{program.day} — {program.audience} — {program.schedule}</option>)}
    </select></label>
    <label htmlFor="request-message">Votre message<textarea id="request-message" name="message" rows={4} maxLength={2000} placeholder="Votre projet, vos questions ou vos disponibilités…" /></label>
    <p className={styles.note}>Ce formulaire prépare un e-mail. Votre messagerie vous permettra de relire et d’envoyer votre demande. La réservation sera confirmée directement par l’association.</p>
    <button type="submit" className="button-primary">Préparer ma demande</button>
    {formError ? <p role="alert">{formError}</p> : null}
    {preparedMail ? <div role="status" className={styles.prepared}>
      <p>Votre demande est prête à être relue dans votre messagerie.</p>
      <a href={preparedMail} className="button-primary">Ouvrir ma messagerie</a>
      <p>Si aucune messagerie n’est configurée, écrivez directement à <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </div> : null}
  </form>
}
