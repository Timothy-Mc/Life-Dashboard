// import { useState, useEffect } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'

function NotesPanel() {
  const [notes, setNotes] = useLocalStorage('notes', '')

  return (
    <section id="notes">
      <div className="header-row">
        <h2>Notes</h2>
      </div>
      <textarea id="note-textarea" placeholder="Keep your notes here." value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
    </section>
  )
}

export default NotesPanel