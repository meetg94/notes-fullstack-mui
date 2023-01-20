import { useState, useEffect } from 'react'
import {Button, Card, Alert} from '@mui/material';
import axios from 'axios';

import Note from './Components/Note';
import Notification from './Components/Notification';
import noteService from './Services/notes'

function App() {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1
    }
  
  noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const handleNoteChange = (e) => {
    console.log(e.target.value)
    setNewNote(e.target.value)
  }

  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(`Note '${note.content}' was already removed from server.`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>        
      <div className='main-title'>
        <h2>Note Fly</h2>
        <small>Save your notes on the fly</small>
      </div>
      <div className='important-button-div'>
        <Button
        className='mui-button'
        style={{ "height": "20px", "background":"green"}} 
        variant='contained'
        onClick={() => setShowAll(!showAll)}>Show {showAll ? 'important' : 'all'} Notes
        </Button>
      </div>
      <div className='list-container'>
      <small>Showing {showAll ? 'all' : 'important'} notes.</small>
      <Card>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            showAll={showAll}
            toggleImportance={() => toggleImportance(note.id)}
            />
          )}
      </ul>
      </Card>
      <Notification message={errorMessage} />
      </div>
      <form
        className='save-button-container'
        onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
          />
          <Button
          className='mui-button'
          style={{ "height": "20px", "background": "green"}}
          variant='contained' 
          type="submit">Save</Button>
      </form>
    </div>
  );
}

export default App;
