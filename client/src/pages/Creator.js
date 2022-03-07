import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { MapBoard } from "../components/MapCreator";
import { getObject, updateObject, deleteObject } from '../methods/db';
import { queryObjects } from '../methods/search';
import { saveAs } from 'file-saver'
import { downloadMap } from '../methods/download'


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
  const [tileGrid, setTileGrid] = useState([[]]);  // str of ids
  const [assetGrid, setAssetGrid] = useState([[]]);  // str of ids

<<<<<<< Updated upstream
  const [inputMode, setInputMode] = useState("tile");  // default
  const [selectItem, setSelectItem] = useState("tile_grass");  // default

  const [toggleGrid, setToggleGrid] = useState(true);
=======
  const [inputMode, setInputMode] = useState("asset");
  const [selectItem, setSelectItem] = useState("asset_brickwall");
>>>>>>> Stashed changes

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

  const inputModeOptions = [
    { label: "Tiles", value: "tile" },
    { label: "Assets", value: "asset" },
    { label: "Characters", value: "character" }
  ]

  const navigate = useNavigate();
  const routeChange = (path) => {  // redirects to input path
    navigate(path);
  }

  function refreshPage() {
    window.location.reload();
  }

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
    if (!tileID) return null;
    for (let index = 0; index < tiles.length; index++){
      if (tileID === tiles[index]._id){
        return tiles[index];
      }
    }
    return null;
  }
  
  function findAsset(assetID) {
    if (!assetID) return null;
    for (let index = 0; index < assets.length; index++){
      if (assetID === assets[index]._id){
        return assets[index];
      }
    }
    for (let index = 0; index < characters.length; index++){
      if (assetID === characters[index]._id){
        return characters[index];
      }
    }
    return null;
  }

  function updateTile(r, c, remove) {
    let newTileGrid = tileGrid.slice();
    newTileGrid[r][c] = remove? null : selectItem;
    setTileGrid(newTileGrid);
  }

  async function updateAsset(r, c, remove) {
    let newAssetGrid = assetGrid.slice();
    newAssetGrid[r][c] = remove? null : selectItem;
    setAssetGrid(newAssetGrid);
  }

  function displayTile(tileID) {
    const blockTile = findTile(tileID);
    if (blockTile) {
      return (
        <img
          id="tile"
          className="block"
          src={blockTile.body}
        />
      );
    } else {
      return (
        <div id="tile" />
      );
    }
  }

  function displayAsset(assetID) {
    const blockAsset = findAsset(assetID);
    if (blockAsset) {
      return (
        <img
          id="asset"
          className="block"
          src={blockAsset.body}
        />
      );
    } else {
      return (
        <div id="asset" />
      );
    }
  }

  function displayItemSelect(blockItem) {
    return (
      <button
        className="item-select"
        onClick={(e) => setSelectItem(blockItem._id)}
      ><img
        id={blockItem._id === selectItem? "selected" : ""}
        className="select block"
        src={blockItem.body}
      /></button>
    );
  }

  function displaySelect() {
    if (inputMode === "tile") {
      return (
        <div>{tiles.map(tile => {
          if (tile._id !== "tile_empty") {
            return (
              <span key={tile._id}>
                {displayItemSelect(tile)}
              </span>
            );
          }
        })}</div>
      );
    } else if (inputMode === "asset") {
      return (
        <div>{assets.map(asset => {
          if (asset._id !== "asset_empty") {
            return (
              <span key={asset._id}>
                {displayItemSelect(asset)}
              </span>
            );
          }
        })}</div>
      );
    } else if (inputMode === "character") {
      return (
        <div>{characters.map(character => {
          if (character._id !== "character_empty") {
            return (
              <span key={character._id}>
                {displayItemSelect(character)}
              </span>
            );
          }
        })}</div>
      );
    }
  }

  async function handleMapSave() {
    const newMap = {
      _id: mapID,
      author: author,
      tiles: tileGrid,
      assets: assetGrid
    }
    updateObject(newMap, "maps", refreshPage);
  }

  async function handleMapDelete() {
    if (window.confirm("Do you want to proceed with map deletion?")) {
      if (window.confirm(
        "Are you sure? This action is irreversible!"
      )) {
        deleteObject(mapID, "maps");
        removeCookie("mapID", { path: "/" });  // remove mapID cookie
        routeChange("/user");  // redirect to profile page
      }
    }
  }

  function handleToggleGrid () {
    setToggleGrid(!toggleGrid);
  }

  async function handleMapDownload() {
    const mapInfo = {
      _id: mapID,
      tileGrid: tileGrid,
      assetGrid: assetGrid,
      tiles: tiles,
      assets: assets,
      characters: characters
    };
    let FileSaver = require('file-saver');
    let file = await downloadMap(mapInfo);
    FileSaver.saveAs(file);
    return;
  }

  return (
    <div>
      <h2>Map Creator</h2>
      <sub>Modify your map with the tools below.</sub>
      <p>Left click to place. Right click to delete.</p>
      <div className="hspacer">space</div>

      {displayMapInformation()}
      <div>
        <p id="toggle-grid-label"><b>Toggle Grid</b></p>
        <label className="map-toggle">
          <input className="map-toggle-button" type="checkbox" onChange={(e) => handleToggleGrid()}/>
          <span className="slider"></span>
        </label>
      </div>

      {  // display map updates only if user is viewing their own map
        author === username?
        <div className="form-button">
          <button id="delete-map" onClick={handleMapDelete}>
            Delete Map
          </button>
          <button onClick={handleMapSave}>
            Save Map
          </button>
        </div>
        :
        <span />
      }

      {  // display map only if map is selected (mapID defined)
        mapID?
        <span>
          <MapBoard
            visibility={toggleGrid}
            inputMode={inputMode}
            selectItem={selectItem}
            tileGrid={tileGrid}
            assetGrid={assetGrid}
            updateTile={updateTile}
            updateAsset={updateAsset}
            displayTile={displayTile}
            displayAsset={displayAsset}
          />
          <div className="hspacer">space</div>
          <select
            className="select-select"
            onChange={(e) => setInputMode(e.target.value)}
          >
            {inputModeOptions.map(option => {
              return(
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )
            })}
          </select>
          <div className="items-select">{displaySelect()}</div>
        </span>
        :
        <span />
      }
      
    </div>

  )
}


export default Creator;