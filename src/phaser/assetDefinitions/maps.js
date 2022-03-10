import { getTilesetSource } from "../helpers/getSource";

export const levelOneTileMap = {
  key: "level-one-map",
  source: getTilesetSource("level_one.json"),
  objectLayer: "object_tiles",
  tilesets: [
    {
      name: "Cloud City",
      key: "cloud-city-tiles",
      source: getTilesetSource("cloud_tileset.png"),
    },
    {
      name: "furniture",
      key: "furniture-tiles",
      source: getTilesetSource("furniture_tileset.png"),
    },
  ],
};
