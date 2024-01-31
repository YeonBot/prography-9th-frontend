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

  padding: 2rem;

  & > * {
    margin-bottom: 2rem;
  }
`;

export default App;
