import { getObject } from "./db";

function dataToFile(dataURL, fileName) {
  let arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  return new File([u8arr], fileName, {type:mime});
}


async function objToFile(object) {
  console.log(object._id, object.body);
  let fileName = object._id;
  let imgUrl = object.body;
  let file = dataToFile(imgUrl, fileName);
  return file;
}

async function findTileObj(r, c, tileGrid) {
  let t_r = Math.floor(r / 3);
  let t_c = Math.floor(c / 3);
  let tile_id = tileGrid[t_r][t_c];
  let obj = await getObject(tile_id, "tiles");
  return obj;
}

async function downloadMap(tileGrid, assetGrid, tiles) {
  let testTile = await findTileObj(0, 0, tileGrid);
  console.log(testTile);
  let file =  objToFile(testTile);
  return file;
}

export {
  downloadMap,
};