import { useEffect } from "react";
import Header from "../Header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./index.css";
import AllProductsSection from "../AllProductsSection";
import PrimeDealsSection from "../PrimeDealsSection";

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
      <div className="product-sections">
        <PrimeDealsSection />
        <AllProductsSection />
      </div>
    </>
  );
};

export default Products;
