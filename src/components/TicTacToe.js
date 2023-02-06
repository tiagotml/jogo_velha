import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  border: 1px solid black;
`;

const Square = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  border: 1px solid black;
  box-sizing: border-box;
`;

const Scoreboard = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
  font-size: 24px;
`;

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState('X');
    const [winner, setWinner] = useState(null);
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);

    const handleClick = (index) => {
        const newBoard = [...board];
        if (newBoard[index] === null && !winner) {
            newBoard[index] = player;
            setBoard(newBoard);
            setPlayer(player === 'X' ? 'O' : 'X');
        }

        const winningCombinations = [[0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
        ];

        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
                setWinner(newBoard[a]);
                if (newBoard[a] === 'X') {
                    setXWins(xWins + 1);
                } else {
                    setOWins(oWins + 1);
                }
                return;
            }
        }
    };

    const restartGame = () => {
        setBoard(Array(9).fill(null));
        setPlayer('X');
        setWinner(null);
    };

    return (
        <>
            {winner ? (
                <div style={{ textAlign: 'center', marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    Jogador {winner} ganhou!
                    <button onClick={restartGame} style={{ marginTop: '8px', width: 'fit-content', backgroundColor: 'green', color: 'white', padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                        Reiniciar Jogo
                    </button>
                </div>
            ) : (
                <>
                    <Container>
                        {board.map((square, index) => (
                            <Square key={index} onClick={() => handleClick(index)}>
                                {square}
                            </Square>
                        ))}
                    </Container>
                    <Scoreboard>
                        <div>X Wins: {xWins}</div>
                        <div>O Wins: {oWins}</div>
                    </Scoreboard>
                </>
            )}
        </>
    );

};

export default TicTacToe;