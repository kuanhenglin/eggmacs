const express = require("express");

// recordRoutes is an instance of the express router used to define routes
// the router will be added as a middleware and will take control of requests
// starting with path /record
const userRoutes = express.Router();

// connect to the database
const dbo = require("../db/conn");


// get a list of all users
userRoutes.route("/users").get(function (request, response) {
  let db_connect = dbo.getDb("cluster");
  db_connect
    .collection("users")
    .find({})
    .toArray(function (error, result) {
      if (error) throw error;
      response.json(result);
    });
});


// create a new user
userRoutes.route("/users/create").post(function (request, response) {
  let dbConnect = dbo.getDb();
  let newUser = request.body;
  dbConnect
    .collection("users")
    .insertOne(newUser, function (error, result) {
      if (error) throw error;
      response.json(result);
  });
});


// get a single user by id
userRoutes.route("/users/get/:id").get(function (request, response) {
  let db_connect = dbo.getDb();
  let query = {_id: request.params.id};
  db_connect
    .collection("users")
    .findOne(query, function (error, result) {
      if (error) throw error;
      response.json(result);
    });
});


// update a user by id
userRoutes.route("/users/update/:id").post(function (request, response) {
  let db_connect = dbo.getDb();
  let query = {_id: request.params.id};
  let newUser = {
    $set: request.body,
  };
  db_connect
    .collection("users")
    .updateOne(query, newUser, function (error, result) {
      if (error) throw error;
      response.json(result);
    });
});


// delete a user
userRoutes.route("/users/delete/:id").delete((request, response) => {
  let db_connect = dbo.getDb();
  let query = {_id: request.params.id};
  db_connect.collection("users").deleteOne(query, function (error, object) {
    if (error) throw error;
    response.status(object);
  });
});


module.exports = userRoutes;