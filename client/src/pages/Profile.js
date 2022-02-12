import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import getUser from "../methods/user";

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
    </div>
  )
}

export default Profile;