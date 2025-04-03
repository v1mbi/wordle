import React, { useEffect, useState } from "react";
import WordTile from "./WordTile";

export default function WordRow({ wordle, won }) {
  const [answer, setAnswer] = useState("");
  let answerArray = answer.split("");
  while (answerArray.length < wordle.length) answerArray.push(" ");

  const normal =
    "bg-slate-700 flex h-12 w-12 rounded justify-center items-center m-1";
  const fail =
    "bg-slate-500 flex h-12 w-12 rounded justify-center items-center m-1";
  const warning =
    "bg-yellow-400 flex h-12 w-12 rounded justify-center items-center m-1";
  const correct =
    "bg-green-400 flex h-12 w-12 rounded justify-center items-center m-1";

  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setAnswer("");
    setEntered(false);
  }, [wordle]);

  const handleKeyDown = (event) => {
    const letter = event.key.toLowerCase();
    if (letter == "enter") {
      setEntered(true);
    } else if (letter == "backspace" && !entered) {
      setAnswer(answer.slice(0, -1));
    } else if (
      answer.length < wordle.length &&
      letter.length == 1 &&
      !entered
    ) {
      setAnswer(answer + letter);
    }
  };
  if (answer == wordle && entered) {
    won(true);
  }

  return (
    <div className="flex m-1" onKeyDown={handleKeyDown} tabIndex={0}>
      {answerArray.map((value, index) => (
        <WordTile
          key={index}
          letter={value}
          badge={
            entered
              ? value == wordle.split("")[index]
                ? correct
                : wordle.split("").includes(value)
                ? warning
                : fail
              : normal
          }
        />
      ))}
    </div>
  );
}
