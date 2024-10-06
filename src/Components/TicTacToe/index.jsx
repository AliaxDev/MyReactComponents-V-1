import { useState } from "react";
import Chart from "./components/Chart/Chart";
import "./styles/index.css";
import { TURN_PLAYER, WINNER_COMBOS } from "./constants";

import confetti from "canvas-confetti";
import PlayerTurn from "./components/PlayerTurn/PlayerTurn";
import ResetButton from "./components/ResetButton/ResetButton";
import VsComponent from "./components/VsComponent/VsComponent";
import WinnerModal from "./components/WinnerModal/WinnerModal";

const TicTacToe = () => {
  const [board, setBoard] = useState(new Array(9).fill(null));
  const [turn, setTurn] = useState(TURN_PLAYER.x);
  const [winner, setWinner] = useState(null);
  const [vsPC, setVsPC] = useState(false);

  const restartGame = () => {
    const empty = new Array(9).fill(null);
    setBoard(empty);
    setTurn(TURN_PLAYER.x);
    setWinner(null);
  };

  const changeVs = () => {
    setVsPC((vsPC) => !vsPC);
    restartGame();
  };

  function VerifyTurn() {
    const newTurn = turn === TURN_PLAYER.x ? TURN_PLAYER.o : TURN_PLAYER.x;
    setTurn(newTurn);
  }
  //extract function
  const checkWinner = (boardInPlay) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardInPlay[a] &&
        boardInPlay[a] === boardInPlay[b] &&
        boardInPlay[a] === boardInPlay[c]
      ) {
        return boardInPlay[a];
      }
    }
    //if there is no winner
    return null;
  };

  const checkDraw = (newBoard) => {
    // check is a draw
    // if there are no more empty spaces
    // on the board
    return newBoard.every((value) => value !== null);
  };

  const checkFinal = (newBoard) => {
    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkDraw(newBoard)) {
      setWinner(false); // draw
    }
  };

  const humanPlay = (i, newBoard) => {
    //verify play
    if (newBoard[i] || winner) return;

    //update board
    newBoard[i] = turn;
    setBoard(newBoard);
  };

  const humanPlayVsPC = (i, newBoard) => {
    //verify play
    if (newBoard[i] || winner) return;

    //update board
    newBoard[i] = TURN_PLAYER.x;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      confetti();
      setWinner(newWinner);
      return;
    } else if (checkDraw(newBoard)) {
      setWinner(false); // draw
      return;
    }

    const nullIndices = newBoard
      .map((value, index) => (value === null ? index : -1))
      .filter((e) => e !== -1);

    let indexPC = 0;
    if (nullIndices.length > 0) {
      indexPC = nullIndices[Math.floor(Math.random() * nullIndices.length)];
    }

    newBoard[indexPC] = TURN_PLAYER.o;
    setBoard(newBoard);
  };

  //GAME CICLE--------------------
  //update Board
  const updateBoard = (i) => {
    //copy board
    const newBoard = [...board];

    //if versus PC
    if (vsPC) {
      //human play
      humanPlayVsPC(i, newBoard);
      return;
    }

    //human play
    humanPlay(i, newBoard);
    //varify the turn
    VerifyTurn(newBoard);
    //check winner
    checkFinal(newBoard);
  };
  //CICLE------------------------

  return (
    <main className="board">
      <h1 className="gameName">TIC TAC TOE</h1>

      <section className="game">
        {board.map((value, index) => (
          <Chart key={index} index={index} updateBoard={updateBoard}>
            {value}
          </Chart>
        ))}
      </section>

      <section className="sectionFooter">
        <VsComponent changeVs={changeVs} vsPC={vsPC} />
        <PlayerTurn>{turn}</PlayerTurn>
        <ResetButton array={board} restartGame={restartGame}>
          {turn}
        </ResetButton>
      </section>

      <WinnerModal restartGame={restartGame} winner={winner} />
    </main>
  );
};

export default TicTacToe;
