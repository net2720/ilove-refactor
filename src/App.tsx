import { Container } from "./components/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Home } from "./pages/Index";
import { Navigation } from "./components/Navigation";
import { SearchBar } from "./components/SearchBar";

const App: React.FC = () => {
  return (
    <>
      <Container>
        <SearchBar />
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
        </Routes>

        <Navigation />
      </Container>
    </>
  );
};

export default App;
