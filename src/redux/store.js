import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./gameState";

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});
