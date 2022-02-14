import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormText from "../components/FormText";

import {getUser, updateUser} from '../methods/user';

function Profile(props) {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const routeChange = (path) => {  // redirects to input path
    navigate(path);
  }

  // fetch user information from username cookie
  const username = props.getCookie()?.username;
  useEffect(() => {
    async function getUserInformation() {  // weird workaround to use async
      setUser(await getUser(username));    // function in useEffect
    }
    getUserInformation()
  }, []);

  function signOut() {
    props.removeCookie("username");  // remove username cookie
    routeChange("/");  // redirect to home page
  }

  
  // The Description Update Form: For now, profile changes act like
  // the drop down menu done for signUp!
  const [newDescription, setDescription] = useState(null);
  const formEntries = [
    {
      label: "Change Description",
      placeholder: user?.description,
      onChange: setDescription
    }
  ]

  // HandleUpdate Description takes in username (from form)
  // and calls updateUser
  async function handleDiscChange() {
    const oldInfo = await getUser(username);
    const newUser = {
      _id: username,
      password: oldInfo.password,
      displayName: oldInfo.displayName,
      description: newDescription
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
        <button onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
      <FormText
        formEntries={formEntries}
        buttonText="Change Info"
        onClick={handleDiscChange}
      />
    </div>
  )
}

export default Profile;