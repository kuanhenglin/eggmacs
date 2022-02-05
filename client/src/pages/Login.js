import { useState } from "react";

import AccountForm from "../components/AccountForm"

function Login() {

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  async function onCreate() {
    const newUser = {
      _id: username,
      password: password
    };

    await fetch("http://localhost:5000/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
    .catch(error => {
      window.alert(error);
      return;
    });

  }

  return (
    <div>
      <h1>Login</h1>
      <p>Login or create an account.</p>
      <AccountForm
        onCreate={onCreate}
        onLogin={null}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    </div>
  )
}

export default Login;