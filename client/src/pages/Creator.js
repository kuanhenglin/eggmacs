import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

import { MapBoard } from "../components/MapCreator";

import { getObject, updateObject } from '../methods/db';
import { queryObjects } from '../methods/search';

// function allowDrop(ev){
//   ev.preventDefault();
// }

// function drag(ev){
//   ev.dataTransfer.setData("text", ev.target.id);
// }

// function drop(ev) {
//   ev.preventDefault();
//   var data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.getElementById(data));
// }


// function asset2TileNum(r, c) {
//   let coordinate = new Array(2).fill(-1);
//   //coordinate[0] = r, coord[1] = c
//   coordinate[0] = Math.floor(r / 3);
//   coordinate[1] = Math.floor(c / 2);
//   return coordinate;
// }

// tiles = [ {_id: __, ...} ]


function Creator() {
  document.title = "Creator | T-Eggletop";

  const [cookies, setCookie, removeCookie] = useCookies(["username", "mapID"]);
  const [mapID, setMapID] = useState(cookies.mapID);
  const { mapIDParam } = useParams();
  const username = cookies.username;

  const [tiles, setTiles] = useState([]);
  const [assets, setAssets] = useState([]);
  const [characters, setCharacters] = useState([]);

  const [mapName, setMapName] = useState(null);
  const [description, setDescription] = useState(null);
  const [author, setAuthor] = useState(null);
  const [tileGrid, setTileGrid] = useState([[]]);
  const [assetGrid, setAssetGrid] = useState([[]]);

  useEffect(() => {
    async function getMap() {
      if (username && mapIDParam) {
        setCookie("mapID", mapIDParam, { path: "/" });
        setMapID(mapIDParam);
      }
      const currentMap = await getObject(mapID, "maps");
      if (currentMap) {
        setMapName(currentMap.displayName);
        setDescription(currentMap.description);
        setAuthor(currentMap.author);
        setTileGrid(currentMap.tiles);
        setAssetGrid(currentMap.assets);
      }
    }
    async function getItems() {
      setTiles(await queryObjects({}, "tiles"));
      setAssets(await queryObjects({}, "assets"));
      setCharacters(await queryObjects({}, "characters"));
    }
    getMap();
    getItems();
  }, []);

  function displayMapInformation() {
    if (mapID) {
      return (
        <div>
          <p>
            <b>Map name:</b> {mapName} <br />
            <b>Map ID:</b> <span className="username">{mapID}</span> <br />
            <b>Author:</b> <span className="username">{author}</span> <br />
            <b>Description:</b> {description} <br />
          </p>
        </div>
      );
    } else if (username) {
      return (
        <p><i>
          You must first select a map to edit.&nbsp;
          <Link to="/user" className="hypertext">
            Select or create one here!
          </Link>
        </i></p>
      );
    } else {
      return (
        <p><i>
          You must be signed in to view/create/modify a map.&nbsp;
          <Link to="/signin" className="hypertext"><i>Sign in here!</i></Link>
        </i></p>
      );
    }
  }

  function findTile(tileID) {
    for (let index = 0; index < tiles.length; index++){
      if (tileID === tiles[index]._id){
        return tiles[index]._id;
      }
    }
    return null;
  }
  
  function findAsset(assetID) {
    for (let index = 0; index < assets.length; index++){
      if (assetID === assets[index]._id){
        return assets[index]._id;
      }
    }
    for (let index = 0; index < characters.length; index++){
      if (assetID === characters[index]._id){
        return characters[index]._id;
      }
    }
    return null;
  }

  function displayAsset(assetID) {
    const blockAsset = findAsset(assetID);
    return (
      <img className="block-asset" src={blockAsset?.body} />
    );
  }

  function handleMapSave() {
    const newMap = {
      _id: mapID,
      author: author,
      tiles: tileGrid,
      assets: assetGrid
    }
    updateObject(newMap, "maps");
  }

  return (
    <div>
      <h1>Map Creator</h1>
      <p>Create or modify your map with the tools below.</p>
      {displayMapInformation()}
      <MapBoard
        tileGrid={tileGrid}
        assetGrid={assetGrid}
      />
    </div>
  )
}


export default Creator;