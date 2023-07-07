import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import slider from 'react-slick';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

import star from '../assets/star.svg';
import yellowStar from '../assets/yellowStar.svg';
import locationWhite from '../assets/iconLocationWhite.svg';
import locationGreen from '../assets/iconLocationGreen.svg';
import arrowButtonRight from '../assets/arrowbutton.png';
import arrowButtonLeft from '../assets/arrowbutton.png';
import phoneGreen from '../assets/phoneGreen.svg';
import clockGreen from '../assets/clockGreen.svg';
import tagGreen from '../assets/tagGreen.svg';
import smileGreen from '../assets/smileGreen.svg';
import IconLeft from '../assets/iconLeft.svg';
import NoImage from '../assets/NoImage.jpg';

import {
  BasicButton,
  Container,
  SearchBar,
  SmallCategories,
} from '../components/Index';

import { Colors, FontSize } from '../constants/Index';

interface NewHeaderProps {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface ReviewButtonProps {
  label: string;
  clicked: string;
}

export const HospitalInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const NewHeader: React.FC<NewHeaderProps> = ({ label, onClick }) => {
    return (
      <>
        <HeaderWrap>
          <BtnBack onClick={() => navigate('/search')}>
            <img alt="icon-left" src={IconLeft}></img>
          </BtnBack>
          <HeaderName>
            <h2>{label}</h2>
          </HeaderName>
        </HeaderWrap>
      </>
    );
  };

  return (
    <Container>
      <HeaderContainer>
        <NewHeader label={'동래봉생병원'} />
      </HeaderContainer>
      <TopContentContainer>
        <NameBox>{'동래봉생병원'}</NameBox>
        <UnderLine />
      </TopContentContainer>
      <BottomContentContainer>
        <HpInfo>
          <img alt="" src={locationGreen} />
          <span>{'부산시 동래구 충렬대로'}</span>
        </HpInfo>
        <HpInfo>
          <img alt="" src={phoneGreen} />
          <span>{'051-000-0000'}</span>
        </HpInfo>
        <HpInfo>
          <img alt="" src={clockGreen} />
          <HpInfoGrid>
            <SmallCategories>월 09:00-18:00</SmallCategories>
            <SmallCategories>화 09:00-18:00</SmallCategories>
          </HpInfoGrid>
        </HpInfo>
        <HpInfo>
          <img alt="" src={tagGreen} />
          <HpInfoGrid>
            <SmallCategories>태그가 없습니다</SmallCategories>
          </HpInfoGrid>
        </HpInfo>
        <HpInfo>
          <img alt="" src={smileGreen} />
          <h1>이런 점이 좋았어요</h1>
        </HpInfo>
        <ReviewContainer>
          <ReviewButton clicked="kindDoctor" label="kindDoctor">
            친절한 의사 선생님
            <span>2100</span>
          </ReviewButton>
          <ReviewButton clicked="kindDoctor" label="professional">
            전문적인 치료
            <span>15</span>
          </ReviewButton>
          <ReviewButton clicked="kindDoctor" label="kindEmployee">
            상냥한 간호사·직원
            <span>150</span>
          </ReviewButton>
          <ReviewButton clicked="kindDoctor" label="goodReceipt">
            편리한 접수·예약
            <span>12</span>
          </ReviewButton>
          <ReviewButton clicked="kindDoctor" label="cleanHospital">
            깨끗한 시설
            <span>960</span>
          </ReviewButton>
          <ReviewButton clicked="kindDoctor" label="goodTraffic">
            편한 교통·주차
            <span>1</span>
          </ReviewButton>
        </ReviewContainer>
      </BottomContentContainer>
    </Container>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 74px;
  align-items: center;
  display: flex;
  border-bottom: 1px solid #b2b2b2;
`;

const HeaderStar = styled.div`
  cursor: pointer;
  display: flex;
  text-align: center;
  float: right;
  width: 29px;
  height: 28px;
  margin-right: 10px;
  @media screen and (max-width: 600px) {
    width: 21px;
    height: 21px;
  }
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

const BtnBack = styled.button`
  background: none;
  border: none;
  float: left;
  cursor: pointer;
`;

//스타일 - 메인컨텐츠
const SlideContainer = styled.div`
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  .slick-slider {
    width: 100%;
  }
`;

const SlideImg = styled.div`
  width: 90%;
  img {
    width: 90%;
    height: 350px;
    border-radius: 20px;
    object-fit: cover;
    display: inherit;
    margin-bottom: 15px;
  }
`;

const FixedImg = styled.div`
  width: 90%;
  img {
    width: 100%;
    height: 350px;
    border-radius: 20px;
    object-fit: cover;
  }
`;

const ArrowRigth = styled.div`
  display: none;
  position: absolute;
  right: 72px;
  transform: rotate(180deg);
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
  }
`;

const ArrowLeft = styled.div`
  display: none;
  position: absolute;
  left: 72px;
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
  }
`;

const TopContentContainer = styled.div`
  position: relative;
  margin-top: 13px;
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${FontSize.h1};
  @media screen and (max-width: 600px) {
    font-size: ${FontSize.h2};
  }
  a {
    position: absolute;
    right: 41px;
    @media screen and (max-width: 800px) {
      display: none;
    }
  }
  button {
    border: 1px solid #00a758;
    border-radius: 7px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    &:hover {
      opacity: 70%;
    }
  }
  button div span {
    margin-left: 5px;
  }
`;

const NameBox = styled.div`
  width: 65%;
`;

const UnderLine = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100px;
  border-bottom: 2px solid $ Colors.primary};
`;

const QueryMapBtn = styled.button`
  cursor: pointer;
  display: none;
  margin-top: 20px;
  width: 90%;
  height: 39px;
  background-color: $ Colors.primary};
  color: white;
  font-size: ${FontSize.h3};
  border: 1px solid #00a758;
  border-radius: 7px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 800px) {
    display: inline-block;
  }
  &:hover {
    opacity: 70%;
  }
