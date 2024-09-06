import { render, screen } from "@testing-library/react"
import Note from "./Note"
import userEvent from "@testing-library/user-event"

// Searching for content in a component
test("renders content 1 - getByText", () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  }

  render(<Note note={note} />)

  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  )
  //   expect(element).toBeDefined() // useless assertion to pass the test
})

test("renders content 2 - querySelector & class", () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  }

  const { container } = render(<Note note={note} />)

  const div = container.querySelector(".note")
  expect(div).toHaveTextContent(
    "Component testing is done with react-testing-library"
  )
})

// More consistent way to select element is to use getByTestId method with data-testid attribute
// <div data-testid="note">...</div>
// test("renders content ", () => {
//   const note = {
//     content: "Component testing is done with react-testing-library",
//     important: true,
//   }

//   const component = render(<Note note={note} />)

//   const div = component.getByTestId("note")
//   expect(div).toHaveTextContent(
//     "Component testing is done with react-testing-library"
//   )
// })

test("renders content 3 - test debug", () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  }

  render(<Note note={note} />)

  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  )

  screen.debug(element) // prints the HTML of the element in the console
  screen.debug() // prints the HTML of the component in the console
})

test("clicking the button calls event handler once", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  }

  const mockHandler = vi.fn() // create a mock event handler

  render(<Note note={note} toggleImportance={mockHandler} />)

  const user = userEvent.setup() // setup userEvent
  const button = screen.getByText("make not important")
  await user.click(button) // click the button
  expect(mockHandler.mock.calls).toHaveLength(1) // check if the event handler is called once - mock.calls is an array of calls
})
