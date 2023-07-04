import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface BasicButtonProps {
  //linkTo?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}

export const BasicButton: React.FC<BasicButtonProps> = ({
  //linkTo,
  onClick,
  children,
}) => {
  return (
    <>
      <StyledButton onClick={onClick}>{children}</StyledButton>
    </>
  );
};

export const StyledButton = styled.button<BasicButtonProps>`
  background-color: #2fb044;
  color: #ffffff;
  font-size: 20px;
  margin: 2%;
  width: 40px;
  border: 1px solid #2fb044;
  border-radius: 5px;
`;
