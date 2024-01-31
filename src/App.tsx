import "./App.css";
import "./reset.css";
import { CategoryList } from "./components/CategoryList";
import { Header } from "./components/Header";
import styled from "styled-components";

function App() {
  return (
    <AppContainer className="App">
      <Header />
      <Layout>
        <CategoryList />
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
