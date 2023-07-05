import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Colors } from '../constants/Colors';
import { FontSize } from '../constants/FontSize';

export interface BasicButtonProps {
  //linkTo? : string;
  small?: boolean;
  children?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
  padding: ${(props) => (props.small ? '2%' : '5%')};
  background-color: ${Colors.primary};
  color: white;
  width: 100%;
  font-size: ${FontSize.h2};
  border: 1px solid ${Colors.primary};
`;

export const JoinButton = styled.button`
  /* 일반 버튼 스타일 */
  font-size: ${FontSize.but};
  font-weight: 500;
  color: white;
  width: 100%;
  border: 1px solid ${Colors.primary};
  border-bottom: none;
  background-color: ${Colors.primary};
  cursor: pointer;
  padding: 5%;

  /* 활성 버튼 스타일 */
  &.active {
    font-size: ${FontSize.but};
    font-weight: 500;
    color: ${Colors.InputBorderInFont};
    width: 50%;
    border: 1px solid ${Colors.InputBorderOut};
    border-bottom: none;
    background-color: white;
    cursor: pointer;
    padding: 5%;
  }
`;
