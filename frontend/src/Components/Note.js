import { Card, CardActions, CardContent, Button, Typography } from "@mui/material"

function Note({ note, toggleImportance }) {

  const label = note.important
    ? 'Important' : 'Not Important'
  return (
    <li>
      {note.content}
      <button 
      className="importance-button"
      variant="contained"
      onClick={toggleImportance}>
        {label}
      </button>
    </li>
  )
}

export default Note