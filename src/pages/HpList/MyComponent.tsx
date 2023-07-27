import React, { useState, useEffect, ReactNode } from "react";
import VirtualScroll, { RowRendererParams } from "./VirtualScroll";
import { instance } from "../../services/Fetcher";
import { useRecoilState } from "recoil";
import { hpNameAtom, nearHospitalAtom } from "../../recoil/atoms";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { LatLon } from "../SearchHp";

interface ElemForm {
  i: number;
  style: Object;
}
export interface ScrollDataForm extends LatLon {
  dutyName: string;
  dutyAddr: string;
  id: number;
  dutyAddr2Depth: ReactNode;
  [i: number]: {
    id: number;
    dutyName: string;
    dutyAddr2Depth: string;
  };
  length: number;
}

// export interface rowRendererForm {
//   index: number;
//   key: React.Key;
//   style: Element;
// }

interface MyComponentProps {
  userLat: number;
  userLon: number;
}
export const MyComponent: React.FC<MyComponentProps> = ({
  userLat,
  userLon,
}) => {
  const [scrollData, setScrollData] = useState<ScrollDataForm[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [hospitalNameInput, setHospitalNameInput] = useRecoilState(hpNameAtom);
  const distance = 3;
  const [nearHospitalData, setNearHospitalData] =
    useRecoilState(nearHospitalAtom);

  const Elem = ({ i, style }: ElemForm) => {
    const navigate = useNavigate();
    const handleLinkClick = () => {
      navigate(`/hospitalInfo?id=${scrollData[i].id}`);
      setHospitalNameInput("");
    };

    return (
      <>
        <button
          onClick={handleLinkClick}
          style={{
            ...style,

            backgroundColor: "#fff",

            border: "0px",
            borderBottom: "1px solid green",
          }}
        >
          <CardBox>
            <HpNumberBox>
              <HpNumber>{i + 1}</HpNumber>
            </HpNumberBox>
            <HpContentBox>
              <span>{scrollData[i].dutyName}</span>
              <span>{scrollData[i].dutyAddr}</span>
            </HpContentBox>
            <HpImageBox></HpImageBox>
          </CardBox>
        </button>
      </>
    );
  };

  useEffect(() => {
    setHospitalNameInput("");
  }, []);

  const { data } = useQuery<ScrollDataForm[]>(
    ["hpList", hospitalNameInput],
    async () => {
      if (hospitalNameInput) {
        const response = await instance.get(
          `/hospital/hp10/${hospitalNameInput}?size=10&page=1`
        );
        setScrollData(response.data.data);
        return response.data.data;
      } else {
        const response = await instance.get("/hospital/near", {
          params: {
            userLat: userLat,
            userLon: userLon,
            r: distance,
          },
        });
        setScrollData(response.data.data);
        setNearHospitalData(response.data.data);
        return response.data.data;
      }
    },
    {
      enabled: hospitalNameInput.length >= 0,
      staleTime: 1000,
    }
  );

  const fetchMoreData = async () => {
    let page = 0;
    if (hospitalNameInput) {
      try {
        page = Math.ceil(scrollData.length / 10) + 1;
        const newScrollData = await instance.get(
          `/hospital/hp10/${hospitalNameInput}?size=10&page=${page}`
        );

        if (newScrollData.data.success) {
          const nextScrollData = scrollData.concat(newScrollData.data.data);
          setScrollData(nextScrollData);
        }
      } catch (error) {
        // 에러 처리
      }
    }
  };

  // 데이터 리미트
  useEffect(() => {
    if (scrollData.length >= 100) {
      setHasMore(false);
    }
  }, [scrollData.length]);

  const rowRenderer = ({ index, key, style }: RowRendererParams) => (
    <Elem key={key} i={index} style={style} />
  );

  /*지정된 병원을 div 같은 것으로 심어주면 될 것 같습니다.
  여기서 div 같은 걸로 심는 것 보다는 가입 페이지에
  인풋 태그나 그런걸 하나 만들어서 거기에 담아주는 편이 좋을 것 같네요.*/
  return (
    <>
      <VirtualScroll
        dataLength={scrollData.length}
        hasMore={hasMore}
        next={fetchMoreData}
        loader={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
        }
        height={300}
        elementHeight={70}
        rowRenderer={rowRenderer}
        children={scrollData}
      />
    </>
  );
};

/*이런 식으로 심어둔 selectedHospital을 로그인 페이지에 담아서
AJAX 통신으로 보내주면 우리가 원하던 병원의 id를 같이
보내 줄 수 있을거라 생각됩니다.*/

export default MyComponent;

// 병원 리스트의 순서를 담을 박스
const HpNumberBox = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: space-between;
`;

// 병원 리스트에서 상세정보를 담을 박스
const HpContentBox = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;

  & span {
    margin: 1% 0 1% 0;
  }
`;

// 병원 리스트에서 이미지를 담을 박스
const HpImageBox = styled.div`
  width: 10%;
  height: 100%;
`;

// 병원 리스트 번호
const HpNumber = styled.div`
  width: 30%;
  height: 30%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardBox = styled.div`
  width: 100%;
  height: 20%;
  background-color: #ffffff;

  box-sizing: border-box;

  display: flex;
`;
