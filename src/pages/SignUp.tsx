import React from "react";
import styled from "styled-components";

// 이미지 링크
import mainLogo from "../assets/mainLogo.svg";

// 공통 컴포넌트 연결 링크

import { NavigationBar, Container } from "./Index";

// 상수로 뽑아둔 color, fontSize 연결 링크
import { fontSize } from "../constants/fontSize";
import { colors } from "../constants/Colors";
import { JoinButton } from "../components/BasicButton";
import { BorderRadius } from "../constants/Border";

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
      <SignUpForm>
        <SignUpInputDiv>
          <InputTitle>이름</InputTitle>
          <SignUpInput
            placeholder="이름을 입력해주세요"
            type="text"
          ></SignUpInput>
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>이메일</InputTitle>
          <SignUpInput
            placeholder="이메일을 입력해주세요"
            type="email"
          ></SignUpInput>
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>핸드폰번호</InputTitle>
          <SignUpInput placeholder="010-0000-0000" type="text"></SignUpInput>
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>비밀번호</InputTitle>
          <SignUpInput
            placeholder="8자리 이상 입력해주세요"
            type="password"
          ></SignUpInput>
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>비밀번호 확인</InputTitle>
          <SignUpInput
            placeholder="8자리 이상 입력해주세요"
            type="password"
          ></SignUpInput>
        </SignUpInputDiv>

        <SignUpBtn>
          <JoinButton>회원가입</JoinButton>
        </SignUpBtn>
      </SignUpForm>
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
  margin: 0 auto;
`;
const SignUpForm = styled.form`
  border: 1px solid ${colors.InputBorderOut};
  border-radius: ${BorderRadius.inputRadius};
  padding: 10%;
  text-align: center;
  margin-bottom: 13%;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.1);
`;
const SignUpInput = styled.input`
  padding: 4%;
  width: 90%;
  margin: 4% auto;
  border-radius: ${BorderRadius.inputRadius};
  border: 1px solid ${colors.InputBorderOut};
  font-size: ${fontSize.h3};
`;
const SignUpBtn = styled.div`
  margin-top: 10%;
`;

const SignUpInputDiv = styled.div``;

const InputTitle = styled.p`
  font-size: ${fontSize.h3};
  text-align: left;
  padding-left: 5%;
`;

const P = styled.p`
  font-size: ${fontSize.h3};
  color: #c20000;
  margin-bottom: 3%;
`;

const ErrorMaessage = styled.p`
  color: #c20000;
`;
