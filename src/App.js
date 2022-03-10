import { useEffect, useState } from "react";

import { Game } from "phaser";
import { gameActions } from "./redux/gameState";
import { gameConfig } from "./phaser/config";
import { useDispatch } from "react-redux";

function App() {
  const [game, setGame] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!game) {
      const newGame = new Game(gameConfig);
      setGame(newGame);
      dispatch(gameActions.createGame());
    }
  }, [dispatch, game]);

  return (
    <div>
      <h1>games</h1>
      <div id="game"></div>
    </div>
  );
}

export default App;
