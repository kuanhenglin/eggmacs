async function getUser(username) {
  const response = await fetch(`http://localhost:5000/users/get/${username}`)

  if (!response.ok) {  // server connection error
    const message = `An error has occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }

  const user = await response.json();  // get user information (if exists)
  return user;
}

export default getUser;