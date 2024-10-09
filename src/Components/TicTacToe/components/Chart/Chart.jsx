import "./chart.css";

const Chart = ({ updateBoard, index, children, board }) => {
  function handleClick() {
    const newBoard = [...board];
    updateBoard(index, newBoard);
  }

  return (
    <div className="chart" onClick={handleClick}>
      {children}
    </div>
  );
};

export default Chart;
