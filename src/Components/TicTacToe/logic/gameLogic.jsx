import { WINNER_COMBOS } from "../constants";

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
