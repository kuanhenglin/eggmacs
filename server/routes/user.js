const express = require("express");

// recordRoutes is an instance of the express router used to define routes
// the router will be added as a middleware and will take control of requests
// starting with path /record
const userRoutes = express.Router();

// connect to the database
const dbo = require("../db/conn");

// convert the id from string to ObjectId for the _id
const ObjectId = require("mongodb").ObjectId;


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
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: request.body,
  };
  db_connect
    .collection("users")
    .updateOne(myquery, newvalues, function (error, result) {
      if (error) throw error;
      console.log("1 user updated");
      response.json(result);
    });
});


// delete a user
userRoutes.route("/users/get/:id").delete((request, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( request.params.id )};
  db_connect.collection("users").deleteOne(myquery, function (error, object) {
    if (error) throw error;
    console.log("1 user deleted");
    response.status(object);
  });
});


module.exports = userRoutes;