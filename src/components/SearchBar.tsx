import styled from "styled-components";
import { FontSize } from "../constants/FontSize";
import { FiSearch } from "react-icons/fi";
import React, { useState } from "react";
import { BorderRadius, BorderColor } from "../constants/Border";
import { useRecoilState } from "recoil";
import { hpNameAtom, modifyHpNameAtom } from "../recoil/atoms";

export const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [hpNameInput, setHpNameInput] = useRecoilState(hpNameAtom);
  const [modifyHpName, setModifyHpName] = useRecoilState(modifyHpNameAtom);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    setHpNameInput(value);
    setModifyHpName(value);
  };

  const handleSearchIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Input value:", keyword);
  };

  return (
    <>
      <SearchWrapper>
        <SearchInput
          id="searchBarInput"
          type="text"
          placeholder="병원 이름을 검색해주세요"
          onChange={handleSearchInputChange}
        />
        <SearchButton onClick={handleSearchIconClick}>
          <FiSearch />
        </SearchButton>
      </SearchWrapper>
    </>
  );
};

const SearchWrapper = styled.form`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${BorderRadius.SearchRadius};
  border: ${BorderColor.thinBorder};
  margin: 0 auto;
  height: 50%;
`;

const SearchInput = styled.input`
  width: 80%;
  padding: 1.5% 3.5%;
  font-size: ${FontSize.h3};
  border-style: none;
  background: none;
  outline: none;
`;

const SearchButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;

  svg {
    font-size: 1.5em;
  }
`;
