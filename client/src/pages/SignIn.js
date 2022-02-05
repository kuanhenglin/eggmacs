import { useState } from "react";
import { useParams } from "react-router";

import FormText from "../components/FormText"


function SignIn() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const formEntries = [
    {
      label: "Username",
      placeholder: "Your unique username for signing in.",
      onChange: setUsername
    },
    {
      label: "Password",
      placeholder: "Your un-simple password for signing in.",
      onChange: setPassword
    }
  ]

  async function handleSignIn() {
    const response = await fetch(`http://localhost:5000/users/get/${username}`)

    if (!response.ok) {
      const message = `An error has occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const user = await response.json();

    if (user && user.password == password) {
      window.alert("The username or password is incorrect. " +
                   "Did you mean to sign up instead?");
      return;
    }

    window.alert("The username or password is incorrect.")
  }

  return (
    <div>
      <h1>Sign In</h1>
      <p>Sign up to an existing account.</p>
      <FormText
        formEntries={formEntries}
        buttonText="Sign In"
        onClick={handleSignIn}
      />
    </div>
  )
}

export default SignIn;