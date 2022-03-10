import { getChestInteraction } from "./chest";

const interactionTypeMap = {
  chest: (id) => getChestInteraction(id),
};

/**
 * Gets and performs an interaction
 * @param {string} type the object type
 * @param {number} level the scene's level number
 * @param {number} tileX the tile's X coordinate
 * @param {number} tileY the tile's Y coordinate
 * @returns
 */
export const getAndPerformInteraction = (type, level, tileX, tileY) => {
  const interaction = interactionTypeMap[type];
  if (!interaction) return;

  return interaction(createInteractionId(level, tileX, tileY));
};

const createInteractionId = (level, tileX, tileY) => `${level}${tileX}${tileY}`;
