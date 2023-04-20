import { useState } from "react";

function Square({value, onSquareClick}: {value:string, onSquareClick:()=>void}) {
    return (
        <button className="square" onClick={onSquareClick}>
          {value}
        </button>
    );
}

function calculateWinner(squares:(string|null)[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}

function Board({ xIsNext, squares, on }:{xIsNext: boolean, squares:Array<null|string>, on:(nextSquares: (string | null)[]) => void}) {
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
    function handleClick(i:number) {
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
          nextSquares[i] = "X";
        } else {
          nextSquares[i] = "O";
        }
        on(nextSquares);
      }
    return (
        <>
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={squares[0] as string} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1] as string} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2] as string} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3] as string} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4] as string} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5] as string} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6] as string} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7] as string} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8] as string} onSquareClick={() => handleClick(8)} />
        </div>
      </>
    );
}

export default function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];    
  
    function handlePlay(nextSquares:(string|null)[]) {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
      setXIsNext(!xIsNext);
    }
    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
          description = 'Go to move #' + move;
        } else {
          description = 'Go to game start';
        }
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{description}</button>
          </li>
        );
    });

    function jumpTo(nextMove:number) {
        console.log('test');
        
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
    }

    return (
      <div className="game">
        <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} on={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
