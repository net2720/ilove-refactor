import { styled, keyframes, css } from "styled-components";
import { Header } from "../components/Header";
import { useState } from "react";
import { SmallCategories } from "../components/SmallCategories";
import { CardBox } from "../components/CardBox";

// 애니메이션 발동을 위한 animate 타입 지정
interface HpListBoxProps {
  animate: boolean;
}

export const SearchHp = () => {
  // HpListBox 가 화면에 보여진다면 true Y축 아래로 이동했다면 false
  const [listScrolled, setListScrolled] = useState(true);

  // 애니메이션 발동 onClick 이벤트
  const handleSlideToggle = () => {
    setListScrolled((prev) => !prev);
  };

  return (
    <>
      <Header />
      <HpListBox animate={!listScrolled}>
        <HpListHeaderBox>
          <SlideBtn onClick={handleSlideToggle} />
          <HpListHeaderContent>
            <SmallCategories>거리</SmallCategories>
            <SmallCategories>진료시간</SmallCategories>
          </HpListHeaderContent>
        </HpListHeaderBox>
        <HpDetailBox>
          <CardBox>
            <HpNumberBox>
              <HpNumber>1</HpNumber>
            </HpNumberBox>
            <HpContentBox>
              <h2>병원 이름자리</h2>
            </HpContentBox>
            <HpImageBox></HpImageBox>
          </CardBox>
        </HpDetailBox>
      </HpListBox>
    </>
  );
};

// 버튼 클릭 시 Y축으로 HpList 박스 이동
const slideAnimation = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(90%);
  }
`;

// 헤더 ~네비게이션 사이 전체 박스
const HpListBox = styled.div<HpListBoxProps>`
  width: 100%;
  height: 625px;
  margin-top: 5%;
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

// HpListBox 내의 헤더 즉 상단 박스
const HpListHeaderBox = styled.div`
  width: 100%;
  height: 20%;
  background-color: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

// 애니메이션 이벤트 버튼
const SlideBtn = styled.button`
  width: 5%;
  margin-bottom: 10%;
`;

// HpListBox 헤더 부분의 내용을 적는 부분
const HpListHeaderContent = styled.div`
  width: 100%;
  height: 10%;
  border-bottom: 1px solid rgb(128, 128, 128, 0.5);
  display: flex;
  padding-bottom: 5%;
  align-items: center;
`;

// HpListBox 헤더 부분을 제외한 병원 리스트들을 담는 박스
const HpDetailBox = styled.div`
  width: 100%;
  height: 80%;
  border: 1px solid purple;
`;

// 병원 리스트의 순서를 담을 박스
const HpNumberBox = styled.div`
  width: 10%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

// 병원 리스트에서 상세정보를 담을 박스
const HpContentBox = styled.div`
  width: 80%;
  height: 100%;
`;

// 병원 리스트에서 이미지를 담을 박스
const HpImageBox = styled.div`
  width: 10%;
  height: 100%;
`;

// 병원 리스트 번호
const HpNumber = styled.div`
  width: 20%;
  height: 20%;
  border: 1px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
`;
