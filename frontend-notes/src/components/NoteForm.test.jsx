import { render, screen } from "@testing-library/react"
import NoteForm from "./NoteForm"
import userEvent from "@testing-library/user-event"

test("<NoteForm /> useless test", async () => {
  const element = screen.findByText("save")
})

// test("<NoteForm /> updates parent state and calls onSubmit", async () => {
//   const addNote = vi.fn()
//   const user = userEvent.setup()

//   render(<NoteForm />)

//   const input = screen.getByRole("textbox")
//   const sendButton = screen.getByText("save")

//   await user.type(input, "testing a form...") // type text to the input
//   await user.click(sendButton)

//   console.log(addNote.mock.calls)

//   expect(createNote.mock.calls).toHaveLength(1)
//   expect(createNote.mock.calls[0][0].content).toBe("testing a form...")
// })
