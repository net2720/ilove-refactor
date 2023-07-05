import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Home,
  SearchHp,
  Login,
  Container,
  NavigationBar,
  SignUp,
} from './pages/Index';

const App: React.FC = () => {
  return (
    <>
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Helmet>
                  <title>아이사랑</title>
                </Helmet>
                <Home />
              </>
            }
          ></Route>
          <Route
            path="/searchHp"
            element={
              <>
                <Helmet>
                  <title>아이사랑 - 병원찾기</title>
                </Helmet>
                <SearchHp />
              </>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <>
                <Helmet>
                  <title>아이사랑 - 로그인</title>
                </Helmet>
                <Login />
              </>
            }
          ></Route>
          <Route
            path="/signUp"
            element={
              <>
                <Helmet>
                  <title>아이사랑 - 회원가입</title>
                </Helmet>
                <SignUp />
              </>
            }
          ></Route>
        </Routes>
        <NavigationBar />
      </Container>
    </>
  );
};

export default App;
