import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormText from "../components/FormText";

import {getUser, updateUser, deleteUser} from '../methods/user';

function Profile(props) {
  document.title = "Profile | T-Eggletop";

  const [user, setUser] = useState(null);

  // fetch user information from username cookie
  const username = props.getCookie()?.username;
  useEffect(() => {
    async function getUserInformation() {  // weird workaround to use async
      setUser(await getUser(username));    // function in useEffect
    }
    getUserInformation()
  }, []);

  // The Description Update Form: For now, profile changes act like
  // the drop down menu done for signUp!
  const [displayName, setDisplayName] = useState(null);
  const [description, setDescription] = useState(null);
  const [password, setPassword] = useState(null);
  
  // (thing === null)? user?.thing? user?.thing : "" : thing
  // represents the following logic (necessary to keep <input> controlled)
  // 1) if thing === null (i.e., unchanged), go to 2), otherwise use thing
  // 2) if user?.thing (i.e., user fetched, which has a delay), use information
  //    from user?.thing, otherwise use "" (temporary, keep <input> controlled)

  // "controlled" means the default value of <input> is always defined (never
  // null), as otherwise <input> switches briefly starts with "uncontrolled"
  // for VERY briefly and switches to "controlled", which React warns against
  // see https://reactjs.org/docs/forms.html#controlled-components
  const formEntries = [
    {
      label: "Display name",
      value:
        (displayName === null)? user?.displayName?
        user?.displayName : "" : displayName,
      placeholder: "The name displayed on your profile to others.",
      onChange: setDisplayName,
      onKeyPress: handleEnter
    },
    {
      label: "Description",
      value:
        (description === null)? user?.description?
        user?.description : "" : description,
      placeholder: "A short blurb/biography about yourself.",
      onChange: setDescription,
      onKeyPress: handleEnter
    },
    {
      label: "Password",
      placeholder: "Leave blank if you do not want to change your password.",
      onChange: setPassword,
      onKeyPress: handleEnter
    }
  ]

  function handleEnter(key) {
    if (key === "Enter") handleUpdate()
  }

  const navigate = useNavigate();
  const routeChange = (path) => {  // redirects to input path
    navigate(path);
  }

  function signOut() {
    props.removeCookie("username");  // remove username cookie
    routeChange("/");  // redirect to home page
  }

  function deleteAccount() {
    if (window.confirm("Do you want to proceed with account deletion?")) {
      if (window.confirm(
        "Are you sure? This action is irreversible and EVERYTHING will be " +
        "deleted, including your maps, characters, and assets!"
      )) {
        deleteUser(user._id);
        signOut();
      }
    }
  }

  async function handleUpdate() {
    const newUser = {
      _id: username,
      password: (password == null)? user.password : password,  // if unchanged (null), use original value
      displayName: (displayName === null)? user.displayName: displayName,
      description: (description === null)? user.description: description
    }
    updateUser(newUser);
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>View your profile and map catalog.</p>
      <p>
        <b>Display name:</b> {user?.displayName} <br />
        <b>Description:</b> {user?.description} <br />
        <b>Username:</b> <span className="username">{user?._id}</span> <br />
      </p>

      <div className="form-button">
        <button id="delete-account" onClick={() => deleteAccount()}>
          Delete Account
        </button>
        <button onClick={() => signOut()}>
          Sign Out
        </button>
      </div>

      <h2>Update Profile</h2>
      <FormText
        formEntries={formEntries}
        buttonText="Update"
        onClick={handleUpdate}
      />
    </div>
  )
}

export default Profile;