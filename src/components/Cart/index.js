import Header from "../Header";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";
import { useEffect } from "react";

const Cart = () => {
  const navigate = useNavigate();
  const accessToken = Cookies.get("jwt_token");

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  if (accessToken === undefined) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="cart-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
          alt="cart"
          className="cart-img"
        />
      </div>
    </>
  );
};

export default Cart;
