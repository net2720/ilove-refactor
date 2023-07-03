import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface CardBoxProps {
  children?: ReactNode;
}

export const CardBox: React.FC<CardBoxProps> = ({ children }) => {
  return (
    <>
      <CardBoxStyle>{children}</CardBoxStyle>
    </>
  );
};

export const CardBoxStyle = styled.div`
  position: relative;
  width: 100%;
  background-color: #ffffff;
  border-bottom: solid 1px #b2b2b2;
  box-sizing: border-box;
  padding: 2%;
`;
