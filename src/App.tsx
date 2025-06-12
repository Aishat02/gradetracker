import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/styles/app.scss";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./Home";
import UserAccount from "./UserAccount";
// Home, Dashboard

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <main className="App container-fluid">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/user-account" element={<UserAccount />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
