import "./resetButton.css";

export default function ResetButton({ array, restartGame }) {
  const newBoard = [...array];
  const empty = newBoard.some((element) => element !== null);

  const classResetButton = empty ? "resetButton" : "resetButton disabled";

  const handleClick = () => {
    restartGame();
    console.log("click");
  };

  return (
    <button
      className={classResetButton}
      onClick={handleClick}
      disabled={!empty}
    >
      Reset Game!
    </button>
  );
}
