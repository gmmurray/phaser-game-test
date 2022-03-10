import { Scene } from "phaser";
import { levelOneTileMap } from "../assetDefinitions/maps";
import { playerSprite } from "../assetDefinitions/sprites";

const baseURL = "assets/";

const sprites = [playerSprite];

const tileMaps = [levelOneTileMap];

export class LoadingScene extends Scene {
  constructor() {
    super("loading-scene");
  }

  preload = () => {
    this.load.baseURL = baseURL;

    this.loadSprites();

    this.loadTileMaps();
  };

  create = () => {
    this.scene.start("level-one");
  };

  loadSprites = () => {
    sprites.forEach(({ key, source, frameWidth, frameHeight }) => {
      this.load.spritesheet(key, source, { frameWidth, frameHeight });
    });
  };

  loadTileMaps = () => {
    tileMaps.forEach(({ key, source, tilesets }) => {
      this.load.tilemapTiledJSON(key, source);

      tilesets.forEach(({ key: tsKey, source: tsSource }) => {
        this.load.image(tsKey, tsSource);
      });
    });
  };
}
