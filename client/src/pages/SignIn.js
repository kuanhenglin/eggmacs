import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import FormText from "../components/FormText"

import {getObject} from "../methods/db";


function SignIn(props) {
  document.title = "Sign In | T-Eggletop";

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const formEntries = [
    {
      label: "Username",
      placeholder: "Your unique username for signing in.",
      onChange: setUsername,
      onKeyPress: handleEnter
    },
    {
      label: "Password",
      placeholder: "Your un-simple password for signing in.",
      onChange: setPassword,
      onKeyPress: handleEnter
    }
  ]

  function handleEnter(key) {
    if (key === "Enter") handleSignIn()
  }
  
  const navigate = useNavigate();
  const routeChange = (path) => {  // redirect to input path
    navigate(path);
  }

  async function handleSignIn() {
    const user = await getObject(username, "users");
 
    if (user && user.password === password) {  // check that password matches
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
      <p>Sign in to an existing account. Don't have an account? <Link to="/signup" className="hypertext">Sign up here!</Link></p>
      <FormText
        formEntries={formEntries}
        buttonText="Sign In"
        onClick={handleSignIn}
      />
    </div>
  )
}


export default SignIn;
