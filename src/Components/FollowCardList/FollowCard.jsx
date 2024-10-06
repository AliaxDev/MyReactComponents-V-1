import { useState } from "react";
import "./followCard.css";

const FollowCard = ({ url, user, state, children }) => {
  const [isFollow, setFollow] = useState(state);

  const text = isFollow ? "Stop Following" : "Follow";

  let buttonClassName = isFollow
    ? "followCardButton is-following"
    : "followCardButton";

  const handleClick = () => {
    setFollow(!isFollow);
  };

  return (
    <article>
      <section className="sectionButton">
        <button className={buttonClassName} onClick={handleClick}>
          <span>{text}</span>
        </button>
      </section>

      <aside>
        <div>
          <strong>{children}</strong>
          <span>@{user}</span>
        </div>

        <img src={url} alt={user} title={user} />
      </aside>
    </article>
  );
};

export default FollowCard;
