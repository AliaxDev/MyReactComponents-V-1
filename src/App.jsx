import "./app.css";

import FollowCardList from "./Components/FollowCardList";
import TicTacToe from "./Components/TicTacToe";
import MouseFollowEffect from "./Components/MouseFollowEffect/MouseFollowEffect";
//import TicTacToe from "./Components/TicTacToe";

function App() {
  return (
    <>
      <main className="appSpace">
        <section className="sectionApp">
          <article className="appItem">
            <FollowCardList />
          </article>
          <article className="appItem">
            <TicTacToe />
          </article>
        </section>
        <MouseFollowEffect />
      </main>
    </>
  );
}

export default App;
