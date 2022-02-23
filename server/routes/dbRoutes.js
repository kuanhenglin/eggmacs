const express = require("express");

// recordRoutes is an instance of the express router used to define routes
// the router will be added as a middleware and will take control of requests
// starting with path /record
const dbRoutes = express.Router();

// connect to the database
const dbo = require("../db/conn");


// get a list of all objects in collection
dbRoutes.route("/db/:collection")
.get(function (request, response) {
  let db_connect = dbo.getDb("cluster");
  db_connect
    .collection(request.params.collection)
    .find({})
    .toArray(function (error, result) {
      if (error) throw error;
      response.json(result);
    });
});


// create a new object in collection
dbRoutes.route("/db/create/:collection")
.post(function (request, response) {
  let dbConnect = dbo.getDb();
  let newObject = request.body;
  dbConnect
  .collection(request.params.collection)
  .insertOne(newObject, function (error, result) {
    if (error) throw error;
    response.json(result);
  });
});


// get a single object by id in collection
dbRoutes.route("/db/get/:collection/:id")
.get(function (request, response) {
  let db_connect = dbo.getDb();
  let query = {_id: request.params.id};
  db_connect
  .collection(request.params.collection)
  .findOne(query, function (error, result) {
    if (error) throw error;
    response.json(result);
  });
});


// update an object by id in collection
dbRoutes.route("/db/update/:collection/:id")
.post(function (request, response) {
  let db_connect = dbo.getDb();
  let query = {_id: request.params.id};
  let newObject = {
    $set: request.body,
  };
  db_connect
  .collection(request.params.collection)
  .updateOne(query, newObject, function (error, result) {
    if (error) throw error;
    response.json(result);
  });
});


// delete an object by id in collection
dbRoutes.route("/db/delete/:collection/:id")
.delete((request, response) => {
  let db_connect = dbo.getDb();
  let query = {_id: request.params.id};
  db_connect.collection(request.params.collection)
  .deleteOne(query, function (error, object) {
    if (error) throw error;
    response.status(object);
  });
});


module.exports = dbRoutes;