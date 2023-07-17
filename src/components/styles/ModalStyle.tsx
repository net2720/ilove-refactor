import styled from "styled-components";
// 공통 컴포넌트 스타일 불러오기
import { CardBoxStyle } from "../CardBox";
import { BasicButton, DeleteButton } from "../Index";
import { BorderRadius } from "../../constants/Border";

interface ModalViewProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

interface ModalBtnProps {
  onClick: () => void;
  label: string;
}

export const ModalContainer = styled.div`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 100;
`;

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 100; //위치지정 요소
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ModalTitle = styled.div`
  width: fit-content;
  padding: 2%;
  margin: 2% auto;
  border-bottom: 2px solid;
  color: #00ad5c;

  & > span {
    font-weight: 600;
  }
`;

export const ModalBtn = styled(BasicButton)<ModalBtnProps>`
  margin: 2% 2%;
  padding: 1%;
`;

export const ModalNorBtn = styled(DeleteButton)<ModalBtnProps>`
  margin: 2% 2%;
  padding: 1%;
`;

export const ModalView = styled(CardBoxStyle)<ModalViewProps>`
  width: 60%;
  height: 55%;
  border-radius: ${BorderRadius.SearchRadius};
`;

export const ButtonGridBox = styled.div`
  margin-top: 3%;
  display: grid;
  grid-gap: 5%;
`;
