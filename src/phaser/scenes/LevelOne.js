import { LevelScene } from "./LevelScene";
import { levelOneTileMap } from "../assetDefinitions/maps";

export class LevelOne extends LevelScene {
  constructor() {
    super("level-one");
    this.levelNumber = 1;
    this.startingCoordinates.x = 3;
    this.startingCoordinates.y = 3;
    this.mapDefinition = levelOneTileMap;
  }

  create = () => {
    this.setMap();

    this.setPlayerSprite();

    this.setCamera();

    this.setObjects();

    this.attachKeyboardListner();
  };

  update = () => {
    this.useGridPlayerControls();
    this.setFacingObject();
  };
}
