import logo from './assets/gamelogo.png';
import './App.css';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import { useState } from 'react';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './Winning-combinations';
import GameOver from './components/GameOver';


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns){
  let currentPlayer="X";
      
  if(gameTurns.length>0 && gameTurns[0].player==="X"){
    currentPlayer="O"
  }
  return currentPlayer
}

function App() {
  const [gameTurns,setGameTurns]=useState([])

  let activePlayer=deriveActivePlayer(gameTurns)

  let gameBoard=[...initialGameBoard.map(array=>[...array])];

  for(const turn of gameTurns){
      const {square,player}=turn;
      const {row,col}=square;
      gameBoard[row][col]=player
      console.log(gameBoard[row][col])
  }

  let winner=null;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
      winner=firstSquareSymbol
    }
  }

  let hasDraw=gameTurns.length===9 && !winner

  function handleSelectSquare(rowIndex,colIndex){
    
    setGameTurns((prevTurn)=>{
     let currentPlayer=deriveActivePlayer(prevTurn)
      let updatedTurn=[{square:{row:rowIndex,col:colIndex},player:currentPlayer},...prevTurn]
      return updatedTurn
    })
    console.log(gameTurns)

  }

  function handleRematch(){
    setGameTurns([])
  }

  return (
    <div >
      <header>
        <img src={logo} alt="game logo" />
        <h1>React Tic-Tac-Toe</h1>
      </header>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
         <Player initialName="Player1" symbol="X" isActive={activePlayer==="X"} />
         <Player initialName="Player2" symbol="O" isActive={activePlayer==="O"}/>
          
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} handleRematch={handleRematch}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </div>
  );
}

export default App;
