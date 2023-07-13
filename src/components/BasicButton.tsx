import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Colors, FontSize, BorderRadius } from '../constants/Index';

export interface BasicButtonProps {
  //linkTo? : string;
  small?: boolean;
  children?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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

export const DeleteButton: React.FC<BasicButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <>
      <StyledDeleteButton onClick={onClick}>{children}</StyledDeleteButton>
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

export const StyledDeleteButton = styled.button<BasicButtonProps>`
  padding: ${(props) => (props.small ? '2%' : '5%')};
  background-color: ${Colors.InputBorderInFont};
  color: #666666;
  width: 100%;
  font-size: ${FontSize.h2};
  border: 1px solid ${Colors.InputBorderInFont};
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

export const SecessionButton = styled.button`
  font-size: ${FontSize.h3};
  color: ${Colors.InputBorderOut};
  margin: 2%;
  border: none;
  border-radius: ${BorderRadius.inputRadius};
  float: right;
`;
