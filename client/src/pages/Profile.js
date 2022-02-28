import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie';

import FormText from "../components/FormText";

import {getObject, updateObject, deleteObject, createObject} from '../methods/db';

function Profile(props) {
  document.title = "Profile | T-Eggletop";

  const [cookies, setCookie, removeCookie] = useCookies(["username"]);

  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);

  // fetch user information from URl params (/user/:username)
  const { username } = useParams();
  useEffect(() => {
    async function getUserInformation() {  // weird workaround to use async
      setUser(await getObject(username, "users"));    // function in useEffect
      setAvatar(await getObject(username, "avatars"));
    }
    getUserInformation()
  }, []);
  // get username of user who is currently signed in
  const usernameViewer = cookies.username;

  // The Description Update Form: For now, profile changes act like
  // the drop down menu done for signUp!
  const [displayName, setDisplayName] = useState(null);
  const [description, setDescription] = useState(null);
  const [password, setPassword] = useState(null);

  const [avatarFile, setAvatarFile] = useState(null);

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
      type: "file",
      label: "Avatar",
      onChange: setAvatarFile,
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
    removeCookie("username", { path: "/" });  // remove username cookie
    routeChange("/");  // redirect to home page
  }

  function refreshPage() {
    window.location.reload();
  }

  function deleteAccount() {
    if (window.confirm("Do you want to proceed with account deletion?")) {
      if (window.confirm(
        "Are you sure? This action is irreversible and EVERYTHING will be " +
        "deleted, including your maps, characters, and assets!"
      )) {
        deleteObject(user._id, "users");
        signOut();
      }
    }
  }

  async function handleUpdate() {
    const newUser = {
      _id: username,
      // if unchanged (null), use original value
      password: (password === null)? user.password : password,
      displayName: (displayName === null)? user.displayName: displayName,
      description: (description === null)? user.description: description
    }
    if (avatarFile && ! await handleAvatar()) return;
    updateObject(newUser, "users", refreshPage);
  }

  // this function is only called when the user has selected a new avatar
  // return false if avatar update failes, true otherwise
  async function handleAvatar() {
    if (avatarFile.type !== "image/png") {  // check that file is png
      window.alert("The avatar must be a PNG.");
      return false;
    }
    if(avatarFile.size > 75000) { // Not sure how we could increase/decrease this cap,
      window.alert("Please choose an image under 75KB"); // but added the err flag anyway
      return false;
    }
    const reader = new FileReader(); // HTML5 feature, reads file input
    reader.onload = (e) => {  // define reader behavior when read as text
      const newAvatar = {
        _id: username,
        body: e.target.result
      };
      if (avatar) {
        console.log("Updating Object...");
        updateObject(newAvatar, "avatars");
      }
      else { 
        console.log("Creating new Object...");
        createObject(newAvatar, "avatars");
      }
    };

    reader.readAsDataURL(avatarFile)
    return true;
  }

  return (
    <div>
      <h1>Profile</h1>
      {
        username === usernameViewer?
        <p>View your profile and map catalog.</p>
        :
        <p>View {user?.displayName}'s profile and map catalog.</p>
      }
      <table className="profile-table"><tbody><tr>
        <td>
          <img className="profile-avatar" src={avatar?.body} />
        </td>
        <td>
          <b>Display name:</b> {user?.displayName} <br />
          <b>Username:</b> <span className="username">{user?._id}</span> <br />
          <b>Description:</b> {user?.description} <br />
        </td>
      </tr></tbody></table>

      {  // display profile updates only if user is viewing their own profile
        username === usernameViewer?
        <div>
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
        :
        <span />
      }
    </div>
  )
}

export default Profile;