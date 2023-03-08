import { useEffect } from 'react'
import { Card } from '@mui/material'

import Note from './Note'
import noteService from '../Services/notes'

function RenderNotes({ setNotes, showAll, notes, toggleImportance, deleteNote }) {

    useEffect(() => {
        noteService
          .getAll()
          .then(initialNotes => {
            setNotes(initialNotes)
          })
      }, [])

      const notesToShow = showAll
      ? notes
      : notes.filter(note => note.important)

  return (
    <div>
        <div className='list-container'>
      <small>Showing {showAll ? 'all' : 'important'} notes.</small>
        <Card>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            showAll={showAll}
            toggleImportance={() => toggleImportance(note.id)}
            deleteNote={deleteNote}
            />
          )}
          </Card>
          </div>
    </div>
  )
}

export default RenderNotes