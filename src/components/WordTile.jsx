import React from "react";

export default function WordTile({ letter, badge }) {
  return (
    <div className={badge}>
      <h1>{letter}</h1>
    </div>
  );
}
