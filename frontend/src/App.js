import { useState, useEffect } from 'react'
import {Button, Card, Alert} from '@mui/material';

import LoginForm from './Components/LoginForm';
import Note from './Components/Note';
import Notification from './Components/Notification';
import noteService from './Services/notes'
import loginService from './Services/login';
import RegisterForm from './Components/RegisterForm';

function App() {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 6000)
    }
  }

  const addNote = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      date: new Date().toISOString,
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
        }, 6000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const loginForm = () => (
    <form onSubmit={handleLogin}>
    <div>
      username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
    </div>
    <div>
      password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
    </div>
    <button type='submit'>Login</button>
  </form>
  )

  const noteForm = () => (
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
          type="submit">Save
        </Button>
    </form>
  )

  return (
    <div>        
      <div className='main-title'>
        <h2>Note Fly</h2>
        <small>Save your notes on the fly</small>
      </div>
        {user === null ?
          <LoginForm 
            username={username}
            password={password}
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}
            /> : 
          <div>
            <p>{user.name} logged-in</p>
              {noteForm()}
          </div>
        }
      
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
    </div>
  );
}

export default App;
