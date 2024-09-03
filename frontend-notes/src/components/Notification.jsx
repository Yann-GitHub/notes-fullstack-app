const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const errorNotificationClass = message.type === "error" ? "toastError" : ""

  return (
    <div className="overlay">
      <div className={`toast ${errorNotificationClass}`}>{message.message}</div>
    </div>
  )
}

export default Notification
