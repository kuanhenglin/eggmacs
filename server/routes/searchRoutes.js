const { calculateObjectSize } = require("bson");
const { query } = require("express");
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

  let query = search.toLowerCase();
  console.log("Searching for... ", query);

  let validMatches = [];
  let numOfUsers = Object.keys(users).length;

  for(let i = 0; i < numOfUsers; i++) { // For each user...
    let dispName = users[i].displayName.toLowerCase();
    let matchScore = 0;
    let precedenceScore = 0;

    for(let j = 0; j < query.length; j++ ) { // For each letter in query..
      let chk = query[j];
      let found = false;
      for(let k = 0; k < dispName.length; k++) { // check each letter in usr..
        if(!found && chk == dispName[k]) {
          console.log("found ", chk, " in :", dispName);
          matchScore++;
          precedenceScore += k;
          found = true;
        }
      } // endk
    } // endj
    const userScoreSheet = {
      displayName: dispName, // don't forget it's sorting by dispName currently
      _id: users[i]._id,
      matchScore: matchScore,
      precedenceScore: precedenceScore,
    }
    if(matchScore != 0) { // if it wasn
      validMatches.push(userScoreSheet);
    }
  } // endi

  // Now that candidates are selected and ranked, sort them by MS
  let sortedByMS = [];
  for(let i = 0; i < validMatches.length; i++) { // for each unsorted...
    let toBeSorted = validMatches[i];
    let hasBeenSorted = false;
    for(let j = 0; j < sortedByMS.length; j++) { // check each already sorted...
      if(toBeSorted.matchScore > sortedByMS[j].matchScore) { 
        //    if TBS.MS > AlreadySorted.MS, insert above MS
        hasBeenSorted = true;
        sortedByMS.splice(j, 0, toBeSorted);
        break;
      }
    } // endj
    if (!hasBeenSorted) {
      sortedByMS.push(toBeSorted);
    }
  } // endi
  console.log(sortedByMS);

  // Now that they're sorted by MS, sort within MS rank for PrecScore
  let finalSort = [];
  for(let i = 0; i < sortedByMS.length; i++) {
    let toBeSorted = sortedByMS[i];
    let hasBeenSorted = false;
    for(let j = 0; j < finalSort.length; j++) {
      if(toBeSorted.matchScore == finalSort[j].matchScore) {
        if(toBeSorted.precedenceScore < finalSort[j].precedenceScore) {
          hasBeenSorted = true;
          finalSort.splice(j, 0, toBeSorted);
          break;
        }
      }
    } // endj
    if(!hasBeenSorted) {
      finalSort.push(toBeSorted);
    }
  } // endi


  sortedUsers = [];
  // now that the finalSort has occured, pair them back with 
  for(let i = 0; i < finalSort.length; i++) { // for each sorted scoreCard...

    for(let j = 0; j < numOfUsers; j++) { // go through the Users
      selectedUser = users[j];
      if(finalSort[i]._id == selectedUser._id) { // find the match
        sortedUsers.push(selectedUser);
      }
    }
  }

  console.log(finalSort);
  return sortedUsers;  // filtering system yet to be implemented
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
searchRoutes.route("/db/search/:collection/:search")
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

// search object in collection with given query
searchRoutes.route("/db/search/:collection")
.post(function (request, response) {
  let db_connect = dbo.getDb();
  let query = request.body;
  db_connect
  .collection(request.params.collection)
  .find(query)
  .toArray(function (error, result) {
    if (error) throw error;
    response.json(result);
  });
});


module.exports = searchRoutes;