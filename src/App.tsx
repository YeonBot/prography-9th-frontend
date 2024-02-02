import "./App.css";
import "./reset.css";
import { Header } from "./components/Header";
import styled from "styled-components";
import { Home } from "./components/Home";

function App() {
  return (
    <AppContainer className="App">
      <Header />
      <Layout>
        <Home />
      </Layout>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  @media screen {
    padding: 2rem 10rem;
  }
  @media screen and (max-width: 768px) {
    padding: 1rem 2rem;
  }

  & > * {
    margin-bottom: 2rem;
  }
`;

export default App;
