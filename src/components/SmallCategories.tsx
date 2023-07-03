import React, { ReactNode } from 'react';
import styled from 'styled-components';

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
  position: relative;
  margin: 2%;
  width: 30px;
  font-size: 20px;
  border: 1px solid #999999;
  background-color: #dddddd;
  border-radius: 15px;
  text-align: center;
`;
