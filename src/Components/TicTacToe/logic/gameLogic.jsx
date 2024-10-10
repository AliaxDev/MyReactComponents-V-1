import { TURN_PLAYER, WINNER_COMBOS } from "../constants";

//extract function
export const checkWinner = (boardInPlay) => {
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

export const checkDraw = (newBoard) => {
  // check is a draw
  // if there are no more empty spaces
  // on the board
  return newBoard.every((value) => value !== null);
};

export const checkIfCanWin = (board) => {
  const arr = JSON.parse(JSON.stringify(board));

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === TURN_PLAYER.o) {
      arr[i] = { value: 1, i };
    }
    if (arr[i] === null) {
      arr[i] = { value: 0, i };
    }
    if (arr[i] === TURN_PLAYER.x) {
      arr[i] = { value: -2, i };
    }
  }

  const p1 = arr[0];
  const p2 = arr[1];
  const p3 = arr[2];
  const p4 = arr[3];
  const p5 = arr[4];
  const p6 = arr[5];
  const p7 = arr[6];
  const p8 = arr[7];
  const p9 = arr[8];

  const s1 = [p1, p2, p3];
  const s2 = [p4, p5, p6];
  const s3 = [p7, p8, p9];
  const s4 = [p1, p4, p7];
  const s5 = [p2, p5, p8];
  const s6 = [p3, p6, p9];
  const s7 = [p1, p5, p9];
  const s8 = [p3, p5, p7];

  const res = [s1, s2, s3, s4, s5, s6, s7, s8].filter((line) => {
    return (
      line[0].value + line[1].value + line[2].value == 2 ||
      line[0].value + line[1].value + line[2].value == -4
    );
  });
  return res;
};
