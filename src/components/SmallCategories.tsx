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
  font-weight: 400;
  font-size: 16px;
  padding: 7px 15px 7px 15px;
  margin-left: 10px;
  border: solid 1px #bebebe;
  border-radius: 17.5px;
  @media screen and (max-width: 640px) {
    font-size: 13px;
  }
`;
