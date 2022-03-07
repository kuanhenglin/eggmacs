async function searchObjects(search, collection, callback=() => {}) {
  if (search === "") {  // empty search causes route (URL) problems
    search = "::all::";
  }
  const response = await fetch(
    `http://localhost:5000/db/search/${collection}/${search}`
  )

  if (!response.ok) {  // server connection error
    const message = `An error has occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }

  const objects = await response.json();  // get objects (if exists)
  return objects;
}


async function queryObjects(query, collection, callback=() => {}) {
  const response = await fetch(
    `http://localhost:5000/db/search/${collection}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(query)
    }
  )

  if (!response.ok) {  // server connection error
    const message = `An error has occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }

  const objects = await response.json();  // get objects (if exists)
  return objects
}


export {
  searchObjects,
  queryObjects
};