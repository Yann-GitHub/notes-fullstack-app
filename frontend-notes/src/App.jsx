import { useState, useEffect } from "react"

import Note from "./components/Note"
import Notification from "./components/Notification"
import Footer from "./components/Footer"

import noteService from "./services/notes"

const App = () => {
  // const [notes, setNotes] = useState(props.notes) // if we use the local state and local data
  const [notes, setNotes] = useState([]) // if we use the server state
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  // useEffect(() => {
  //   console.log("effect")
  //   axios.get("http://localhost:3001/notes").then((response) => {
  //     console.log("promise fulfilled")
  //     setNotes(response.data)
  //   })
  // }, [])
  // console.log("render", notes.length, "notes")

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes)
      })
      .catch((error) => {
        alert("Can not fetch data 🙏🏻")
        console.log(error)
      })
  }, [])

  //////// Modification of local state with local data ///////////
  // const addNote = (event) => {
  //   event.preventDefault()
  //   const noteObject = {
  //     content: newNote,
  //     important: Math.random() > 0.5,
  //     id: notes.length + 1,
  //   }

  //   setNotes(notes.concat(noteObject))
  //   setNewNote("")
  // }

  //////// Modification of server state ///////////
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then((returnedNote) => {
        setNotes(notes.concat(returnedNote))
        setNewNote("")
      })
      .catch((error) => {
        alert("Can not add this to the list!! Network error 🤖")
        console.log(error)
        setNewNote("")
      })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const toggleImportanceOf = (id) => {
    // console.log(`importance of ${id} needs to be toggled`)
    // const url = `http://localhost:3001/notes/${id}`
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch((error) => {
        // alert(
        //   `The note with the id '${note.id}' was already deleted from the server 🤷🏻‍♂️`
        // )
        console.log(error.message)
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
