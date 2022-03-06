import { useState } from "react";

function BlockImage(props) {
  return (
    <div id={props.type} className="block" />
  );
}

function BlockButton(props) {
  return (
    <button id={props.type} className="block">
      {props.value}
    </button>
  );
}

function MapBoard(props) {
  return (
    <div>
      {/* tile images, not interactable */}
      <table className="tile-images map-board" ><tbody>
      {props.tileGrid.map(row => {
        return (
          <tr>
          {row.map(tile => {
            return (
              <td id="tile-image" class="map-cell" key={tile}>
                <BlockImage value={tile} type="tile"/>
              </td>
            )
          })}
        </tr>
        )
      })}
      </tbody></table>

      {/* asset images, not interactable */}
      <table className="asset-image map-board"><tbody>
      {props.assetGrid.map(row => {
        return (
          <tr>
          {row.map(asset => {
            return (
              <td id="asset-image" class="map-cell" key={asset}>
                <BlockImage value={asset} type="asset"/>
              </td>
            )
          })}
        </tr>
        )
      })}
      </tbody></table>
      
      {/* tile buttons, interactable */}
      <table className="tile-board map-board" ><tbody>
      {props.tileGrid.map(row => {
        return (
          <tr>
          {row.map(tile => {
            return (
              <td id="tile-button" class="map-cell" key={tile}>
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
      {props.assetGrid.map(row => {
        return (
          <tr>
          {row.map(asset => {
            return (
              <td id="asset-button" class="map-cell" key={asset}>
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