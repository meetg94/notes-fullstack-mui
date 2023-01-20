import { useState, useEffect } from 'react'
import {Button, Card} from '@mui/material';

import axios from 'axios'
import Note from './Components/Note';
import NotesCard from './Components/NotesCard';



function App() {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [flag, setFlag] = useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      }) 
  }, [])

  const addNote = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
  
  axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      console.log(response)
      setNotes(notes.concat(response.data))
      setNotes(notes.concat(noteObject))
      setNewNote('')
    })
  }

  const handleNoteChange = (e) => {
    console.log(e.target.value)
    setNewNote(e.target.value)
  }

  const toggleImportance = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important}

    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(n => n.id !== id ? n : response.data))
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
