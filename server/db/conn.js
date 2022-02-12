const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (error, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("cluster");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(error);
         });
  },
 
  getDb: function () {
    return _db;
  },
};