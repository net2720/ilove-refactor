import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

//import axios from 'axios';

//import Select from 'react-select';

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

//import mainLogo from '../assets/mainLogo.svg';
//import mainLogoSeb from '../assets/mainLogoSeb.svg';
//import MainBanner from '../assets/mainBanner.png';
//import iconPeople from '../assets/iconPeople.svg';
//import arrowRight from '../assets/arrowRight.svg';
//import pinwheel from '../assets/Pinwheel.gif';
//import Loding from '../assets/ImgLoding.jpg';
import newLogo from "../assets/newLogo.jpg";

import { Container, SearchBar } from "../components/Index";

import { Colors } from "../constants/Colors";
//import { FontSize } from '../constants/FontSize';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/*interface SearchBarProps {
  onSearch: (keyword: string) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}*/

interface HomeProps {
  tokenLogoutAndDelete: () => void;
}

export const Home = ({ tokenLogoutAndDelete }: HomeProps) => {
  const token = localStorage.getItem("token");
  let showTab = "";
  let hideTab = "none";
  if (token) {
    showTab = "none";
    hideTab = "";
  } else {
    showTab = "";
    hideTab = "none";
  }
  const navigate = useNavigate();

  /*const [search, setSearch] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');*/

  const handleLogoutClick = () => {
    tokenLogoutAndDelete();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast("로그아웃 성공");
    navigate("/");
  };

  /*const handleLogout = () => {
    const role = localStorage.getItem('role');

    if (token && role) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      toast('로그아웃 성공');
    } else {
      toast('오류로 인해 로그아웃 하지 못했습니다.');
    }
    navigate('/');
  };*/

  return (
    <>
      <Container>
        <ToastContainer
          position="top-center"
          limit={1}
          closeButton={false}
          autoClose={4000}
          hideProgressBar
        />

        <TopMenuBar>
          <MenuLogo>
            <NewLogoImg src={newLogo} alt="아이사랑"></NewLogoImg>
          </MenuLogo>
          <FlexGrow></FlexGrow>

          <MenuSeb>
            <StyledLink to="/login">
              <SebP style={{ display: showTab }}>로그인</SebP>
            </StyledLink>
          </MenuSeb>

          <MenuSeb>
            <LogoutBut style={{ display: hideTab }} onClick={handleLogoutClick}>
              로그아웃
            </LogoutBut>
          </MenuSeb>

          <MenuSeb>
            <StyledLink to="/signUp">
              <SebP style={{ display: showTab }}>회원가입</SebP>
            </StyledLink>
          </MenuSeb>
        </TopMenuBar>

        <SearchBar />

        <MainBannerImg />
      </Container>
    </>
  );
};

const MainBannerImg = () => {
  // 메인배너 이미지
  const images = [{ img: banner1 }, { img: banner2 }, { img: banner3 }];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // 자동 캐러셀
    autoplaySpeed: 5000, // 자동 캐러셀 속도
    pauseOnHover: true, // hover시 정지
    fade: true,
  };

  return (
    <BannerCon>
      <Slider {...settings}>
        {images.map((img) => (
          <BannerImg key={img.img} src={img.img} alt={img.img} />
        ))}
      </Slider>
    </BannerCon>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
/*const H1 = styled.p`
  font-size: 28px;
  font-weight: 900;
  color: ${Colors.fontColor};
  padding: 1%;
  margin-bottom: 3%;
  width: 33.33%;
`;

const H2 = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${Colors.fontColor};
  padding: 1%;
  margin-bottom: 3%;
  width: 33.33%;
`;

const H2Seb = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${Colors.InputBorderOut};
  padding: 1%;
  margin-bottom: 3%;
  width: 33.33%;
`;

const DistanceDiv = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${Colors.fontColor};
  padding: 1%;
  margin-bottom: 3%;
  width: 33.33%;
`;

const MainSub = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SiliderMargin = styled.div`
  margin: 5% 0 8% 0;
`;

const MainLogoImg = styled.img`
  margin-top: 4%;
  margin-top: 4%;
  width: 30%;
`;*/

const NewLogoImg = styled.img`
  width: 100%;
`;

const TopMenuBar = styled.div`
  margin-top: 5%;
  width: 95%;
  // border-bottom: solid 2px ${Colors.primary};
  display: flex;
`;

const FlexGrow = styled.div`
  flex-grow: 1;
`;

const MenuLogo = styled.div`
  padding: 2% 0% 1% 3%;
  width: 20%;
`;

const MenuSeb = styled.div`
  padding: 2% 2% 1% 0%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SebP = styled.p``;

const LogoutBut = styled.p`
  text-decoration: none;
  color: inherit;
`;

/*const Banner = styled.div`
  position: relative;
  width: 100%;
  border-radius: 20px;
  margin: 4% 0;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const BannerSeb = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 5%;
`;

const BanContainer = styled.div`
  display: flex;
  border: 1px solid #dbecdf;
  // background: #eaf9ed;
  border-radius: 10px;
  padding: 3%;
`;

const BannerSebDiv1 = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BannerSebDiv2 = styled.div`
  flex-grow: 5;
  padding: 0 0 0 3%;
  text-align: left;
`;
const BannerSebDiv3 = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BannerSebIcon = styled.img``;

const BannerSebP = styled.p`
  color: #707070;
  padding: 1%;
  font-size: 18px;
`;
const BannerSebH1 = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: #383838;
  padding: 1%;
`;

const Card = styled.div`
  position: relative;
`;

const CardTop = styled.div`
  margin: 0 2% 0 2%;
  transition: opacity 0.6s ease;

  &:hover {
    &::after {
      width: 97%;
      height: 99%;
      background: rgba(0, 0, 0, 0.5);
      content: '';
      position: absolute;
      border-radius: 20px;
      top: 0;
      left: 5px;
      z-index: 1;
    }
  }
`;

const CardTitle = styled.p`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8%;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 80%;
  transition: opacity 0.6s ease;

  ${CardTop}:hover & {
    color: white;
    z-index: 2;
  }
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const Guide = styled.p`
  font-size: 22px;
  font-weight: 700;
  margin: 10% 0 10% 0;
  color: ${Colors.InputBorderOut};
  // text-align: center;
`;*/

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const BannerCon = styled.div`
  margin: 3% 0 8% 0;
`;
