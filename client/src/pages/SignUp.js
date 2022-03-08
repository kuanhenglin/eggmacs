import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

import FormText from "../components/FormText"

import {getObject, createObject} from "../methods/db";


function isUsernameLegal(username) {
  if (
    username.length < 4 ||               // the username must be
    username.length > 32 ||              // between 4 and 32 characters AND
    !/^[a-zA-Z0-9_-]+$/i.test(username)  // alphanumetric characters, dashes,
  ) {                                    // and underscores only
    return false;
  }
  return true;
}

function SignUp(props) {
  document.title = "Sign Up | T-Eggletop";

  const [cookies, setCookie, removeCookie] = useCookies(["username"]);

  const [displayName, setDisplayName] = useState(null);
  const [description, setDescription] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const formEntries = [
    {
      label: "Display name",
      placeholder: "The name displayed on your profile to others.",
      onChange: setDisplayName,
      onKeyPress: handleEnter
    },
    {
      label: "Description",
      placeholder: "A short blurb/biography about yourself.",
      onChange: setDescription,
      onKeyPress: handleEnter
    },
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
    },
    {
      label: "Confirm password",
      placeholder: "Should match with the password you entered above.",
      onChange: setConfirmPassword,
      onKeyPress: handleEnter
    }
  ]

  function handleEnter(key) {
    if (key === "Enter") handleSignUp()
  }

  const navigate = useNavigate();
  const routeChange = (path) => {  // redirects to input path
    navigate(path);
  }

  async function handleSignUp() {
    if (!displayName) {
      window.alert("Your display name cannot be empty.");
      return;
    }
    if (!isUsernameLegal(username)) {
      window.alert("The username must be between 4 and 32 characters long " +
                   "and only contain alphanumeric characters, dashes, and " +
                   "underscores.");
      return;
    }
    if (password !== confirmPassword) {
      window.alert("The password and password confirmation do not match.")
      return;
    }

    const user = await getObject(username, "users");
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
    createObject(newUser, "users");

    setCookie("username", username, { path: "/" });
    routeChange("/user");
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <p><sub>Sign up to create an account.</sub></p>
      <p>
        Already have an account?&nbsp;
        <Link to="/signin" className="hypertext"><i>Sign in here!</i></Link>
      </p>
      <FormText
        formEntries={formEntries}
        buttonText="Sign Up"
        onClick={handleSignUp}
      />
    </div>
  )
}


export default SignUp;