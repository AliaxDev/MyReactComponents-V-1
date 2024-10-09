import "./vsComponent.css";

function VsComponent({ onClick, vsPC }) {
  return (
    <div className="containerVS">
      <aside className="containerPlayers">
        <div className={vsPC ? "Active" : ""}>🤖</div>
        <div className={vsPC ? "" : "Active"}>👦</div>
      </aside>
      <button onClick={onClick} className="vsButton">
        Versus!
      </button>
    </div>
  );
}

export default VsComponent;
