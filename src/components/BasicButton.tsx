import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface BasicButtonProps {
  //linkTo? : string;
  small: boolean;
  children?: ReactNode;
}

export const BasicButton: React.FC<BasicButtonProps> = ({
  //linkTo,
  small,
  children,
}) => {
  return (
    <>
      <StyledButton small={small}>{children}</StyledButton>
    </>
  );
};

export const StyledButton = styled.button<BasicButtonProps>`
  height: ${(props) => (props.small ? '40px' : '60px')};
  background-color: #ffffff;
  color: #66dd66;
  width: 80px;
  border: 1px solid #00ff00;
`;
