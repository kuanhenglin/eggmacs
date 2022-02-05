import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormText from "../components/FormText"


function isUsernameLegal(username) {
  if (
    username.length < 4 ||             // the username must be
    username.length > 32 ||            // between 4 and 32 characters AND
    !/^[a-zA-Z0-9]+$/i.test(username)  // alphanumetric characters only
  ) {
    return false;
  }
  return true;
}


function SignUp() {
  const [displayName, setDisplayName] = useState(null);
  const [description, setDescription] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const formEntries = [
    {
      label: "Display name",
      placeholder: "The name displayed on your profile to others.",
      onChange: setDisplayName
    },
    {
      label: "Description",
      placeholder: "A short blurb/biography about yourself.",
      onChange: setDescription
    },
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

  const navigate = useNavigate();
  const routeChange = (path) => {  // redirects to input path
    navigate(path);
  }

  async function handleSignUp() {

    if (!isUsernameLegal(username)) {
      window.alert("The username must be between 4 and 32 characters long " +
                   "and only contain alphanumeric characters.");
      return;
    }

    const response = await fetch(  // (try to) get user information by username
      `http://localhost:5000/users/get/${username}`
    )

    if (!response.ok) {  // server connection error
      const message = `An error has occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const user = await response.json();  // get user information (if exists)

    if (user) {  // to sign up, username must have not been taken
      window.alert("The username has already been taken. " +
                   "Did you mean to sign in instead?");
      return;
    }

    const newUser = {
      _id: username,
      password: password,
      displayName: displayName,
      description: description
    };

    await fetch("http://localhost:5000/users/create", {  // create new user
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

    routeChange("/profile");

  }

  return (
    <div>
      <h1>Sign Up</h1>
      <p>Sign up to create an account.</p>
      <FormText
        formEntries={formEntries}
        buttonText="Sign Up"
        onClick={handleSignUp}
      />
    </div>
  )
}


export default SignUp;