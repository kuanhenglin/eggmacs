import { useState } from "react";


function BlockButton(props) {
  return (
    <button id={props.type} className="block" />
  );
}


function MapBoard(props) {
  return (
    <div>
      {/* tile images, not interactable */}
      <table className="tile-image map-board" ><tbody>
      {props.tileGrid.map((row, r) => {
        return (
          <tr key={r}>
          {row.map((tile, c) => {
            return (
              <td id="tile-image" className="map-cell" key={c}>
                {props.displayTile(tile)}
              </td>
            )
          })}
        </tr>
        )
      })}
      </tbody></table>

      {/* asset images, not interactable */}
      <table className="asset-image map-board"><tbody>
      {props.assetGrid.map((row, r) => {
        return (
          <tr key={r}>
          {row.map((asset, c) => {
            return (
              <td id="asset-image" className="map-cell" key={c}>
                {props.displayAsset(asset)}
              </td>
            )
          })}
        </tr>
        )
      })}
      </tbody></table>
      
      {/* tile buttons, interactable */}
      <table className="tile-board map-board" ><tbody>
      {props.tileGrid.map((row, r) => {
        return (
          <tr key={r}>
          {row.map((tile, c) => {
            return (
              <td id="tile-button" className="map-cell" key={c}>
                <BlockButton value={tile} type="tile"/>
              </td>
            )
          })}
        </tr>
        )
      })}
      </tbody></table>

      {/* asset buttons, interactable */}
      <table className="asset-board map-board"><tbody>
      {props.assetGrid.map((row, r) => {
        return (
          <tr key={r}>
          {row.map((asset, c) => {
            return (
              <td id="asset-button" className="map-cell" key={c}>
                <BlockButton value={asset} type="asset"/>
              </td>
            )
          })}
        </tr>
        )
      })}
      </tbody></table>
    </div>
  );
}

export {
  MapBoard
};