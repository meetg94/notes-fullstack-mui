function Note({ showAll, note, toggleImportance }) {


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
    </li>
  )
}

export default Note