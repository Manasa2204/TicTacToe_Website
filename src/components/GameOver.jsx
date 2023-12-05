import React from 'react'

export default function GameOver({winner,handleRematch}) {
  return (
    <div id='game-over'>
        <h2>Game Over</h2>
        {winner && <p>{winner} won!</p>}
        {!winner && <p>It's a draw</p>}
        <button onClick={handleRematch}>Rematch!</button>
    </div>
  )
}
