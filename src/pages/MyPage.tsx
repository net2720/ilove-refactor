import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import IconLeft from '../assets/iconLeft.svg';
import PinWheel from '../assets/Pinwheel.gif';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import { Colors, FontSize } from '../constants/Index';
import { CardBox, Container } from '../components/Index';

import { BasicButton, DeleteButton, ChangePWModal } from '../components/Index';
import { instance } from '../services/Fetcher';
import {
  ChangePWModalRef,
  DeleteUserModal,
  DeleteUserModalRef,
} from '../components/MyPageModal';

export const MyPage = () => {
  const token = localStorage.getItem('token');

  //유저 정보 상태 관리
  const [originState, setOriginState] = useState({});
  const [nameState, setNameState] = useState('');
  const [contectState, setContectState] = useState('');
  const [addr1State, setAddr1State] = useState('');
  const [addr2State, setAddr2State] = useState('');
  const [latState, setLatState] = useState(0);
  const [lonState, setLonState] = useState(0);
  const [emailState, setEmailState] = useState('');

  const [isEditing, setIsEditing] = useState(false);

  const changePWModalRef = useRef<ChangePWModalRef>(null);
  const deleteUserModalRef = useRef<DeleteUserModalRef>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await instance.get('/users/get');
      const userData = response.data.data[0];
      setOriginState(userData);
      setNameState(userData.name);
      setContectState(userData.phoneNumber);
      setAddr1State(userData.addr1);
      setAddr2State(userData.addr2);
      setLatState(userData.userLat);
      setLonState(userData.userLon);
      setEmailState(userData.email);
    };
    fetchUserData();
  }, [token]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const editFinish = async () => {
    const checkNum = contectState.split('-');
    if (checkNum.length !== 3 || checkNum[0] !== '010') {
      toast(`연락처를 정확히 입력해 주세요. 입력 형식은 010-XXXX-XXXX 입니다.`);
    } else {
      await instance.patch('/users/update', {
        name: nameState,
        phoneNumber: contectState,
        addr1: addr1State,
        addr2: addr2State,
        userLat: latState,
        userLon: lonState,
      });
      setIsEditing(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameState(e.target.value);
  };

  const handleContectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContectState(e.target.value);
  };

  const handleEditCancle = () => {
    //@ts-ignore
    setNameState(originState.name);
    //@ts-ignore
    setContectState(originState.phoneNumber);
    setIsEditing(false);
  };

  const navigate = useNavigate();
  return (
    <Container>
      <ToastContainer
        position="top-center"
        limit={1}
        closeButton={false}
        autoClose={4000}
        hideProgressBar
      />
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
        {isEditing ? (
          <Edit value={nameState} onChange={handleNameChange} />
        ) : (
          <Info>{nameState}</Info>
        )}
      </CardBox>
      <CardBox>
        <TagName>이메일</TagName>
        <Info>{emailState}</Info>
      </CardBox>
      <CardBox>
        <TagName>연락처</TagName>
        {isEditing ? (
          <Edit value={contectState} onChange={handleContectChange} />
        ) : (
          <Info>{contectState}</Info>
        )}
      </CardBox>
      <CardBox>
        <TagName>주소</TagName>
        <Info>
          {addr1State} {addr2State}
        </Info>
      </CardBox>
      <ButtonGridBox>
        {isEditing ? (
          <BasicButton onClick={editFinish}>수정 완료</BasicButton>
        ) : (
          <BasicButton onClick={handleEdit}>정보 수정</BasicButton>
        )}
        {isEditing ? (
          <DeleteButton onClick={handleEditCancle}>수정 취소</DeleteButton>
        ) : (
          <BasicButton onClick={(e) => changePWModalRef.current?.openModal()}>
            비밀 번호 변경
          </BasicButton>
        )}
        {isEditing ? (
          <></>
        ) : (
          <DeleteButton
            onClick={(e) => deleteUserModalRef.current?.openModal()}
          >
            회원 탈퇴
          </DeleteButton>
        )}
      </ButtonGridBox>
      <ChangePWModal ref={changePWModalRef} />
      <DeleteUserModal ref={deleteUserModalRef} />
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
  width: 20%;
  color: ${Colors.InputBorderOut};
  font-weight: bold;
`;

const Info = styled.div`
  margin: 2%;
  color: ${Colors.fontColor};
  font-weight: bold;
`;

const Edit = styled.input`
  margin: 2%;
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
