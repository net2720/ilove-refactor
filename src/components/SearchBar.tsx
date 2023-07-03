import styled from "styled-components";
import { fontSize } from "../constants/fontSize";
import { IconSearch } from "../assets";
import React, { useState } from "react";

export const SearchBar = () => {
  const [keyword, setKeyword] = useState("");

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    console.log(keyword);
  };

  const handleSearchIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Input value:", keyword);
  };

  return (
    <>
      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder="병원 이름을 검색해주세요"
          onChange={handleSearchInputChange}
        />
        <SearchButton onClick={handleSearchIconClick}>
          <img alt="search-button" src={IconSearch} />
        </SearchButton>
      </SearchWrapper>
    </>
  );
};

const SearchInput = styled.input`
  width: 90%;
  margin-top: 3%;
  padding: 1.5% 3.5%;
  border-radius: 25px;
  border: 1px solid grey;
  font-size: ${fontSize.h2};
`;

const SearchWrapper = styled.form`
  max-width: 100%;
`;

const SearchButton = styled.button`
  position: relative;
  cursor: pointer;
  background-color: white;
  border: none;
  top: 5px;
  left: -60px;
`;
