// get user by username
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


// create new user with new user object
async function createUser(user) {
  await fetch("http://localhost:5000/users/create",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .catch(error => {
    window.alert(error);
    return;
  });
}


// update user with new user object (user._id must match)
async function updateUser(user) {
  const response = await fetch(`http://localhost:5000/users/update/${user._id}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(response => window.location.reload())
  .catch(error => {
    window.alert(error);
    return;
  });
}


// update user with new user object (user._id must match)
async function deleteUser(username) {
  await fetch(`http://localhost:5000/users/delete/${username}`,
  { method: "DELETE" })
  .catch(error => {
    window.alert(error);
    return;
  });
}



export {
  getUser,
  createUser,
  updateUser,
  deleteUser
};