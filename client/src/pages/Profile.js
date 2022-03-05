import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

import FormText from "../components/FormText";

import { getObject, updateObject, deleteObject, createObject } from '../methods/db';
import { queryObjects } from '../methods/search';


function array2D(ROW, COLUMN) {
  let rows = new Array(ROW).fill(null);
  for (let r = 0; r < ROW; r++) {
    const row = new Array(COLUMN).fill(null);
    rows[r] = row;
  }
  return rows;
}

function isMapIDLegal(mapID) {
  if (
    mapID.length < 4 ||               // the map ID must be
    mapID.length > 32 ||              // between 4 and 32 characters AND
    !/^[a-zA-Z0-9_-]+$/i.test(mapID)  // alphanumetric characters, dashes,
  ) {                                 // and underscores only
    return false;
  }
  return true;
}


function ProfileMaps(props) {
  return (
    <div>
      {props.maps.map(map => {
        return(
          <p className="search-result" key={map._id}>
            <b>
              <Link
                className="hypertext"
                to={`/map`}
                onClick={() => props.onClick(map._id)}
              >
                {map.displayName}
              </Link>
            </b>
            &nbsp;(<span className="username">{map._id}</span>)<br />
            <i>{map.description}</i><br />
          </p>
        )
      })}
    </div>
  );
}


function Profile(props) {
  document.title = "Profile | T-Eggletop";

  const [cookies, setCookie, removeCookie] = useCookies(["username", "mapID"]);

  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);

  // fetch user information from URl params (/user/:username)
  const { username } = useParams();
  useEffect(() => {
    async function getUser() {  // weird workaround to use async
      setUser(await getObject(username, "users"));    // function in useEffect
      setAvatar(await getObject(username, "avatars"));
    }
    async function getMaps() {
      setMaps(await queryObjects({ author: username }, "maps"));
    }
    getUser();
    getMaps();
  }, []);
  // get username of user who is currently signed in
  const usernameViewer = cookies.username;

  // The Description Update Form: For now, profile changes act like
  // the drop down menu done for signUp!
  const [displayName, setDisplayName] = useState(null);
  const [description, setDescription] = useState(null);
  const [password, setPassword] = useState(null);

  const [avatarFile, setAvatarFile] = useState(null);

  const [maps, setMaps] = useState([]);

  const [mapName, setMapName] = useState(null);
  const [mapDescription, setMapDescription] = useState(null);
  const [mapID, setMapID] = useState(null);

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
      onKeyPress: handleEnterProfile
    },
    {
      label: "Description",
      value:
        (description === null)? user?.description?
        user?.description : "" : description,
      placeholder: "A short blurb/biography about yourself.",
      onChange: setDescription,
      onKeyPress: handleEnterProfile
    },
    {
      type: "file",
      label: "Avatar",
      onChange: setAvatarFile,
      onKeyPress: handleEnterProfile
    },
    {
      label: "Password",
      placeholder: "Leave blank if you do not want to change your password.",
      onChange: setPassword,
      onKeyPress: handleEnterProfile
    }
  ]

  const newMapEntries = [
    {
      label: "Map Name",
      placeholder: "The display name for your new map.",
      onChange: setMapName,
      onKeyPress: handleEnterMap
    },
    {
      label: "Description",
      placeholder: "A short blurb/overview of your map.",
      onChange: setMapDescription,
      onKeyPress: handleEnterMap
    },
    {
      label: "Map ID",
      placeholder: "The unique identification string for your new map.",
      onChange: setMapID,
      onKeyPress: handleEnterMap
    },
  ]

  function handleEnterProfile(key) {
    if (key === "Enter") handleUpdate();
  }

  function handleEnterMap(key) {
    if (key === "Enter") handleNewMap();
  }

  const navigate = useNavigate();
  const routeChange = (path) => {  // redirects to input path
    navigate(path);
  }

  function signOut() {
    removeCookie("username", { path: "/" });  // remove username cookie
    removeCookie("mapID", { path: "/" });  // remove mapID cookie
    routeChange("/");  // redirect to home page
  }

  function refreshPage() {
    window.location.reload();
  }

  function displayMaps() {
    if (maps.length === 0) {
      if (username === usernameViewer) {
        return (
          <p><i>Your map catalog is currently empty.</i></p>
        );
      } else {
        return (
          <p><i>
            {user.displayName}'s map catalog is currently empty.
          </i></p>
        );
      }
    } else {
      return (
        <ProfileMaps
          maps={maps}
          onClick={handleMapClick}
        />
      );
    }
  }

  function handleMapClick(mapIDClick) {
    setCookie("mapID", mapIDClick, { path: "/" });
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
    const legalTypes = ["image/png", "image/jpeg"];
    if (!legalTypes.includes(avatarFile.type)) {  // check that file is image
      window.alert("The avatar must be a JP(E)G or PNG.");
      return false;
    }

    const reader = new FileReader(); // HTML5 feature, reads file input
    reader.onload = (e) => {  // define reader behavior when read as text
      const newAvatar = {
        _id: username,
        body: e.target.result
      };
      if (avatar) updateObject(newAvatar, "avatars");
      else createObject(newAvatar, "avatars");
    };
    reader.readAsDataURL(avatarFile);
    return true;
  }

  async function handleNewMap() {
    if (!mapName) {
      window.alert("Your map name cannot be empty.");
      return;
    }
    if (!isMapIDLegal(mapID)) {
      window.alert("The map ID must be between 4 and 32 characters long " +
                   "and only contain alphanumeric characters, dashes, and " +
                   "underscores.");
      return;
    }

    const map = await getObject(mapID, "maps");
    if (map) {  // the mapID must have not been taken yet
      window.alert("The map ID already exists.");
      return;
    }

    const [ROW, COLUMN] = [8, 12];
    const newMap = {
      _id: mapID,
      author: username,
      displayName: mapName,
      description: mapDescription,
      tiles: array2D(ROW, COLUMN),
      assets: array2D(ROW * 3, COLUMN * 3)
    }
    setCookie("mapID", mapID, { path: "/" });
    createObject(newMap, "maps", routeChange("/map"));
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
          <b>Description:</b> {user?.description}
        </td>
      </tr></tbody></table>

      {  // display profile updates only if user is viewing their own profile
        username === usernameViewer?
        <div className="form-button">
          <button id="delete-account" onClick={() => deleteAccount()}>
            Delete Account
          </button>
          <button onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
        :
        <span />
      }

      <h2>Map Catalog</h2>
      {displayMaps()}

      {  // display profile updates only if user is viewing their own profile
        username === usernameViewer?
        <div>
          <h3>Create New Map</h3>
          <FormText
            formEntries={newMapEntries}
            buttonText="Create"
            onClick={handleNewMap}
          />
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