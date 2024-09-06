import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Togglable from "./Togglable"

describe("<Togglable />", () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container
  })

  // Methode findAllByText looks in the dom for all elements that have the text "togglable content"
  test("renders its children", async () => {
    await screen.findAllByText("togglable content")
  })

  // Methode querySelector looks in the dom for the element with the class "togglableContent"
  test("at start the children are not displayed", () => {
    const div = container.querySelector(".togglableContent")
    expect(div).toHaveStyle("display: none")
  })

  // Methode setup is used to create a user object that can be used to simulate user events
  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup()
    const button = screen.getByText("show...")
    await user.click(button)

    const div = container.querySelector(".togglableContent")
    expect(div).not.toHaveStyle("display: none")
  })

  // Methode setup is used to create a user object that can be used to simulate user events
  test("toggled content can be closed", async () => {
    const user = userEvent.setup()
    const button = screen.getByText("show...")
    await user.click(button)

    const closeButton = screen.getByText("cancel")
    await user.click(closeButton)

    const div = container.querySelector(".togglableContent")
    expect(div).toHaveStyle("display: none")
  })
})
