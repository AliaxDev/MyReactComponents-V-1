import "./playerTurn.css";

function PlayerTurn({ children }) {
  return (
    <div className="containerPlayerTurn">
      <h3 className="titlePlayerTurn">Plays:</h3>
      <section className="playerTurn">
        <p>{children}</p>
      </section>
    </div>
  );
}

export default PlayerTurn;
