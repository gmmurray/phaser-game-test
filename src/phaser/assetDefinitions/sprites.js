import { getSpriteSource } from "../helpers/getSource";

export const playerSprite = {
  key: "player",
  source: getSpriteSource("player_spritesheet.png"),
  frameWidth: 32,
  frameHeight: 32,
  walkingAnimationMapping: 0,
};
