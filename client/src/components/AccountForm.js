function whiteSpace(n) {
  let out = "";
  for (let i = 0; i < n; i++) {
    out += "\xa0";
  }
  return out;
}

function AccountForm(props) {

  return (
    <div>
      <p>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => props.setUsername(e.target.value)}
          placeholder="The username must be unique."
        />
      </p>

      <p>
        <label>Password</label>
        <input
          type="text"
          onChange={(e) => props.setPassword(e.target.value)}
          placeholder="Make sure your password is not too simple."
        />
      </p>

      <button onClick={() => props.onCreate()}>
        Create
      </button>
      {whiteSpace(3)}
      <button onClick={() => props.onLogin()}>
        Login
      </button>
    </div>
  )
}

export default AccountForm;