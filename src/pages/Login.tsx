import styled from "styled-components";
import mainLogo from "../assets/mainLogo.svg";
import { Container } from "../components/Container";
import { FontSize } from "../constants/FontSize";
import { Colors } from "../constants/Colors";
import { LoginValidated } from "../utils";
import { Link } from "react-router-dom";

interface HandleLoginProps {
  tokenLogin: () => void;
}

export const Login = ({ tokenLogin }: HandleLoginProps) => {
  return (
    <>
      <Container>
        <MainLogoDiv>
          <MainLogoImg src={mainLogo}></MainLogoImg>
          <H1>환영합니다!</H1>
        </MainLogoDiv>

        <LoginFormDiv>
          <LoginValidated tokenLogin={tokenLogin} />
        </LoginFormDiv>

        <Div>
          <LoginUl>
            <LoginSeb>아직 아이사랑 회원이 아니신가요?</LoginSeb>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <LoginLi>회원가입 &gt; </LoginLi>
            </Link>
          </LoginUl>
        </Div>
      </Container>
    </>
  );
};
export default Login;

const MainLogoDiv = styled.div`
  margin-top: 4%;
`;

const MainLogoImg = styled.img`
  padding: 3% 3% 0 3%;
`;

const H1 = styled.p`
  font-size: ${FontSize.h1};
  margin: 0;
  padding: 2%;
  color: ${Colors.primary};
  font-weight: 700;
`;

const LoginFormDiv = styled.div`
  width: 100%;
`;

const Div = styled.div`
  padding-bottom: 15%;
`;
const LoginUl = styled.div`
  display: flex;
  justify-content: center; /* 좌우정렬 */
  padding: 1%;
`;

const LoginLi = styled.div`
  // padding: 0.5%;
  font-size: ${FontSize.h3};
  color: ${Colors.primary};
  font-weight: 700;
`;

const LoginSeb = styled.div`
  font-size: ${FontSize.h3};
  color: #7d7d7d;
  margin-right: 1%;
`;
