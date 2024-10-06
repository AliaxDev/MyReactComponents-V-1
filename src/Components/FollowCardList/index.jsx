import FollowCard from "./FollowCard";
import "./followCardList.css";

function FollowCardList() {
  const data = [
    {
      id: "0011",
      url: "https://unavatar.io/davidr",
      user: "davidrdg",
      name: "David Rodriguez",
      isFollow: true
    },
    {
      id: "0022",
      url: "https://unavatar.io/jees",
      user: "miguelpz",
      name: "Miguel Perez",
      isFollow: false
    },
    {
      id: "0033",
      url: "https://unavatar.io/pedro",
      user: "pedrogz",
      name: "Pedro Gonzales",
      isFollow: true
    },
    {
      id: "0044",
      url: "https://unavatar.io/julio",
      user: "pedrogz",
      name: "Julio Espina",
      isFollow: true
    }
  ];
  return (
    <main className="listContainer">
      {data.map(({ id, url, user, name, isFollow }) => (
        <FollowCard key={id} url={url} user={user} state={isFollow}>
          {name}
        </FollowCard>
      ))}
    </main>
  );
}
export default FollowCardList;
