import React from "react";
import styled from "styled-components";

// 이미지 링크
import mainLogo from "../assets/mainLogo.svg";

// 공통 컴포넌트 연결 링크

import { NavigationBar, Container } from "./Index";

// 상수로 뽑아둔 color, fontSize 연결 링크
import { FontSize } from "../constants/FontSize";
import { SignUpValidated } from "../utils";

// tab을 true/false로 하는 것 보다 하나의 state로 관리하는게 좀 더 가독성이 나을 것 같아서 리팩토링.
export const SignUp = () => {
  return (
    <>
      <Container>
        <div>
          <SignUpDiv>
            <SignUpImg src={mainLogo}></SignUpImg>
            <H1>회원가입</H1>
          </SignUpDiv>
          <SignUpFormDiv>
            <UserView />
          </SignUpFormDiv>
        </div>
        <NavigationBar />
      </Container>
    </>
  );
};
export default SignUp;

// 일반 회원 창
const UserView = () => {
  return (
    <>
      <SignUpValidated />
    </>
  );
};

const SignUpDiv = styled.div`
  margin-top: 4%;
`;

const SignUpImg = styled.img`
  padding: 3% 3% 0 3%;
`;

const H1 = styled.p`
  font-size: 38px;
  margin: 0;
  padding: 2%;
  color: #00ad5c;
  font-weight: 700;
`;

const SignUpFormDiv = styled.div`
  width: 100%;
  margin: 0 auto 10% auto;
`;
