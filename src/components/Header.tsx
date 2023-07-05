import React from "react";
import styled from "styled-components";
import IconLeft from "../assets/iconLeft.svg";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";

// eslint-disable-next-line react/prop-types
export const Header = () => {
  const navigate = useNavigate(); //변수 할당시켜서 사용
  const onClickBtn = () => {
    navigate(-1);
  };
  return (
    <>
      <HeaderWrap>
        <BtnBack onClick={onClickBtn}>
          <img
            alt="icon-left"
            src={IconLeft}
            style={{ cursor: "pointer" }}
          ></img>
        </BtnBack>
        <SearchBar />
      </HeaderWrap>
    </>
  );
};

/* 메뉴 제목 위치 수정 다시 필요 - 메뉴 이름은 헤더 가운데, 뒤로가기 버튼 위아래 여백 동일하게 */
const HeaderWrap = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #b2b2b2;
  text-align: center;
  justify-content: center;
  padding: 3% 0;
`;

const BtnBack = styled.button`
  background: none;
  border: none;
  & img:hover {
    filter: invert(70%);
  }
`;
