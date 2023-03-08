function Note({ showAll, note, toggleImportance, deleteNote }) {


  const label = note.important
    ? 'Important' : 'Not Important'
  return (
    <li className='list-text'>
      {note.content}
      <button 
      color="primary"
      className={note.important ? "note-important" : "not-important"}
      variant="contained"
      onClick={toggleImportance}>
        {label}
      </button>
      <button 
      color="primary"
      // className={}
      variant="contained"
      onClick={() => deleteNote(note.id)}
      >
        Delete
      </button>
    </li>
  )
}

export default Note