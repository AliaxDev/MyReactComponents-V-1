export const saveGameToStorage = ({ board, turn }) => {
  // save here
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("turn", turn);
};

export const resetGameStorage = () => {
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};
export const saveGameVsStorage = (vs) => {
  // save here
  window.localStorage.setItem("vspc", JSON.stringify(vs));
};

export const getGameVsStorage = () => {
  const vsPcStorage = window.localStorage.getItem("vspc");
  if (vsPcStorage) return JSON.parse(vsPcStorage);
  return false;
};
