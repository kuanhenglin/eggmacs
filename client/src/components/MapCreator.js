import { useState } from "react";
import ReactDOM from "react-dom";

function Block(props) {
  return (
    <button className="block">
      {props.value}
    </button>
  );
}

function MapBoard(props) {
  return (
    <div>
      <table className="map-board" cellPadding={0}><tbody>
      {props.tileGrid.map(row => {
        return (
          <tr>
          {row.map(tile => {
            return (
              <td class="map-cell" key={tile}>
                <Block value={tile}/>
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