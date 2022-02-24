import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormText from "../../components/FormText";

import {getUser, updateUser, deleteUser} from '../../methods/user';

function UserPage(props) {
  document.title = "Profile | T-Eggletop";

  const [user, setUser] = useState(null);
  // fetch user information from username cookie
  let userId = useParams();
  const username = userId.userId;
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
  

  // note: for <span> in update profile, help me change it
  // to be pretty css later plz c: - Kay
  return(
    <div>
      <h1>Profile</h1>
        <p>View <span className="username">{username}</span>'s profile and map catalog.</p>
        <p>
          <b>Display name:</b> {user?.displayName} <br />
          <b>Description:</b> {user?.description} <br />
          <b>Username:</b> <span className="username">{user?._id}</span> <br />
        </p>
    </div>
    )
  }


export default UserPage;