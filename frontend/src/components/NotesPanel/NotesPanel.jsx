import { useState, useEffect } from 'react'

function NotesPanel() {
  const [notes, setNotes] = useState(() => {
    return localStorage.getItem('notes') || ''
  });

  useEffect(() => {
    localStorage.setItem('notes', notes);
  }, [notes]);

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