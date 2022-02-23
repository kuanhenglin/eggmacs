const express = require("express");

// recordRoutes is an instance of the express router used to define routes
// the router will be added as a middleware and will take control of requests
// starting with path /record
const searchRoutes = express.Router();

// connect to the database
const dbo = require("../db/conn");

function filterUser(search, users) {
  if (search == "::all::") {
    return users;
  }
  return users;  // filtering system yet to be implemented
}

function filterTile(search, tiles) {
  if (search == "::all::") {
    return tiles;
  }
  return tiles;  // filtering system yet to be implemented
}

function filter(search, objects, collection) {
  if (collection === "users") return filterUser(search, objects);
  else if (collection === "tiles") return filterTile(search, objects);
  return objects;  // need to handle default case better
}

// search object in collection
searchRoutes.route("/search/db/:collection/:search")
.get(function (request, response) {
  let db_connect = dbo.getDb("cluster");
  db_connect
  .collection(request.params.collection)
  .find({})
  .toArray(function (error, result) {
    if (error) throw error;
    response.json(
      filter(request.params.search, result, request.params.collection)
    );
  });
});


module.exports = searchRoutes;