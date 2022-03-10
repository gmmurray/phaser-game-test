const interactionKey = {
  1814: () => alert("you found your first chest!"),
  1413: () => alert("you found another chest!"),
};

export const getChestInteraction = (id) => {
  const interaction = interactionKey[id];
  if (!interaction) return;

  interactionKey[id]();
};
