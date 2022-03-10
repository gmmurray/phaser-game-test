import {
  ENTER_EVENT_KEY,
  SCALE,
  SCALED_TILE_SIZE,
  SPACE_EVENT_KEY,
} from "../../constants";
import { Geom, Scene } from "phaser";

import { getAndPerformInteraction } from "../objects/interactions";
import { playerSprite as playerSpriteDefinition } from "../assetDefinitions/sprites";

export class LevelScene extends Scene {
  playerSprite = null;
  objects = [];
  facingObject = undefined;
  map = null;
  gridEngine;
  levelNumber = 0;
  startingCoordinates = { x: 0, y: 0 };
  mapDefinition = null;

  setMap = () => {
    const addedMap = this.make.tilemap({ key: this.mapDefinition.key });
    const tilesetNames = [];

    this.mapDefinition.tilesets.forEach((ts) => {
      addedMap.addTilesetImage(ts.name, ts.key);
      tilesetNames.push(ts.name);
    });

    addedMap.layers.forEach((l, i) => {
      addedMap.createLayer(i, tilesetNames, 0, 0).setScale(SCALE).setDepth(i);
    });

    this.map = addedMap;
  };

  setPlayerSprite = () => {
    this.playerSprite = this.add
      .sprite(0, 0, playerSpriteDefinition.key)
      .setScale(SCALE);
    this.addPlayerCharacter();
  };

  setCamera = () => {
    if (!this.playerSprite) return;
    this.cameras.main
      .startFollow(this.playerSprite, true)
      .setFollowOffset(-this.playerSprite.width, -this.playerSprite.height)
      .setZoom(1)
      .setRoundPixels(true);
  };

  setObjects = () => {
    const data = this.map.getLayer(this.mapDefinition.objectLayer).data;

    data.forEach((d) => {
      d.forEach((t) => {
        const { x, y, properties } = t;

        // add "object" tile for each tile defined to have object properties in this layer
        if (properties && properties.type) {
          const newSprite = this.addObjectSprite();

          const newObject = {
            ...properties,
            sprite: newSprite,
            x,
            y,
          };

          this.addObjectCharacter(newObject);

          this.objects.push(newObject);
        }
      });
    });
  };

  addPlayerCharacter = () => {
    const gridEngineConfig = {
      characters: [
        {
          id: playerSpriteDefinition.key,
          sprite: this.playerSprite,
          startPosition: {
            x: this.startingCoordinates.x,
            y: this.startingCoordinates.y,
          },
          walkingAnimationMapping:
            playerSpriteDefinition.walkingAnimationMapping,
        },
      ],
    };

    this.gridEngine.create(this.map, gridEngineConfig);
  };

  addObjectSprite = () => {
    return this.add.sprite(0, 0, "").setScale(SCALE).setVisible(false);
  };

  addObjectCharacter = (object) => {
    this.gridEngine.addCharacter({
      id: `object_${object.name}_${object.x}_${object.y}`,
      sprite: object.sprite,
      collides: true,
      startPosition: { x: object.x, y: object.y },
    });
  };

  // credit to https://github.com/Annoraaq/grid-engine/issues/235#issuecomment-1061049631
  setFacingObject = () => {
    const { x, y } = this.gridEngine.getFacingPosition(
      playerSpriteDefinition.key
    );

    const tileRect = new Geom.Rectangle(
      x * SCALED_TILE_SIZE,
      y * SCALED_TILE_SIZE,
      SCALED_TILE_SIZE,
      SCALED_TILE_SIZE
    );

    this.facingObject = this.objects.filter((o) =>
      Geom.Intersects.RectangleToRectangle(o.sprite.getBounds(), tileRect)
    )[0];
  };

  attachKeyboardListner = () => {
    this.input.keyboard.on("keydown", this.handleInteraction, this);
  };

  handleInteraction = (event) => {
    if (!this.facingObject) return;
    if (event.key === ENTER_EVENT_KEY || event.key === SPACE_EVENT_KEY) {
      getAndPerformInteraction(
        this.facingObject.type,
        this.levelNumber,
        this.facingObject.x,
        this.facingObject.y
      );
    }
  };

  useGridPlayerControls = () => {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.gridEngine.move(playerSpriteDefinition.key, "left");
    } else if (cursors.right.isDown) {
      this.gridEngine.move(playerSpriteDefinition.key, "right");
    } else if (cursors.up.isDown) {
      this.gridEngine.move(playerSpriteDefinition.key, "up");
    } else if (cursors.down.isDown) {
      this.gridEngine.move(playerSpriteDefinition.key, "down");
    }
  };
}
