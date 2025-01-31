import Square from "../Chart/Chart";
import "./winnerModal.css";

function WinnerModal({ winner, restartGame }) {
  if (winner === null) return null;

  const winnerText = winner === false ? "-Draw-" : "Winner!";

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>

        <header className="win">{winner && <Square>{winner}</Square>}</header>

        <footer>
          <button onClick={restartGame}>Play Again!</button>
        </footer>
      </div>
    </section>
  );
}

export default WinnerModal;
