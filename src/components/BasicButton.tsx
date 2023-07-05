import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { colors } from '../constants/Colors';
import { fontSize } from '../constants/fontSize';

export interface BasicButtonProps {
  //linkTo? : string;
  small?: boolean;
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
  padding: ${(props) => (props.small ? '2%' : '5%')};
  background-color: ${colors.primary};
  color: white;
  width: 100%;
  font-size: ${fontSize.h2};
  border: 1px solid ${colors.primary};
`;

export const JoinButton = styled.button`
  /* 일반 버튼 스타일 */
  font-size: ${fontSize.but};
  font-weight: 500;
  color: white;
  width: 100%;
  border: 1px solid ${colors.primary};
  border-bottom: none;
  background-color: ${colors.primary};
  cursor: pointer;
  padding: 5%;

  /* 활성 버튼 스타일 */
  &.active {
    font-size: ${fontSize.but};
    font-weight: 500;
    color: ${colors.InputBorderInFont};
    width: 50%;
    border: 1px solid ${colors.InputBorderOut};
    border-bottom: none;
    background-color: white;
    cursor: pointer;
    padding: 5%;
  }
`;
