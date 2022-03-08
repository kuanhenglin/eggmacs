import { useState } from "react";

import { getObject, createObject } from "../methods/db";
import FormText from "../components/FormText";

function Admin() {
  document.title = "Admin | T-Eggletop";

  const [tileID, setTileID] = useState(null);
  const [tileFile, setTileFile] = useState(null);

  const [assetID, setAssetID] = useState(null);
  const [assetFile, setAssetFile] = useState(null);

  const [characterID, setCharacterID] = useState(null);
  const [characterFile, setCharacterFile] = useState(null);

  const [miscID, setMiscID] = useState(null);
  const [miscFile, setMiscFile] = useState(null);

  const tileFormEntries = [
    {
      label: "File ID",
      placeholder: "ID of uploaded tile (make sure it is unique).",
      onChange: setTileID,
      onKeyPress: () => {},
    },
    {
      type: "file",
      label: "Choose file",
      onChange: setTileFile,
      onKeyPress: () => {}
    }
  ]

  const assetFormEntries = [
    {
      label: "File ID",
      placeholder: "ID of uploaded asset (make sure it is unique).",
      onChange: setAssetID,
      onKeyPress: () => {},
    },
    {
      type: "file",
      label: "Choose file",
      onChange: setAssetFile,
      onKeyPress: () => {}
    }
  ]

  const characterFormEntries = [
    {
      label: "File ID",
      placeholder: "ID of uploaded character (make sure it is unique).",
      onChange: setCharacterID,
      onKeyPress: () => {},
    },
    {
      type: "file",
      label: "Choose file",
      onChange: setCharacterFile,
      onKeyPress: () => {}
    }
  ]

  const miscFormEntries = [
    {
      label: "File ID",
      placeholder: "ID of uploaded misc file (make sure it is unique).",
      onChange: setMiscID,
      onKeyPress: () => {},
    },
    {
      type: "file",
      label: "Choose file",
      onChange: setMiscFile,
      onKeyPress: () => {}
    }
  ]

  function refreshPage() {
    window.location.reload();
  }

  async function legalFile(file) {
    if (!tileFile) {  // check that user has selected file
      window.alert("Make sure you have selected a file to upload.");
      return false;
    }
    const legalTypes = ["image/png", "image/jpeg"];
    if (!legalTypes.includes(file.type)) {  // check that file is image
      window.alert("The avatar must be a JP(E)G or PNG file.");
      return false;
    }
    if (file.size > 75000) {  // limit sizes to 75KB (a weird cap)
      window.alert("Please choose a file under 75KB.");
      return false;
    }
  }

  async function handleTile() {
    if (!legalFile(tileFile)) return;
    if (tileID?.slice(0, 5) !== "tile_") {
      window.alert("The tile ID must start with \"tile_\".");
      return;
    }
    const tile = await getObject(tileID, "tiles");
    if (tile) {  // the tileID must have not been taken yet
      window.alert("The file ID already exists.");
      return;
    }

    const reader = new FileReader(); // HTML5 feature, reads file input
    reader.onload = (e) => {  // define reader behavior when read as text
      const newTile = {
        _id: tileID,
        author: "Eggmacs",
        body: e.target.result
      };
      createObject(newTile, "tiles", refreshPage);
    };
    reader.readAsDataURL(tileFile);
  }

  async function handleAsset() {
    if (!legalFile(assetFile)) return;
    if (assetID?.slice(0, 6) !== "asset_") {
      window.alert("The asset ID must start with \"asset_\".");
      return;
    }
    const asset = await getObject(assetID, "assets");
    if (asset) {  // the assetID must have not been taken yet
      window.alert("The file ID already exists.");
      return;
    }

    const reader = new FileReader(); // HTML5 feature, reads file input
    reader.onload = (e) => {  // define reader behavior when read as text
      const newAsset = {
        _id: assetID,
        author: "Eggmacs",
        body: e.target.result
      };
      createObject(newAsset, "assets", refreshPage);
    };
    reader.readAsDataURL(assetFile);
  }

  async function handleCharacter() {
    if (!legalFile(characterFile)) return;
    if (characterID?.slice(0, 10) !== "character_") {
      window.alert("The character ID must start with \"character_\".");
      return;
    }
    const character = await getObject(characterID, "characters");
    if (character) {  // the characterID must have not been taken yet
      window.alert("The file ID already exists.");
      return;
    }

    const reader = new FileReader(); // HTML5 feature, reads file input
    reader.onload = (e) => {  // define reader behavior when read as text
      const newCharacter = {
        _id: characterID,
        author: "Eggmacs",
        body: e.target.result
      };
      createObject(newCharacter, "characters", refreshPage);
    };
    reader.readAsDataURL(characterFile);
  }

  async function handleMisc() {
    if (!legalFile(miscFile)) return;
    if (miscID?.slice(0, 5) !== "misc_") {
      window.alert("The misc file ID must start with \"misc_\".");
      return;
    }
    const misc = await getObject(miscID, "misc");
    if (misc) {  // the miscID must have not been taken yet
      window.alert("The file ID already exists.");
      return;
    }

    const reader = new FileReader(); // HTML5 feature, reads file input
    reader.onload = (e) => {  // define reader behavior when read as text
      const newMisc = {
        _id: miscID,
        author: "Eggmacs",
        body: e.target.result
      };
      createObject(newMisc, "misc", refreshPage);
    };
    reader.readAsDataURL(miscFile);
  }

  return (
    <div>
      <h2>Admin</h2>
      <sub>
          Make necessary site changes and/or additions, for admins <i>only</i>.
        </sub>
      <p>
        To delete tiles/assets, head to the&nbsp;
        <span className="username">MongoDB</span> database to manually do it.
      </p>

      <div className="hspacer"> space </div>
      <div className="shapes"> 
        <div id="square"></div>
        <div id="diamond"></div>
        <div id="triangle"></div> 
        <div id="circle"></div>
        <div id="square"></div>
        <div id="diamond"></div>
        <div id="triangle"></div> 
        <div id="circle"></div>
      </div> 

      <div className="hspacer"> space </div>

      <h3>Add New Tile</h3>
      <FormText
        formEntries={tileFormEntries}
        buttonText="Upload"
        onClick={handleTile}
      />

      <div className="hspacer"> space </div>  

      <h3>Add New Asset</h3>
      <FormText
        formEntries={assetFormEntries}
        buttonText="Upload"
        onClick={handleAsset}
      />

      <div className="hspacer"> space </div>

      <h3>Add New Character</h3>
      <FormText
        formEntries={characterFormEntries}
        buttonText="Upload"
        onClick={handleCharacter}
      />

      <div className="hspacer"> space </div>

      <h3>Add New Miscellaneous</h3>
      <FormText
        formEntries={miscFormEntries}
        buttonText="Upload"
        onClick={handleMisc}
      />
    </div>
  );
}

export default Admin;