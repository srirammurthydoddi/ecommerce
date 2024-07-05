import { useEffect } from "react";
import Header from "../Header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Products = () => {
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
      <div className="products-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-img.png"
          alt="products"
          className="products-img"
        />
      </div>
    </>
  );
};

export default Products;
