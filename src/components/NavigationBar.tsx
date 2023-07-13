import map from '../assets/map.svg';
import miniLogo from '../assets/miniLogo.svg';
import myInfo from '../assets/myInfo.svg';

import { Link } from 'react-router-dom';

// 상수값 연결 링크
import styled from 'styled-components';
import { Colors } from '../constants/Colors';

export const NavigationBar = () => {
  const token = localStorage.getItem('token');
  return (
    <>
      <Nav>
        <NavUl>
          <NavLi>
            <NavA to="/">
              <NavImg src={map} alt="star"></NavImg>
              <NavP>병원찾기</NavP>
            </NavA>
          </NavLi>

          <NavLi>
            <NavA to="/">
              <NavLogo src={miniLogo} alt="star"></NavLogo>
            </NavA>
          </NavLi>

          <NavLi>
            {token ? (
              <NavA to="/myPage">
                <NavImg src={myInfo} alt="star"></NavImg>
                <NavP>내정보</NavP>
              </NavA>
            ) : (
              <NavA to="/login">
                <NavImg src={myInfo} alt="star"></NavImg>
                <NavP>내정보</NavP>
              </NavA>
            )}
          </NavLi>
        </NavUl>
      </Nav>
    </>
  );
};
const Nav = styled.div`
  width: 100%;
  border-top: 1px solid ${Colors.InputBorderOut};
  position: fixed;
  max-width: 834px;
  bottom: 0;
  z-index: 99;
  background-color: #ffffff;
`;

const NavUl = styled.ul`
  height: 90px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLi = styled.li`
  width: 20%;
  padding: 1%;
  list-style-type: none;
`;

const NavA = styled(Link)`
  color: ${Colors.fontColor};
`;

const NavImg = styled.img`
  width: 41px;
  height: 41px;
`;

const NavP = styled.p`
  color: #777777;
  font-weight: 500;
  margin: 4px 0 0 0;
`;

const NavLogo = styled.img`
  margin-bottom: 20px;
`;
