import { useState, useEffect } from "react"
import Note from "./components/Note"
import Notification from "./components/Notification"
import Footer from "./components/Footer"
import NoteForm from "./components/NoteForm"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"

import noteService from "./services/notes"

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [user, setUser] = useState(null)

  // Get all notes from the server
  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes)
      })
      .catch((error) => {
        // alert("Can not fetch data 🙏🏻")
        setNotificationMessage({
          message: "Can not fetch data 🙏🏻",
          type: "error",
        })
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)

        console.log(error)
      })
  }, [])

  // Check if the user is already logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch((error) => {
        console.log(error.message)
        setNotificationMessage(
          `Note '${note.content}' was already removed from server 🤷🏻‍♂️`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={notificationMessage} />

      {!user ? (
        <Togglable buttonLabel="log in">
          <LoginForm
            setUser={setUser}
            setNotificationMessage={setNotificationMessage}
          />
        </Togglable>
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <Togglable buttonLabel="new note">
            <NoteForm
              notes={notes}
              setNotes={setNotes}
              setNotificationMessage={setNotificationMessage}
            />
          </Togglable>
        </div>
      )}

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

      <Footer />
    </div>
  )
}

export default App
