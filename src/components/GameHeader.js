import React from 'react';
import styled from 'styled-components';

const GameHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 24px;
  margin-bottom: 16px;
`;

const GameHeader = () => (
  <GameHeaderContainer>
    <Title>Jogo da Velha</Title>
    <Subtitle>Jogue com seu amigo</Subtitle>
  </GameHeaderContainer>
);

export default GameHeader;
