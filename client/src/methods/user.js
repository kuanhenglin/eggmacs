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


// username = user with updated info (won't be able to change username)
async function updateUser(user) {
  console.log(user.description);
  const response = await fetch(`http://localhost:5000/users/update/${user._id}`, {  // create new user
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
  })
  if (!response.ok) {  // server connection error
    const message = `An error has occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }
}

export {
  getUser,
  updateUser,
}
