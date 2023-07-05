import styled from 'styled-components';

// 이미지 링크
import mainLogo from '../assets/mainLogo.svg';
import { Container } from '../components/Container';
import { JoinButton } from '../components/BasicButton';
import { FontSize } from '../constants/FontSize';
import { Colors } from '../constants/Colors';
import { BorderRadius, BorderColor } from '../constants/Border';

// 상수로 뽑아둔 color, FontSize 연결 링크

export const Login = () => {
  return (
    <>
      <Container>
        <MainLogoDiv>
          <MainLogoImg src={mainLogo}></MainLogoImg>
          <H1>환영합니다!</H1>
        </MainLogoDiv>

        <LoginFormDiv>
          <LoginForm>
            <LoginInput placeholder="이메일" type="email"></LoginInput>

            <LoginInput placeholder="비밀번호" type="password"></LoginInput>

            <LoginBtn>
              <JoinButton>로그인</JoinButton>
            </LoginBtn>
          </LoginForm>
        </LoginFormDiv>

        <Div>
          <LoginUl>
            <LoginSeb>아직 아이사랑 회원이 아니신가요?</LoginSeb>
            <LoginLi>회원가입 &gt; </LoginLi>
          </LoginUl>
        </Div>
      </Container>
    </>
  );
};
export default Login;

// const ErrorMessage = styled.p`
//   color: #c20000;
// `;

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
const LoginForm = styled.form`
  border: ${BorderColor.normalBorder};
  border-radius: ${BorderRadius.inputRadius};
  padding: 6%;
  text-align: center;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.1);
`;
const LoginInput = styled.input`
  padding: 4%;
  width: 90%;
  margin: 4% auto;
  border-radius: ${BorderRadius.inputRadius};
  border: ${BorderColor.thinBorder};
  font-size: ${FontSize.h3};
`;
const LoginBtn = styled.div`
  border-radius: ${BorderRadius.inputRadius};
  width: 98%;
  margin: 0 auto;
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
