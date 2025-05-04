import React, { useRef, useState } from 'react';
export default function Player() {

  const inputPlayerName = useRef(null);
  const [playerName, setPlayerName] = useState(null);

  return (
    <section id="player">
      <h2>Welcome {playerName ? playerName : 'unknown entity'}</h2>
      <p>
        <input type="text" ref={inputPlayerName}/>
        <button onClick={()=>{setPlayerName(inputPlayerName.current.value)}}>Set Name</button>
      </p>
    </section>
  );
}
