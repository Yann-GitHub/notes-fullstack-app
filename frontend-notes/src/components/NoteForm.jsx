import { useState } from "react"
import noteService from "../services/notes"

const NoteForm = ({ setNotes, notes, setNotificationMessage, noteFormRef }) => {
  const [newNote, setNewNote] = useState("")

  const addNote = async (event) => {
    event.preventDefault()

    try {
      const noteObject = {
        content: newNote,
        important: false,
      }

      const returnedNote = await noteService.create(noteObject)
      setNotes(notes.concat(returnedNote))
      setNewNote("")
      noteFormRef.current.toggleVisibility()
    } catch (error) {
      setNotificationMessage({
        message: "Can not add this to the list!! Network error 🤖",
        type: "error",
      })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      console.log(error)
      setNewNote("")
    }
  }

  return (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={(event) => setNewNote(event.target.value)}
      />
      <button type="submit">save</button>
    </form>
  )
}

export default NoteForm
