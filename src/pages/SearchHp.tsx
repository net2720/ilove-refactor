import { styled, keyframes, css } from "styled-components";
import { Header } from "../components/Header";
import { useState } from "react";

interface HpListBoxProps {
  animate: boolean;
}

export const SearchHp = () => {
  const [listScrolled, setListScrolled] = useState(true);

  const handleSlideToggle = () => {
    setListScrolled((prev) => !prev);
  };

  return (
    <>
      <Header />
      <h1>병원찾기 페이지입니다.</h1>
      <HpListBox animate={!listScrolled}>
        <HpListHeaderBox>
          <SlideBtn onClick={handleSlideToggle} />
          <HpListHeaderContent></HpListHeaderContent>
          <HpListHeaderContent></HpListHeaderContent>
        </HpListHeaderBox>
      </HpListBox>
    </>
  );
};
const slideAnimation = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(90%);
  }
`;

const HpListBox = styled.div<HpListBoxProps>`
  width: 100%;
  height: 585px;
  background-color: rgb(128, 128, 128, 0.1);
  border: 0.5px solid rgb(128, 128, 128, 0.1);
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  animation: ${({ animate }) =>
    animate &&
    css`
      ${slideAnimation} 0.5s forwards
    `};
`;
const HpListHeaderBox = styled.div`
  width: 100%;
  height: 25%;
  background-color: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

const SlideBtn = styled.button`
  width: 5%;
  margin-bottom: 2%;
`;

const HpListHeaderContent = styled.div`
  width: 100%;
  height: 30%;
  border: 1px solid yellowgreen;
`;
