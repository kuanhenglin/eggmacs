const express = require("express");

// recordRoutes is an instance of the express router used to define routes
// the router will be added as a middleware and will take control of requests
// starting with path /record
const tileRoutes = express.Router();

// connect to the database
const dbo = require("../db/conn");

// create a new tile
userRoutes.route("/tile/create").post(function (request, response) {
  let dbConnect = dbo.getDb();
  let newTile = request.body;
  dbConnect
    .collection("tiles")
    .insertOne(newTile, function (error, result) {
      if (error) throw error;
      response.json(result);
  });
});

// get tile by id
tileRoutes.route("/tile/get/:id").get(function (request, response) {
  let db_connect = dbo.getDb();
  let query = {_id: request.params.id};
  db_connect
    .collection("tiles")
    .findOne(query, function (error, result) {
      if (error) throw error;
      response.json(result);
    });
});


module.exports = tileRoutes;