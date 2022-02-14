async function searchUsers(search) {
  if (search === "") {  // empty search causes route (URL) problems
    search = "::all::";
  }
  const response = await fetch(`http://localhost:5000/search/users/${search}`)

  if (!response.ok) {  // server connection error
    const message = `An error has occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }

  const users = await response.json();  // get user information (if exists)
  return users;
}

export default searchUsers;