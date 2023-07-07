import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import IconLeft from '../assets/iconLeft.svg';
import PinWheel from '../assets/Pinwheel.gif';

import axios from 'axios';

import { Colors, FontSize } from '../constants/Index';
import { CardBox, Container } from '../components/Index';

import { SecessionButton } from '../components/BasicButton';

export const MyPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderWrap>
        <BtnBack onClick={() => navigate('/')}>
          <img alt="icon-left" src={IconLeft}></img>
        </BtnBack>
        <HeaderName>
          <h2>내 정보</h2>
        </HeaderName>
      </HeaderWrap>
      <CardBox>
        <InfoImgWarp>
          <InfoImg>
            <img alt="info-img" src={PinWheel}></img>
          </InfoImg>
        </InfoImgWarp>
      </CardBox>
      <CardBox>
        <TagName>이름</TagName>
        <Info>노은탁</Info>
      </CardBox>
      <CardBox>
        <TagName>이메일</TagName>
        <Info>popcron13@gmail.com</Info>
      </CardBox>
      <CardBox>
        <TagName>연락처</TagName>
        <Info>010-5490-4147</Info>
      </CardBox>
      <CardBox>
        <TagName>주소</TagName>
        <Info>부산광역시 동래구 충렬대로 좋은 곳</Info>
      </CardBox>
      <SecessionButton>회원 탈퇴</SecessionButton>
    </>
  );
};

const BtnBack = styled.button`
  background: none;
  border: none;
  float: left;
  cursor: pointer;
`;

const TagName = styled.div`
  margin: 2%;
  width: 8%;
  color: ${Colors.InputBorderOut};
  font-weight: bold;
`;

const Info = styled.div`
  margin: 2%;
  color: ${Colors.fontColor};
  font-weight: bold;
`;

const HeaderWrap = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  & h2 {
    font-size: ${FontSize.h2};
    color: #00ad5c;
    font-weight: 600;
    @media screen and (max-width: 600px) {
      font-size: ${FontSize.h3};
    }
  }
`;

const HeaderName = styled.div`
  width: 80%;
`;

const InfoImgWarp = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
`;

const InfoImg = styled.div`
  width: 100%;
`;
