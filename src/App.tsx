import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { RecoilRoot } from "recoil";
import {
  Home,
  SearchHp,
  Login,
  Container,
  NavigationBar,
  SignUp,
  HospitalInfo,
  MyPage,
} from "./pages/Index";

const App: React.FC = () => {
  const [token, setToken] = useState<String | null>(
    localStorage.getItem("token")
  );

  const tokenLogoutAndDelete = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const tokenLogin = () => {
    const newToken = localStorage.getItem("token");
    setToken(newToken);
  };

  return (
    <>
      <RecoilRoot>
        <Container>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Helmet>
                    <title>아이사랑</title>
                  </Helmet>
                  <Home tokenLogoutAndDelete={tokenLogoutAndDelete} />
                </>
              }
            ></Route>
            <Route
              path="/myPage"
              element={
                <>
                  <Helmet>
                    <title>아이사랑 - 내정보</title>
                  </Helmet>
                  <MyPage tokenLogoutAndDelete={tokenLogoutAndDelete} />
                </>
              }
            ></Route>
            <Route
              path="/hospitalInfo"
              element={
                <>
                  <Helmet>
                    <title>아이사랑 - 병원정보</title>
                  </Helmet>
                  <HospitalInfo />
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
                  <Login tokenLogin={tokenLogin} />
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
          <NavigationBar token={token} />
        </Container>
      </RecoilRoot>
    </>
  );
};

export default App;
