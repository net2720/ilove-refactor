import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DaumPostCode from 'react-daum-postcode';

import IconLeft from '../assets/iconLeft.svg';
import PinWheel from '../assets/Pinwheel.gif';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import { BorderRadius, Colors, FontSize } from '../constants/Index';
import { CardBox, Container } from '../components/Index';

import { BasicButton, DeleteButton, ChangePWModal } from '../components/Index';
import { instance } from '../services/Fetcher';
import {
  ChangePWModalRef,
  DeleteUserModal,
  DeleteUserModalRef,
} from '../components/MyPageModal';
import axios from 'axios';

interface Latlng {
  lat: number | null;
  lng: number | null;
}

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
  const [addrModalState, setAddrModalState] = useState(false);

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

  //Daum 주소 검색 API
  const handleAddrModalOpen = () => {
    setAddrModalState(true);
  };

  const handleAddrModalClose = () => {
    setAddrModalState(false);
  };

  const handleDaumApi = async (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    const { addressType, bname, buildingName } = data;
    if (addressType === 'R') {
      if (bname !== '') {
        extraAddress += bname;
      }
      if (buildingName !== '') {
        extraAddress += `${extraAddress !== '' && ', '}${buildingName}`;
      }
      fullAddress += `${extraAddress !== '' ? ` ${extraAddress}` : ''}`;
    }

    const convertAddressToCoordinates = async () => {
      const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${fullAddress}`;
      const headers = {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
      };

      try {
        const response = await axios.get(url, { headers });

        if (response.status === 200) {
          const lng = parseFloat(response.data.documents[0].address.x);
          const lat = parseFloat(response.data.documents[0].address.y);
          return { lat, lng };
        } else {
          return { lat: null, lng: null };
        }
      } catch (error) {
        return { lat: null, lng: null };
      }
    };
    const { lat, lng }: Latlng = await convertAddressToCoordinates();

    const newAddress = data.address.split(' '); // 검색한 주소를 배열로 전환
    const dutyAddr1Depth = newAddress.splice(0, 2).join(' '); // 시,도 주소를 뽑아내기 위해서 인덱스 번호로 자름
    const dutyAddr2Depth = [...newAddress].join(' '); // 시,도 주소를 제외한 나머지 주소를 상세주소 변수에 추가

    setAddr1State(dutyAddr1Depth); // 시,도 주소 변수 값으로 State변화
    setAddr2State(dutyAddr2Depth); // 상세주소 변수 값으로 State변화
    if (lat) setLatState(lat);
    if (lng) setLonState(lng);

    handleAddrModalClose(); // 주소 선택 시 모달 닫음
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
        {isEditing ? (
          <AddrGridBox>
            <Edit value={addr1State} readOnly />
            <Edit value={addr2State} readOnly />
            <BasicButton onClick={handleAddrModalOpen}>주소 찾기</BasicButton>
          </AddrGridBox>
        ) : (
          <Info>
            {addr1State} {addr2State}
          </Info>
        )}
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
      {addrModalState && (
        <ModalContainer>
          <Modal>
            <DaumPostCode onComplete={handleDaumApi} className="post-code" />
            <BasicButton onClick={handleAddrModalClose}>닫기</BasicButton>
          </Modal>
        </ModalContainer>
      )}
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

const AddrGridBox = styled.div`
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

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

export const Modal = styled.div`
  width: 30%;
  height: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: ${BorderRadius.modalRadius};
`;
