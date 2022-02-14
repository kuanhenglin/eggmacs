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

// search user
searchRoutes.route("/search/users/:search").get(function (request, response) {
  let db_connect = dbo.getDb("cluster");
  db_connect
    .collection("users")
    .find({})
    .toArray(function (error, result) {
      if (error) throw error;
      response.json(filterUser(request.params.search, result));
    });
});


module.exports = searchRoutes;