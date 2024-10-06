import "./vsComponent.css";

function VsComponent({ vsPC, changeVs }) {
  function handleClick() {
    changeVs();
  }

  return (
    <div className="containerVS">
      <aside className="containerPlayers">
        <div className={vsPC ? "Active" : ""}>🤖</div>
        <div className={vsPC ? "" : "Active"}>👦</div>
      </aside>
      <button onClick={handleClick} className="vsButton">
        Versus!
      </button>
    </div>
  );
}

export default VsComponent;
