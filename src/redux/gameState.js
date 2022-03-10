import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isInitialized: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    createGame: (state) => {
      state.isInitialized = true;
    },
    changeGameSize: ({ game }) => {
      if (game?.isBooted) {
        setTimeout(() => {
          game.scale.resize(window.innerWidth, window.innerHeight);
          game.canvas.setAttribute(
            "style",
            `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
          );
        }, 100);
      }
    },
  },
});

export const gameActions = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
