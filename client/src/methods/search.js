async function searchObjects(search, collection, callback=() => {}) {
  if (search === "") {  // empty search causes route (URL) problems
    search = "::all::";
  }
  const response = await fetch(
    `http://localhost:5000/search/db/${collection}/${search}`
  )

  if (!response.ok) {  // server connection error
    const message = `An error has occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }

  const objects = await response.json();  // get user information (if exists)
  return objects;
}


export default searchObjects;