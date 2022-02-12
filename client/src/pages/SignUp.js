import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FormText from "../components/FormText"

import getUser from "../methods/user";


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


function SignUp(props) {
  const [displayName, setDisplayName] = useState(null);
  const [description, setDescription] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

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
    },
    {
      label: "Confirm password",
      placeholder: "Should match with the password you entered above.",
      onChange: setConfirmPassword
    }
  ]

  const navigate = useNavigate();
  const routeChange = (path) => {  // redirect to input path
    navigate(path);
  }

  async function handleSignUp() {

    if (!isUsernameLegal(username)) {
      window.alert("The username must be between 4 and 32 characters long " +
                   "and only contain alphanumeric characters.");
      return;
    }

    if (password != confirmPassword) {
      window.alert("The password and password confirmation do not match.")
      return;
    }

    const user = await getUser(username);

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

    props.setCookie("username", username, { path: "/" });

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