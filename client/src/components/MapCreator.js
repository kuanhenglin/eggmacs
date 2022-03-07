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

      {
        props.inputMode === "tile"?
        /* tile buttons, interactable */
        <table
          id = "tile-grid"
          className="tile-board map-board"
          onContextMenu={(e) => e.preventDefault()}
        ><tbody>
          {props.tileGrid.map((row, r) => {
            return (
              <tr key={r}>
                {row.map((tile, c) => {
                  return (
                    <td
                      id="tile-button"
                      className={
                        props.visible? "map-cell" : "map-cell map-cell-off"
                      }
                      key={c}
                    >
                      <button
                        id="tile"
                        className="block"
                        onClick={(e) => props.updateTile(r, c, false)}
                        onContextMenu={(e) => props.updateTile(r, c, true)}
                      />
                    </td>
                  )
                })}
            </tr>
            )
          })}
        </tbody></table>
        :
        /* asset buttons, interactable */
        <table
          id = "asset-grid"
          className="asset-board map-board"
          onContextMenu={(e) => e.preventDefault()}
        ><tbody>
          {props.assetGrid.map((row, r) => {
            return (
              <tr key={r}>
                {row.map((asset, c) => {
                  return (
                    <td
                      id="asset-button"
                      className={
                        props.visible? "map-cell" : "map-cell map-cell-off"
                      }
                      key={c}
                    >
                      <button
                        id="asset"
                        className="block"
                        onClick={(e) => props.updateAsset(r, c, false)}
                        onContextMenu={(e) => props.updateAsset(r, c, true)}
                      />
                    </td>
                  )
                })}
            </tr>
            )
          })}
        </tbody></table>
      }
    </div>
  );
}

export {
  MapBoard
};