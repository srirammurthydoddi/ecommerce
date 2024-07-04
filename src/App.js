import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
