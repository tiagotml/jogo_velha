import React, { useReducer, useCallback, memo } from 'react';
import styled from 'styled-components';

// ========== STYLED COMPONENTS (fora do componente) ==========
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  border: 1px solid black;
`;

const SquareStyled = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  border: 1px solid black;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.disabled ? 'transparent' : '#f0f0f0'};
  }
`;

const Scoreboard = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
  font-size: 24px;
`;

const GameOverContainer = styled.div`
  text-align: center;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RestartButton = styled.button`
  margin-top: 8px;
  width: fit-content;
  background-color: green;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: darkgreen;
  }
`;

// ========== CONSTANTES (fora do componente) ==========
const WINNING_COMBINATIONS = [
  [0, 1, 2], // Linha 1
  [3, 4, 5], // Linha 2
  [6, 7, 8], // Linha 3
  [0, 3, 6], // Coluna 1
  [1, 4, 7], // Coluna 2
  [2, 5, 8], // Coluna 3
  [0, 4, 8], // Diagonal \
  [2, 4, 6]  // Diagonal /
];

// ========== FUNÇÕES UTILITÁRIAS ==========
const checkWinner = (board) => {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const checkDraw = (board) => {
  return board.every(square => square !== null);
};

// ========== REDUCER (consolidação de state) ==========
const initialState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  xWins: 0,
  oWins: 0,
  isDraw: false
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'MAKE_MOVE': {
      const { index } = action.payload;

      // Validação: célula já preenchida ou jogo terminado
      if (state.board[index] !== null || state.winner || state.isDraw) {
        return state;
      }

      // Atualiza o tabuleiro
      const newBoard = [...state.board];
      newBoard[index] = state.currentPlayer;

      // Verifica vencedor
      const winner = checkWinner(newBoard);

      // Se há vencedor, atualiza score
      if (winner) {
        return {
          ...state,
          board: newBoard,
          winner,
          xWins: winner === 'X' ? state.xWins + 1 : state.xWins,
          oWins: winner === 'O' ? state.oWins + 1 : state.oWins
        };
      }

      // Verifica empate
      const isDraw = checkDraw(newBoard);

      if (isDraw) {
        return {
          ...state,
          board: newBoard,
          isDraw: true
        };
      }

      // Jogo continua: alterna jogador
      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X'
      };
    }

    case 'RESTART_GAME':
      return {
        ...state,
        board: Array(9).fill(null),
        currentPlayer: 'X',
        winner: null,
        isDraw: false
      };

    default:
      return state;
  }
};

// ========== COMPONENTE SQUARE MEMOIZADO ==========
const Square = memo(({ value, onClick, disabled }) => {
  return (
    <SquareStyled onClick={onClick} disabled={disabled}>
      {value}
    </SquareStyled>
  );
});

Square.displayName = 'Square';

// ========== COMPONENTE PRINCIPAL ==========
const TicTacToe = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // useCallback para evitar recriação da função em cada render
  const handleClick = useCallback((index) => {
    dispatch({ type: 'MAKE_MOVE', payload: { index } });
  }, []);

  const restartGame = useCallback(() => {
    dispatch({ type: 'RESTART_GAME' });
  }, []);

  const { board, winner, isDraw, xWins, oWins } = state;
  const gameOver = winner || isDraw;

  return (
    <>
      {gameOver ? (
        <GameOverContainer>
          {winner ? `Jogador ${winner} ganhou!` : 'Deu empate!'}
          <RestartButton onClick={restartGame}>
            Reiniciar Jogo
          </RestartButton>
        </GameOverContainer>
      ) : (
        <>
          <Container>
            {board.map((square, index) => (
              <Square
                key={`square-${index}`}
                value={square}
                onClick={() => handleClick(index)}
                disabled={square !== null}
              />
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
