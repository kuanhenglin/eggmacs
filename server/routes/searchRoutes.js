const { calculateObjectSize } = require("bson");
const { query } = require("express");
const express = require("express");

// recordRoutes is an instance of the express router used to define routes
// the router will be added as a middleware and will take control of requests
// starting with path /record
const searchRoutes = express.Router();

// connect to the database
const dbo = require("../db/conn");

function generateScoreCard(search, object, type) {
  // This is not what gets returned; this will calc the values
  // of both the dispName & _id, then merge them with whichever has
  // higher precedence
  let scoreCard = {
    obj: object,
    subStrScore: 0,
    matchScore: 0,
    precedenceScore: 0
  }

  let foundIndices = new Array(search.length);
  foundIndices.fill([]);

  // dealing with typing, searching id or dispName
  comp = "";
  if (type == "id")
    comp = object._id.toLowerCase();
  else if (type == "displayName")
    comp = object.displayName.toLowerCase();

  for (let s_i = 0; s_i < search.length; s_i++) { // search_index
    let searchExp = new RegExp(search.slice(0, s_i + 1), "g");
    let subSearchResult = (comp.match(searchExp) || []).length;
    if(subSearchResult)
      scoreCard.subStrScore++;

    // For each letter in comp, check for a match;
    found = false;
    for (let c_i = 0; c_i < comp.length; c_i ++) {
      if(search[s_i] == comp[c_i]) {
        if(!found) { // if a new match 
          found = true
          scoreCard.matchScore++;
          scoreCard.precedenceScore += c_i;
        } // end!found
        // even if letter is already found, add it to the substr check
        foundIndices[s_i].push(c_i) // add index for substr check later
      } // endMatchTrue
    } // end c_i
  } // end s_i

  return ((scoreCard.matchScore != 0) ? scoreCard : null)
  
}

function spliceCards(a, b) {
  let scoreCard = {
    obj: a.obj,
    subStrScore: Math.max(a.subStrScore, b.subStrScore),
    matchScore: Math.max(a.matchScore, b.matchScore),
    precedenceScore: Math.min(a.precedenceScore, b.precedenceScore)
  }
  return scoreCard;
}

// This sort is a little expensive in terms of Order-N complexity, but it
// creates, what I believe, a very helpful ranking of search results for
// the end user
function sortObjectsByCard(cards) {
  // this can almost certainly be improved, but I just need it working...
  let subSorted = [];
  let hasBeenSorted = false;
  
  for (let c_i = 0; c_i < cards.length; c_i++) { //for each cards...
    cur = cards[c_i];
    hasBeenSorted = false;
    for (let s_i = 0; s_i < subSorted.length; s_i++) {
      if(cur.subStrScore > subSorted[s_i].subStrScore) {
        subSorted.splice(s_i, 0, cur);
        hasBeenSorted = true;
        break;
      }
    } // end s_i
    if(!hasBeenSorted)
      subSorted.push(cards[c_i])
  } // end c_i

  let msSorted = [];
  for (let s_i = 0; s_i < subSorted.length; s_i++) {
    hasBeenSorted = false;
    cur = subSorted[s_i];
    for (let m_i = 0; m_i < msSorted.length; m_i++) {
      if(cur.matchScore > msSorted[m_i]) {
        if(cur.subStrScore == msSorted[m_i].subStrScore) {
          hasBeenSorted = true;
          msSorted.splice(m_i, 0, cur);
        }
      }
    } // end m_i
    if(!hasBeenSorted)
      msSorted.push(subSorted[s_i]);
  }

  // Yes, I know I do almost the same alg 3x... if I had
  // infinite time, I'd probably try to redo this sort
  // using something like a hash table; that is, put each score in a
  // bucket, sort each bucket into MS buckets, and so forth... but ah well :)
  let finalObjList = [];
  for(let m_i = 0; m_i < msSorted.length; m_i++) {
    hasBeenSorted = false;
    cur = msSorted[m_i];
    for (let o_i = 0; o_i < finalObjList.length; o_i++) {
      comp = finalObjList[o_i];
      if(cur.precedenceScore < comp.precedenceScore) {
        let subSame = (cur.subStrScore == comp.subStrScore);
        let msSame = (cur.matchScore == comp.matchScore);
        if(msSame && subSame) {
          hasBeenSorted = true;
          finalObjList.splice(o_i, 0, cur.object);
        }
      } // endif
    } // end o_i
    if(!hasBeenSorted)
      finalObjList.push(cur.obj)
  }

  return finalObjList;
}

function generalizedFilter(search, objects) {
  if (search === "::all::")
    return objects;
  
  let numOfObjects = Object.keys(objects).length;
  search = search.toLowerCase();

  let validCards = [];
  // just for displayName check rn...
  for (let o_i = 0; o_i < numOfObjects; o_i++) {
    let sc = null;
    dispName_sc = generateScoreCard(search, objects[o_i], "displayName");
    id_sc = generateScoreCard(search, objects[o_i], "id");
    // Couldn't think of a prettier way to do this cascading a | b if not a&&bn
    if(dispName_sc && id_sc)
      sc = spliceCards(dispName_sc, id_sc);
    else if(dispName_sc)
      sc = dispName_sc;
    else if(id_sc)
      sc = id_sc;

    if(sc) {
      validCards.push(sc);
    }
  }
  retObjs = sortObjectsByCard(validCards);
  return retObjs;
}

// Might need to delete this later, probably obsolete :-)
function filterTile(search, tiles) {
  if (search == "::all::") {
    return tiles;
  }
  return tiles;  // filtering system yet to be implemented
}

function filter(search, objects, collection) {
  if (collection === "users" || collection === "maps") 
    return generalizedFilter(search, objects);
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