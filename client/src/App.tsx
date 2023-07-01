import "./App.css";
import Header from "./widgets/LayoutHeader/index.tsx";
import { BrowserRouter } from "react-router-dom";
import Footer from "./widgets/footer/footer.tsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">app</main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
