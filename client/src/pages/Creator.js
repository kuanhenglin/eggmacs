import { createElement } from "react";

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

function Creator() {
  document.title = "Creator | T-Eggletop";

  return (
    <div>
      <h1>Map Creator</h1>
      <p>Create your map with the tools below.</p>
      <div>
        <table class="map" cellSpacing={0}>
          <tr class="mapRows" id="row1">
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
          </tr>
          <tr class="mapRows" id="row2">
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
          </tr>
          <tr class="mapRows" id="row3">
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
          </tr>
          <tr class="mapRows" id="row4">
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
          </tr>
          <tr class="mapRows" id="row5">
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
          </tr>
          <tr class="mapRows" id="row6">
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
            <td class="mapCells"></td>
          </tr>
        </table>
      </div>
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/000080_Navy_Blue_Square.svg/1200px-000080_Navy_Blue_Square.svg.png?20110203204642" draggable="true" id="testAsset"></img>
      </div>
    </div>

    
  )
}



export default Creator;