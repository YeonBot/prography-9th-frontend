import "./App.css";
import "./reset.css";
import { CategoryList } from "./components/CategoryList";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <CategoryList />
    </div>
  );
}

export default App;
