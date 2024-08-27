const NoteForm = ({ handleNoteChange, newNote, addNote }) => (
  <form onSubmit={addNote}>
    <input value={newNote} onChange={handleNoteChange} />
    <button type="submit">save</button>
  </form>
)

export default NoteForm
