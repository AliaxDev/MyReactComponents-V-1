import { TURN_PLAYER } from "../../constants";
import "./playerTurn.css";

function PlayerTurn({ children, VerifyTurn, board, turn, vsPC }) {
  const current = [...board];
  const allNull = current.every((element) => element === null);

  return (
    <div className="containerPlayerTurn">
      {vsPC ? (
        <h3 className="titlePlayerTurn">
          {turn == TURN_PLAYER.x ? "Player" : "PC"}
        </h3>
      ) : (
        <h3 className="titlePlayerTurn">
          {turn == TURN_PLAYER.x ? "Player 1" : "Player 2"}
        </h3>
      )}

      <section
        onClick={allNull ? VerifyTurn : undefined}
        className="playerTurn"
      >
        <p>{children}</p>
      </section>
    </div>
  );
}

export default PlayerTurn;
