import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

import { Map, MapMarker } from "react-kakao-maps-sdk";
import { IconMapG } from "../assets";

import locationGreen from "../assets/iconLocationGreen.svg";
import phoneGreen from "../assets/phoneGreen.svg";
import clockGreen from "../assets/clockGreen.svg";
import tagGreen from "../assets/tagGreen.svg";
import smileGreen from "../assets/smileGreen.svg";
import IconLeft from "../assets/iconLeft.svg";
import { instance } from "../services/Fetcher";

import { Container, NavigationBar, SmallCategories } from "../components/Index";

import { Colors, FontSize } from "../constants/Index";

interface NewHeaderProps {
  label: string | null | undefined;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface ReviewButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  $clicked: {};
}

interface HospitalDataProps {
  dutyName: string | null;
  dutyAddr: string | null;
  dutyTel1: String | null;
  dutyTime1c: string | null;
  dutyTime1s: string | null;
  dutyTime2c: string | null;
  dutyTime2s: string | null;
  dutyTime3c: string | null;
  dutyTime3s: string | null;
  dutyTime4c: string | null;
  dutyTime4s: string | null;
  dutyTime5c: string | null;
  dutyTime5s: string | null;
  dutyTime6c: string | null;
  dutyTime6s: string | null;
  dutyTime7c: string | null;
  dutyTime7s: string | null;
  dutyTime8c: string | null;
  dutyTime8s: string | null;
  dutyEtc: string | null;
  wgs84Lat: number | null;
  wgs84Lon: number | null;
}

type TimeProps = (time: string | null) => string | null;

