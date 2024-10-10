import { useEffect, useState } from "react";
import { TURN_PLAYER } from "./constants";
import { resetGameStorage, saveGameToStorage } from "./logic/storage/storage";
import { saveGameVsStorage, getGameVsStorage } from "./logic/storage/storage";
import { checkWinner, checkDraw, checkIfCanWin } from "./logic/gameLogic";
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
      if (turn == TURN_PLAYER.x) {
        //human play
        humanPlay(i, newBoard);
        //check end game
        checkFinal(newBoard);
        //set next turn
        setTurn(TURN_PLAYER.o);
      }
      const won = checkWinner(newBoard);
      if (!won) {
        //time out
        setTimeout(() => {
          pcPlay(newBoard);
          //check end game
          checkFinal(newBoard);
          //set next turn
          setTurn(TURN_PLAYER.x);
        }, 1000);
      }
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
    const options = checkIfCanWin(newBoard);

    //play on the center
    const isIndexNull = (arr, index) => {
      return arr.at(index) === null;
    };

    if (isIndexNull(newBoard, 4)) {
      newBoard[4] = TURN_PLAYER.o;
      setBoard(newBoard);
      return;
    }

    if (options.length > 0) {
      const bestOption = options[0];
      for (let i = 0; i < bestOption.length; i++) {
        if (bestOption[i].value == 0) {
          const posi = bestOption[i].i;
          newBoard[posi] = TURN_PLAYER.o;
          setBoard(newBoard);
          return;
        }
      }
    } else {
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] == null) {
          newBoard[i] = TURN_PLAYER.o;
          setBoard(newBoard);
          return;
        }
      }
    }
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
        <PlayerTurn
          board={board}
          vsPC={vsPC}
          VerifyTurn={VerifyTurn}
          turn={turn}
        >
          {turn}
        </PlayerTurn>
        <ResetButton array={board} restartGame={restartGame}>
          {turn}
        </ResetButton>
      </section>

      <WinnerModal restartGame={restartGame} winner={winner} />
    </main>
  );
};

export default TicTacToe;
