import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";
import Cart from "./components/Cart";
import Products from "./components/Products";
import ProductItemDetails from "./components/ProductItemDetails";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/products" element={<Products />}></Route>
      <Route path="/products/:id" element={<ProductItemDetails />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
