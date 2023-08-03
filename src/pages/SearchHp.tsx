import { styled } from "styled-components";
import { Header } from "../components/Header";
import { useState } from "react";
import { BorderColor, BorderRadius } from "../constants/Border";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useRecoilValue } from "recoil";
import { latAtom, lngAtom, nearHospitalAtom } from "../recoil/atoms";
import { IconMapG } from "../assets";
import { NavigationBar } from "./Index";
import MyComponent from "./HpList/MyComponent";
import { useGeolocation } from "./useGeolocation";

// 애니메이션 발동을 위한 animate 타입 지정
interface HpListBoxProps {
    animate: string;
}

export interface LatLon {
    wgs84Lat: number;
    wgs84Lon: number;
    dutyName: string;
    title: number;
}
export const SearchHp = () => {
    // HpListBox 가 화면에 보여진다면 true Y축 아래로 이동했다면 false
    const token = localStorage.getItem("token");
    const [listScrolled, setListScrolled] = useState(true);
    const userLat = useRecoilValue(latAtom);
    const userLon = useRecoilValue(lngAtom);
    const nearLatLon = useRecoilValue(nearHospitalAtom);
    const location = useGeolocation();

    const mapCenter = token
        ? { lat: userLat, lng: userLon }
        : {
              lat: location.coordinates?.lat,
              lng: location.coordinates?.lng,
          };
    const positions =
        nearLatLon?.map((data: LatLon, i: number) => ({
            wgs84Lat: data.wgs84Lat,
            wgs84Lon: data.wgs84Lon,
            dutyName: data.dutyName,
            title: i + 1,
        })) ?? [];

    // 애니메이션 발동 onClick 이벤트

    const handleSlideToggle = () => {
        setListScrolled((prev) => !prev);
    };

    return (
        <>
            <Wrapper>
                <Header />
                <Map
                    center={mapCenter} // 지도의 중심 좌표
                    style={{
                        width: "100%",
                        height: "100%",
                        zIndex: "1",
                    }}
                    level={4} // 지도 확대 레벨
                >
                    {positions.map((position: LatLon) => (
                        <MapMarker
                            position={{
                                lat: position.wgs84Lat,
                                lng: position.wgs84Lon,
                            }}
                            key={position.title}
                            image={{
                                src: IconMapG,
                                size: {
                                    width: 44,
                                    height: 49,
                                },
                                options: {
                                    offset: {
                                        x: 27,
                                        y: 69,
                                    },
                                },
                            }}
                            title={position.dutyName}
                        />
                    ))}
                </Map>
                <HpListBox animate={listScrolled.toString()}>
                    <HpListHeaderBox>
                        <SlideBtn onClick={handleSlideToggle} />
                        <HpListHeaderContent></HpListHeaderContent>
                    </HpListHeaderBox>
                    <HpDetailBox>
                        <MyComponent userLat={userLat} userLon={userLon} />
                    </HpDetailBox>
                </HpListBox>
            </Wrapper>
            <NavigationBar />
        </>
    );
};

const Wrapper = styled.div`
    width: 100%;
    max-width: 834px;
    margin: 0 auto;
    text-align: center;
    padding-bottom: 3%;
    overflow: hidden;
    height: 90vh;
`;

// 헤더 ~네비게이션 사이 전체 박스
const HpListBox = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "animate", // "animate" 프롭을 제외한 나머지 프롭만 전달
})<HpListBoxProps>`
    width: 100%;
    height: 84%;
    margin: 5% auto 0% auto;
    background-color: white;
    border: ${BorderColor.thinBorder};
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;

    position: relative;
    bottom: 90%;
    z-index: 99;
    transition: transform 0.3s ease;
    transform: translateY(
        ${(props) => (props.animate === "true" ? "0" : "75%")}
    );
`;

// HpListBox 내의 헤더 즉 상단 박스
const HpListHeaderBox = styled.div`
    width: 100%;
    height: 20%;
    overflow: hidden;
    background-color: white;
    border-top-left-radius: ${BorderRadius.SearchRadius};
    border-top-right-radius: ${BorderRadius.SearchRadius};
    border-bottom: 1px solid rgb(128, 128, 128, 0.5);
`;

const CategoryBox = styled.div`
    width: 30%;
    margin-bottom: 3%;
`;

// 애니메이션 이벤트 버튼
const SlideBtn = styled.button`
    width: 5%;
    margin-bottom: 3.5%;
`;

// HpListBox 헤더 부분의 내용을 적는 부분
const HpListHeaderContent = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
`;

// HpListBox 헤더 부분을 제외한 병원 리스트들을 담는 박스
const HpDetailBox = styled.div`
    width: 100%;
    height: 80%;
`;
