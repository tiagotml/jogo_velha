import { render, screen } from '@testing-library/react';
import App from './App';

test('renders jogo da velha title', () => {
  render(<App />);
  const titleElement = screen.getByText(/jogo da velha/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders scoreboard', () => {
  render(<App />);
  const xWinsElement = screen.getByText(/x wins:/i);
  const oWinsElement = screen.getByText(/o wins:/i);
  expect(xWinsElement).toBeInTheDocument();
  expect(oWinsElement).toBeInTheDocument();
});
