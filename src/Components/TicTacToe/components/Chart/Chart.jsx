import "./chart.css";

const Chart = ({ updateBoard, index, children }) => {
  function handleClick() {
    updateBoard(index);
  }

  return (
    <div className="chart" onClick={handleClick}>
      {children}
    </div>
  );
};

export default Chart;
