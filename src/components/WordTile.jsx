import React from "react";

export default function WordTile({ letter, badge }) {
  return (
    <div className={badge + " bg-blue-200"}>
      <h1 className="font-semibold">{letter}</h1>
    </div>
  );
}
