import React from "react";
import { useState } from "react";
import Recordaudio from "./components/Recordaudio";
import AudioForm from "./components/datasender";

function App() {
  const [blob, setBlob] = useState([]);

  function getblob(blob) {
    setBlob(blob);
    console.log("app function", blob);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h3>what is JAVA?</h3>
        <h3>what is Python?</h3>
        <h3>what is chat GPT?</h3>
        <h3>who are you?</h3>
        <Recordaudio getblob={getblob}></Recordaudio>
        <hr />
        <AudioForm fileaudio={blob}></AudioForm>
      </div>
    </>
  );
}

export default App;
