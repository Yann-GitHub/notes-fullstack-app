const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={(event) => setUsername(event.target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={(event) => setPassword(event.target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm
