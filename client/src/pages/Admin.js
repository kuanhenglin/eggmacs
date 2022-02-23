import { useState } from "react";

import { getObject, createObject } from "../methods/db";
import FormText from "../components/FormText";

function Admin() {
  document.title = "Admin | T-Eggletop";

  const [tileID, setTileID] = useState(null);
  const [tileFile, setTileFile] = useState(null);

  const formEntries = [
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

  function refreshPage() {
    window.location.reload();
  }

  async function handleTile() {
    if (!tileFile) {  // check that user has selected file
      window.alert("Make sure you have selected a file to upload.");
      return;
    }
    if (tileFile.type !== "image/png") {  // check that file is png
      window.alert("The avatar must be a PNG.");
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

  return (
    <div>
      <h1>Admin</h1>
      <p>
        Make necessary site changes and/or additions, for admins <i>only</i>.
        <br /> To delete tiles/assets, head to the&nbsp;
        <span className="username">MongoDB</span> database to manually do it.
      </p>

      <h2>Add New Tile</h2>
      <FormText
        formEntries={formEntries}
        buttonText="Upload"
        onClick={handleTile}
      />

      <h2>Add New Asset</h2>
      <p>
        <i>This is coming soon (someone implement this please?).</i>
      </p>
    </div>
  );
}

export default Admin;