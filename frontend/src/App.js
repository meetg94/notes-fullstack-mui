import { useState, useEffect } from 'react';
import {Button, Card, Alert} from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import Note from './Components/Note';
import Notification from './Components/Notification';
import RenderNotes from './Components/RenderNotes';
import NoteForm from './Components/NoteForm';
import noteService from './Services/notes'
import loginService from './Services/login';

function App() {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // useEffect(() => {
  //   noteService
  //     .getAll()
  //     .then(initialNotes => {
  //       setNotes(initialNotes)
  //     })
  // }, [])

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

  const handleLogout = async () => {
    localStorage.clear();
    setUser(null)
  }

  return (
    <>
    <div>        
      <div className='main-title'>
        <h2>Note Fly</h2>
        <small>Save your notes on the fly!</small>
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
              <div>
                <div className='login-status-logout-container'>
                  <p>{user.name} logged-in</p>
                  <div>
                    <Button onClick={handleLogout}>Log Out</Button>
                  </div>
                </div>
                <NoteForm
                  addNote={addNote}
                  newNote={newNote}
                  handleNoteChange={handleNoteChange}
                />
                <RenderNotes
                  setNotes={setNotes} 
                  showAll={showAll} 
                  notes={notes} 
                  toggleImportance={toggleImportance}
                  />
            </div>
            <div className='important-button-div'>
              <Button
                className='mui-button'
                style={{ "height": "20px", "background":"green"}} 
                variant='contained'
                onClick={() => setShowAll(!showAll)}>Show {showAll ? 'important' : 'all'} Notes
              </Button>
            </div>
          </div>
        }
      <div className='list-container'>
      <Notification message={errorMessage} />
      </div>
    </div>
        </>
  );
}

export default App;
