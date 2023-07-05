import { Container } from './components/Container';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Home, HospitalInfo } from './pages/Index';
import { Navigation } from './components/Navigation';
import { SearchBar } from './components/SearchBar';
import { SearchHp } from './pages/SearchHp';

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
        </Routes>

        <Navigation />
      </Container>
    </>
  );
};

export default App;
