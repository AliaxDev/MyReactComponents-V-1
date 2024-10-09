import { useEffect, useState } from "react";
import { TURN_PLAYER } from "./constants";
import { resetGameStorage, saveGameToStorage } from "./logic/storage/storage";
import { saveGameVsStorage, getGameVsStorage } from "./logic/storage/storage";
import { checkWinner, checkDraw } from "./logic/gameLogic";
import confetti from "canvas-confetti";
import "./styles/index.css";

import Chart from "./components/Chart/Chart";
import PlayerTurn from "./components/PlayerTurn/PlayerTurn";
import ResetButton from "./components/ResetButton/ResetButton";
import VsComponent from "./components/VsComponent/VsComponent";
import WinnerModal from "./components/WinnerModal/WinnerModal";

const TicTacToe = () => {
  //====================States==============================
  const [board, setBoard] = useState(() => {
    const boardStorage = window.localStorage.getItem("board");
    if (boardStorage) return JSON.parse(boardStorage);
    return Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnStorage = window.localStorage.getItem("turn");
    return turnStorage ?? TURN_PLAYER.x;
  });
  const [vsPC, setVsPC] = useState(getGameVsStorage());
  const [winner, setWinner] = useState(null);

  //save game data
  useEffect(() => {
    saveGameToStorage({
      board: board,
      turn: turn
    });
  }, [board, turn]);

  //save vs
  useEffect(() => {
    saveGameVsStorage(vsPC);
  }, [vsPC]);

  //GAME CICLE=============================================
  //update Board
  const updateBoard = (i, newBoard) => {
    //verify play
    if (newBoard[i] || winner) return;
    //if versus PC
    if (vsPC) {
      //human play
      humanPlay(i, newBoard);
      const won = checkWinner(newBoard);
      if (!won) {
        pcPlay(newBoard);
      }
      //check end game
      checkFinal(newBoard);
      return;
    }
    //human play and check winner
    humanVsHuman(i, newBoard);
  };
  //END CICLE==============================================

  const restartGame = () => {
    const empty = new Array(9).fill(null);
    setBoard(empty);
    setTurn(TURN_PLAYER.x);
    setWinner(null);
    resetGameStorage();
  };

  const changeVs = () => {
    const current = !vsPC;
    setVsPC(current);
    restartGame();
  };

  function VerifyTurn() {
    const newTurn = turn === TURN_PLAYER.x ? TURN_PLAYER.o : TURN_PLAYER.x;
    setTurn(newTurn);
  }

  const humanVsHuman = (i, newBoard) => {
    //update board
    newBoard[i] = turn;
    setBoard(newBoard);
    //check turn
    VerifyTurn(newBoard);
    //check end game
    checkFinal(newBoard);
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
    //update board
    newBoard[i] = TURN_PLAYER.x;
    setBoard(newBoard);
  };

  const pcPlay = (newBoard) => {
    //copy board
    const nullIndexes = newBoard
      .map((value, index) => (value === null ? index : -1))
      .filter((e) => e !== -1);
    //pc gaming position
    let indexPC = 0;
    if (nullIndexes.length > 0) {
      indexPC = nullIndexes[Math.floor(Math.random() * nullIndexes.length)];
    }
    //add in board
    newBoard[indexPC] = TURN_PLAYER.o;
    setBoard(newBoard);
  };

  return (
    <main className="board">
      <h1 className="gameName">TIC TAC TOE</h1>

      <section className="game">
        {board.map((value, index) => (
          <Chart
            key={index}
            index={index}
            board={board}
            updateBoard={updateBoard}
          >
            {value}
          </Chart>
        ))}
      </section>

      <section className="sectionFooter">
        <VsComponent onClick={changeVs} vsPC={vsPC} />
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