export const HospitalInfo = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hospitalId = searchParams.get("id");
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : false;
  const navigate = useNavigate();

  const [hospitalData, setHospitalData] = useState<HospitalDataProps | null>(
    null
  );
  const [hospitalReviews, setHospitalReviews] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    const getHospitalDataAxios = async () => {
      const response = await instance.get(`/hospital/${hospitalId}`);
      const insultData = response.data.data;
      setHospitalData(insultData);
    };

    if (token) {
      const isUserReviewedThisHospital = async () => {
        const response = await instance.get(`/reviews/user/${hospitalId}`);
        const userVote = response.data.data;
        if (userVote.length !== 0) {
          setUserReviews(userVote[0].vote);
        }
      };
      isUserReviewedThisHospital();
    }

    getHospitalDataAxios();
  }, [token, hospitalId]);

  useEffect(() => {
    const getHospitalReviewAxios = async () => {
      const response = await instance.get(`/reviews/${hospitalId}`);
      const allReviews = response.data.data;
      setHospitalReviews(allReviews);
    };
    getHospitalReviewAxios();
  }, [userReviews, hospitalId]);

  const reviewClick = async (label: string) => {
    if (token) {
      const data = { vote: label };
      const response = await instance.post(`/reviews/${hospitalId}`, {
        vote: data.vote,
      });
      const isNotEmptyArray = response.data.data;
      if (isNotEmptyArray.length !== 0) {
        const isUserVoted = isNotEmptyArray[0].vote;
        setUserReviews(isUserVoted);
      } else {
        setUserReviews([]);
      }
    } else {
      toast("로그인을 진행해 주세요");
    }
  };

  const formatTime: TimeProps = (time) => {
    if (!time) {
      return null;
    }
    const hours = time?.slice(0, 2);
    const minutes = time?.slice(2);
    return `${hours}:${minutes}`;
  };

  const NewHeader: React.FC<NewHeaderProps> = ({ label, onClick }) => {
    return (
      <>
        <HeaderWrap>
          <BtnBack onClick={() => navigate("/search")}>
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
      <ToastContainer
        position="top-center"
        limit={1}
        closeButton={false}
        autoClose={4000}
        hideProgressBar
      />
      <HeaderContainer>
        <NewHeader label={hospitalData?.dutyName} />
      </HeaderContainer>
      <TopContentContainer>
        <NameBox>{hospitalData?.dutyName}</NameBox>
        <UnderLine />
      </TopContentContainer>
      <BottomContentContainer>
        <HpInfo>
          <img alt="" src={locationGreen} />
          <span>{hospitalData?.dutyAddr}</span>
        </HpInfo>
        <HpInfo>
          <img alt="" src={phoneGreen} />
          <span>{hospitalData?.dutyTel1}</span>
        </HpInfo>
        <HpInfo>
          <img alt="" src={clockGreen} />
          <HpInfoGrid>
            {hospitalData?.dutyTime1c && hospitalData?.dutyTime1s && (
              <SmallCategories>
                월 {formatTime(hospitalData?.dutyTime1s)}-
                {formatTime(hospitalData?.dutyTime1c)}
              </SmallCategories>
            )}
            {hospitalData?.dutyTime2c && hospitalData?.dutyTime2s && (
              <SmallCategories>
                화 {formatTime(hospitalData?.dutyTime2s)}-
                {formatTime(hospitalData?.dutyTime2c)}
              </SmallCategories>
            )}
            {hospitalData?.dutyTime3c && hospitalData?.dutyTime3s && (
              <SmallCategories>
                수 {formatTime(hospitalData?.dutyTime3s)}-
                {formatTime(hospitalData?.dutyTime3c)}
              </SmallCategories>
            )}
            {hospitalData?.dutyTime4c && hospitalData?.dutyTime4s && (
              <SmallCategories>
                목 {formatTime(hospitalData?.dutyTime4s)}-
                {formatTime(hospitalData?.dutyTime4c)}
              </SmallCategories>
            )}
            {hospitalData?.dutyTime5c && hospitalData?.dutyTime5s && (
              <SmallCategories>
                금 {formatTime(hospitalData?.dutyTime5s)}-
                {formatTime(hospitalData?.dutyTime5c)}
              </SmallCategories>
            )}
            {hospitalData?.dutyTime6c && hospitalData?.dutyTime6s && (
              <SmallCategories>
                토 {formatTime(hospitalData?.dutyTime6s)}-
                {formatTime(hospitalData?.dutyTime6c)}
              </SmallCategories>
            )}
            {hospitalData?.dutyTime7c && hospitalData?.dutyTime7s && (
              <SmallCategories>
                일 {formatTime(hospitalData?.dutyTime7s)}-
                {formatTime(hospitalData?.dutyTime7c)}
              </SmallCategories>
            )}
            {hospitalData?.dutyTime8c && hospitalData?.dutyTime8s && (
              <SmallCategories>
                공휴일 {formatTime(hospitalData?.dutyTime8s)}-
                {formatTime(hospitalData?.dutyTime8c)}
              </SmallCategories>
            )}
          </HpInfoGrid>
        </HpInfo>
        <HpInfo>
          <img alt="" src={tagGreen} />
          <HpInfoGrid>
            {hospitalData?.dutyEtc ? (
              <SmallCategories>{hospitalData?.dutyEtc}</SmallCategories>
            ) : (
              <SmallCategories>태그가 없습니다</SmallCategories>
            )}
          </HpInfoGrid>
        </HpInfo>
        <HpInfo>
          <img alt="" src={smileGreen} />
          <h1>이런 점이 좋았어요</h1>
        </HpInfo>
        <ReviewContainer>
          <ReviewButton
            onClick={() => reviewClick("kindDoctor")}
            $clicked={userReviews}
            label="kindDoctor"
          >
            친절한 의사 선생님
            {hospitalReviews && (
              <span>{JSON.stringify(hospitalReviews[0])}</span>
            )}
          </ReviewButton>
          <ReviewButton
            onClick={() => reviewClick("professional")}
            $clicked={userReviews}
            label="professional"
          >
            전문적인 치료
            {hospitalReviews && (
              <span>{JSON.stringify(hospitalReviews[1])}</span>
            )}
          </ReviewButton>
          <ReviewButton
            onClick={() => reviewClick("kindEmployee")}
            $clicked={userReviews}
            label="kindEmployee"
          >
            상냥한 간호사·직원
            {hospitalReviews && (
              <span>{JSON.stringify(hospitalReviews[2])}</span>
            )}
          </ReviewButton>
          <ReviewButton
            onClick={() => reviewClick("goodReceipt")}
            $clicked={userReviews}
            label="goodReceipt"
          >
            편리한 접수·예약
            {hospitalReviews && (
              <span>{JSON.stringify(hospitalReviews[3])}</span>
            )}
          </ReviewButton>
          <ReviewButton
            onClick={() => reviewClick("cleanHospital")}
            $clicked={userReviews}
            label="cleanHospital"
          >
            깨끗한 시설
            {hospitalReviews && (
              <span>{JSON.stringify(hospitalReviews[4])}</span>
            )}
          </ReviewButton>
          <ReviewButton
            onClick={() => reviewClick("goodTraffic")}
            $clicked={userReviews}
            label="goodTraffic"
          >
            편한 교통·주차
            {hospitalReviews && (
              <span>{JSON.stringify(hospitalReviews[5])}</span>
            )}
          </ReviewButton>
        </ReviewContainer>
        {hospitalData && hospitalData.wgs84Lat && hospitalData.wgs84Lon ? (
          <Wrapper>
            <Map
              center={{
                lat: hospitalData.wgs84Lat,
                lng: hospitalData.wgs84Lon,
              }} // 지도의 중심 좌표
              style={{
                width: "100%",
                height: "100%",
                zIndex: "1",
              }}
              level={3} // 지도 확대 레벨
            >
              <MapMarker
                position={{
                  lat: hospitalData.wgs84Lat,
                  lng: hospitalData.wgs84Lon,
                }}
                image={{
                  src: IconMapG,
                  size: {
                    width: 64,
                    height: 69,
                  }, // 마커이미지의 크기입니다
                  options: {
                    offset: {
                      x: 27,
                      y: 69,
                    }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                  },
                }}
              />
            </Map>
          </Wrapper>
        ) : (
          <></>
        )}
      </BottomContentContainer>
      <NavigationBar />
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
/*const SlideContainer = styled.div`
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
`;*/

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

/*const QueryMapBtn = styled.button`
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
`;*/

const Wrapper = styled.div`
  width: 80%;
  max-width: 834px;
  margin: 15% auto;
  text-align: center;
  padding-bottom: 3%;
  overflow: hidden;
  height: 45vh;
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
  background: ${({ $clicked, label }) => {
    if ($clicked === label) {
      return Colors.primary;
    } else {
      return "#f4f4f4";
    }
  }};
  color: ${({ $clicked, label }) => {
    if ($clicked === label) {
      return "white";
    } else {
      return "#333333";
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
    color: ${({ $clicked, label }) => {
      if ($clicked === label) {
        return "white";
      } else {
        return "#333333";
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
