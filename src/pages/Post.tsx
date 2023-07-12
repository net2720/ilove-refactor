import React, { useState } from "react";
import DaumPostCode from "react-daum-postcode";
import styled from "styled-components";
import axios from "axios";
import { BasicButton } from "../components/BasicButton";
import { LoginInput, InputTitle } from "../utils";
import { BorderRadius } from "../constants/Border";

interface Latlng {
  lat: number | null;
  lng: number | null;
}

type addrProps = {
  getAddrData: (
    addr1: string,
    addr2: string,
    lat: number | null,
    lng: number | null,
    fullAddress: string
  ) => void;
};

export const Post = ({ getAddrData }: addrProps) => {
  const [isOpen, setIsOpen] = useState(false); //모달 상태
  const [dutyAddr1Depth, setDutyAddr1Depth] = useState(""); // 시,도 주소
  const [dutyAddr2Depth, setDutyAddr2Depth] = useState(""); // 상세주소

  const handleOpenModal = () => {
    // 모달 오픈
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    // 모달 클로즈
    setIsOpen(false);
  };

  // 주소 검색 다음 api
  const handleComplete = async (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    const { addressType, bname, buildingName } = data;
    if (addressType === "R") {
      if (bname !== "") {
        extraAddress += bname;
      }
      if (buildingName !== "") {
        extraAddress += `${extraAddress !== "" && ", "}${buildingName}`;
      }
      fullAddress += `${extraAddress !== "" ? ` ${extraAddress}` : ""}`;
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

    const newAddress = data.address.split(" "); // 검색한 주소를 배열로 전환
    const dutyAddr1Depth = newAddress.splice(0, 2).join(" "); // 시,도 주소를 뽑아내기 위해서 인덱스 번호로 자름
    const dutyAddr2Depth = [...newAddress].join(" "); // 시,도 주소를 제외한 나머지 주소를 상세주소 변수에 추가

    const addr1 = dutyAddr1Depth;
    const addr2 = dutyAddr2Depth;

    setDutyAddr2Depth(dutyAddr2Depth); // 시,도 주소 변수 값으로 State변화
    setDutyAddr1Depth(dutyAddr1Depth); // 상세주소 변수 값으로 State변화
    getAddrData(addr1, addr2, lat, lng, fullAddress); // 레지스터폼에서 props로 내려온 getAddrData 함수에 2가지 종류의 주소 데이터를 보냄

    handleCloseModal(); // 주소 선택 시 모달 닫음
  };

  return (
    <>
      <InputBox>
        <PostBox>
          <InputTitle>주소</InputTitle>
          <BtnBox>
            <BasicButton onClick={handleOpenModal}>주소 찾기</BasicButton>
          </BtnBox>

          {isOpen && (
            <ModalContainer>
              <Modal>
                <DaumPostCode
                  onComplete={handleComplete}
                  className="post-code"
                />
                <BasicButton onClick={handleCloseModal}>닫기</BasicButton>
              </Modal>
            </ModalContainer>
          )}
        </PostBox>
        <LoginInput type="text" value={dutyAddr1Depth} readOnly />
        <LoginInput type="text" value={dutyAddr2Depth} readOnly />
      </InputBox>
    </>
  );
};

const PostBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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

export const InputBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 2% 0;
  display: flex;
  flex-direction: column;
`;

const BtnBox = styled.div`
  width: 20%;
  margin-right: 1%;
`;
