import cssApp from "./App.module.css";

import FollowCardList from "./Components/FollowCardList";
import TicTacToe from "./Components/TicTacToe";
//import TicTacToe from "./Components/TicTacToe";

function App() {
  return (
    <main className={cssApp.main}>
      <section className={cssApp.appItem}>
        <FollowCardList />
      </section>
      <section className={cssApp.appItem}>
        <TicTacToe />
      </section>
    </main>
  );
}

export default App;
