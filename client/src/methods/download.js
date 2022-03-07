import { createCanvas } from 'canvas'
function dataToFile(dataURL, fileName) {
  let arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
}


async function objToFile(object) {
  let fileName = object._id;
  let imgUrl = object.body;
  let file = dataToFile(imgUrl, fileName);
  return file;
}


function findAsset(assetID, assets, characters) {
  if (!assetID) return null;
  for (let index = 0; index < assets.length; index++) {
    if (assetID === assets[index]._id) {
      return assets[index];
    }
  }
  for (let index = 0; index < characters.length; index++) {
    if (assetID === characters[index]._id) {
      return characters[index];
    }
  }
  return null;
}


function findTile(tileID, tiles) {
  if (!tileID) return null; // obsolete later?
  for (let i = 0; i < tiles.length; i++) {
    if (tileID === tiles[i]._id) {
      return tiles[i];
    }
  }
}


async function downloadMap(mapInfo) {
  const TILE_R = 6;
  const TILE_C = 9;
  const ASSET_R = 18;
  const ASSET_C = 27;

  const canvas = createCanvas(1152, 768);
  const ctx = canvas.getContext('2d');

  for (let r = 0; r < TILE_R; r++) {
    for (let c = 0; c < TILE_C; c++) {
      const tileID = mapInfo.tileGrid[r][c];
      const tileObject = findTile(tileID, mapInfo.tiles);
      if (tileObject) {
        const tileStream = tileObject.body;
        let tileImage = new Image(128, 128);
        tileImage.src = tileStream;
        ctx.drawImage(tileImage, c * 128, r * 128, 128, 128);
      }
    }
  }

  for (let r = 0; r < ASSET_R; r++) {
    for (let c = 0; c < ASSET_C; c++) {
      const assetID = mapInfo.assetGrid[r][c];
      const assetObject = findAsset(assetID, mapInfo.assets, mapInfo.characters);
      if (assetObject) {
        const assetStream = assetObject.body;
        let assetImage = new Image(43, 43);
        assetImage.src = assetStream;
        ctx.drawImage(assetImage, (c * 128)/3, (r * 128)/3, 43, 43);
      }
    }
  }

  let mapUrl = canvas.toDataURL();
  return dataToFile(mapUrl, mapInfo._id);
}

export {
  downloadMap,
};