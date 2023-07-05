import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { fontSize } from '../constants/fontSize';

interface SmallCategoriesProps {
  children?: ReactNode;
}

export const SmallCategories: React.FC<SmallCategoriesProps> = ({
  children,
}) => {
  return (
    <>
      <SmallCategoriesStyle>{children}</SmallCategoriesStyle>
    </>
  );
};

export const SmallCategoriesStyle = styled.div`
  margin: 2%;
  width: 10%;
  font-size: ${fontSize.h4};
  border: 1px solid #999999;
  background-color: #dddddd;
  border-radius: 15px;
  text-align: center;
`;
