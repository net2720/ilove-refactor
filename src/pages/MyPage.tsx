import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import IconLeft from '../assets/iconLeft.svg';
import PinWheel from '../assets/Pinwheel.gif';

import axios from 'axios';

import { Colors, FontSize } from '../constants/Index';
import { CardBox, Container } from '../components/Index';

import { BasicButton, DeleteButton } from '../components/Index';
import { instance } from '../services/Fetcher';

export const MyPage = () => {
  const token = localStorage.getItem('token');

  const [nameState, setNameState] = useState('');
  const [contectState, setContectState] = useState('');
  const [addressState, setAddressState] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await instance.get('/users/get');
      const userData = response.data.data[0];
      console.log(userData);
      setNameState(userData.name);
      setContectState(userData.phoneNumber);
      setAddressState(userData.address);
    };
    fetchUserData();
  }, [token]);

  const navigate = useNavigate();
  return (
    <Container>
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
        <Info>{nameState}</Info>
      </CardBox>
      <CardBox>
        <TagName>이메일</TagName>
        <Info>popcron13@gmail.com</Info>
      </CardBox>
      <CardBox>
        <TagName>연락처</TagName>
        <Info>{contectState}</Info>
      </CardBox>
      <CardBox>
        <TagName>주소</TagName>
        <Info>{addressState}</Info>
      </CardBox>
      <ButtonGridBox>
        <BasicButton>정보 수정</BasicButton>
        <BasicButton>비밀 번호 변경</BasicButton>
        <DeleteButton>회원 탈퇴</DeleteButton>
      </ButtonGridBox>
    </Container>
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

const ButtonGridBox = styled.div`
  padding-top: 2%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
  }
  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }
`;
