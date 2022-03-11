// get object by id in collection
async function getObject(id, collection, callback=() => {}) {
  const response = await fetch(
    `/db/get/${collection}/${id}`
  );

  if (!response.ok) {  // server connection error
    const message = `An error has occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }

  const object = await response.json();  // get object information (if exists)
  return object;
}


// create new object in collection
async function createObject(object, collection, callback=() => {}) {
  await fetch(
    `/db/create/${collection}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(object)
    }
  )
  .then(() => callback())
  .catch(error => {
    // window.alert(error);
    return;
  });
}


// update object (object._id must match) in collection
async function updateObject(object, collection, callback=() => {}) {
  const response = await fetch(
    `/db/update/${collection}/${object._id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(object)
    }
  )
  .then(response => callback())
  .catch(error => {
    // window.alert(error);
    return;
  });
}


// delete object by id in collection
async function deleteObject(id, collection, callback=() => {}) {
  await fetch(
    `/db/delete/${collection}/${id}`,
    {
      method: "DELETE"
    }
  )
  .then(() => callback())
  .catch(error => {
    // window.alert(error);
    return;
  });
}



export {
  getObject,
  createObject,
  updateObject,
  deleteObject
};