`;

const BottomContentContainer = styled.div`
  flex-direction: column;
  text-align: left;
  padding-left: 71px;
  padding-right: 71px;
  margin-bottom: 130px;
  @media screen and (max-width: 600px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

const HpInfo = styled.div`
  margin-top: 42px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: ${FontSize.h3};
  span {
    margin-left: 22px;
  }
  h1 {
    margin-left: 22px;
    color: $ Colors.primary};
  }
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

const HpInfoGrid = styled.div`
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

const ReviewContainer = styled.div`
  padding: 0 45px 0 45px;
  margin-top: 19px;
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
    padding: 0;
  }
`;

const ReviewButton = styled.button<ReviewButtonProps>`
  cursor: pointer;
  background: ${({ clicked, label }) => {
    if (clicked === label) {
      return Colors.primary;
    } else {
      return '#f4f4f4';
    }
  }};
  color: ${({ clicked, label }) => {
    if (clicked === label) {
      return 'white';
    } else {
      return '#333333';
    }
  }};
  border: 1px solid #00ad5c;
  border-radius: 11px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: space-around;
  font-weight: 600;
  font-size: 14px;
  position: relative;
  text-align: start;
  span {
    color: ${({ clicked, label }) => {
      if (clicked === label) {
        return 'white';
      } else {
        return '#333333';
      }
    }};
    position: absolute;
    right: 10px;
  }
  @media screen and (max-width: 700px) {
    padding: 7px;
    font-size: 12px;
  }
  &:hover {
    opacity: 50%;
  }
`;

const ReserveContainer = styled.div`
  margin: 60px 0 41px 0;
  display: flex;
  width: 100%;
  justify-content: center;
  button {
    border: 1px solid #00a758;
    border-radius: 11px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    &:hover {
      opacity: 70%;
    }
  }
`;
