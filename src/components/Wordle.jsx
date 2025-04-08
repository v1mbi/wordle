import React, { useEffect, useRef, useState } from "react";
import WordGrid from "./WordGrid";
import { meta } from "@eslint/js";

export default function Wordle() {
  const [wordle, setWordle] = useState("");

  const [retry, setRetry] = useState(false);
  const [definition, setDefinition] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await fetch("https://random-word-api.herokuapp.com/word");
      const response = await data.json();
      setWordle(response[0].toLowerCase());
      try {
        const meta = await fetch(
          "https://api.dictionaryapi.dev/api/v2/entries/en/" +
            response[0].toLowerCase()
        );
        const metaData = await meta.json();
        setDefinition(metaData[0].meanings[0].definitions[0].definition);
      } catch (error) {
        setRetry(!retry);
      }
    }
    fetchData();
  }, [retry]);

  
  console.log(wordle);

  return (
    <div className="flex flex-col items-center ">
      {wordle == "" ? (
        <h5 className="m-4">Loading API...</h5>
      ) : (
        <>
          <h6 className="m-0 text-xs text-gray-800">
            the wordle in the console
          </h6>
          <div className="flex flex-row">
            <h1 className="text-4xl m-1 text-gray-300">Wordle</h1>
            <h1 className="text-4xl m-1 text-blue-400">Clone</h1>
          </div>

          <WordGrid wordle={wordle} />
          <WordGrid wordle={wordle} />
          <WordGrid wordle={wordle} />
          <WordGrid wordle={wordle} />
          <WordGrid wordle={wordle} />
          <WordGrid wordle={wordle} />
          <div className="flex flex-col mt-3">
            <h4 className="text-blue-400">definition:</h4>
            <h3 className="mb-5 mt-0 items-start text-center ">{definition}</h3>
          </div>

          <button
            className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setRetry(!retry)}
          >
            Refresh
          </button>
        </>
      )}
    </div>
  );
}
