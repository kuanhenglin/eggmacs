import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FormText from "../components/FormText"

import getUser from "../methods/user";


function SignIn(props) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const formEntries = [
    {
      label: "Username",
      placeholder: "Your unique username for signing in.",
      onChange: setUsername,
      onKeyPress: (() => void 0;)  // empty function (do nothing)
    },
    {
      label: "Password",
      placeholder: "Your un-simple password for signing in.",
      onChange: setPassword,
      onKeyPress: ((e) => {
        if (e === "Enter") handleSignIn();
      })
    }
  ]
  
  const navigate = useNavigate();
  const routeChange = (path) => {  // redirect to input path
    navigate(path);
  }

  async function handleSignIn() {
    const user = await getUser(username);

    if (user && user.password == password) {  // check that password matches
      props.setCookie("username", username, { path: "/" });
      routeChange("/profile");
      return;
    }
    // username does not exist OR password does not match
    window.alert("The username or password is incorrect. " +
                 "Did you mean to sign up instead?");
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
