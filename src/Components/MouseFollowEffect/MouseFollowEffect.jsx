import { useState, useEffect } from "react";
import "./mouseFollowEffect.css";

function MouseFollowEffect() {
  const [enabled, setEnabled] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  //mouse follow
  useEffect(() => {
    //console.log("effect", { enabled });

    const handleMove = (event) => {
      const { clientX, clientY } = event;
      //console.log("handleMove", { clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    };

    if (enabled) {
      window.addEventListener("mousemove", handleMove);
    }

    //cleanup method
    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [enabled]);

  //toggle cursor
  useEffect(() => {
    document.body.classList.toggle("no-pointer", enabled);
    let element = document.getElementById("cursor");
    element.classList.toggle("disabled-cursor", !enabled);

    //cleanup method
    return () => {
      document.body.classList.remove("no-pointer");
    };
  }, [enabled]);

  return (
    <>
      <div
        id="cursor"
        className="pointer"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
          <path d="M4 16v2a2 2 0 0 0 2 2h2" />
          <path d="M16 4h2a2 2 0 0 1 2 2v2" />
          <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
        </svg>
      </div>
      <button
        className="cursorToggleButton"
        onClick={() => setEnabled(!enabled)}
      >
        {!enabled ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            stroke="currentColor"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
            <path d="M4 16v2a2 2 0 0 0 2 2h2" />
            <path d="M16 4h2a2 2 0 0 1 2 2v2" />
            <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="currentColor"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3.039 4.277l3.904 13.563c.185 .837 .92 1.516 1.831 1.642l.17 .016a2.2 2.2 0 0 0 1.982 -1.006l.045 -.078l1.4 -2.072l4.05 4.05a2.067 2.067 0 0 0 2.924 0l1.047 -1.047c.388 -.388 .606 -.913 .606 -1.461l-.008 -.182a2.067 2.067 0 0 0 -.598 -1.28l-4.047 -4.048l2.103 -1.412c.726 -.385 1.18 -1.278 1.053 -2.189a2.2 2.2 0 0 0 -1.701 -1.845l-13.524 -3.89a1 1 0 0 0 -1.236 1.24z" />
          </svg>
        )}
      </button>
    </>
  );
}

export default MouseFollowEffect;
