import { Button } from '@mui/material';

function NoteForm({addNote, newNote, handleNoteChange}) {
  return (
    <div>
        <form
            className='save-button-container'
            onSubmit={addNote}>
            <input
                value={newNote}
                placeholder='Enter a note.'
                onChange={handleNoteChange}
            />
            <Button
                className='mui-button'
                style={{ "height": "20px", "background": "green"}}
                variant='contained' 
                type="submit">Save
            </Button>
        </form>
    </div>
  )
}

export default NoteForm