import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";

import Header from "../Header";
import SimilarProductItem from "../SimilarProductItem";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const ProductItemDetails = () => {
  const [productData, setProductData] = useState({});
  const [similarProductsData, setSimilarProductsData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwt_token");

  useEffect(() => {
    // console.log("Checking for access token...");
    if (!jwtToken) {
      navigate("/login");
    }
  }, [jwtToken, navigate]);

  const getFormattedData = (data) => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
  });

  const getProductData = useCallback(async () => {
    // console.log("Fetching product data...");
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get("jwt_token");
    console.log("JWT Token retrieved:", jwtToken);
    const apiUrl = `https://apis.ccbp.in/products/${id}`;
    // console.log("API URL:", apiUrl);
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    try {
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const fetchedData = await response.json();
        const updatedData = getFormattedData(fetchedData);
        const updatedSimilarProductsData = fetchedData.similar_products.map(
          (eachSimilarProduct) => getFormattedData(eachSimilarProduct)
        );
        setProductData(updatedData);
        setSimilarProductsData(updatedSimilarProductsData);
        setApiStatus(apiStatusConstants.success);
      } else if (response.status === 404) {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      setApiStatus(apiStatusConstants.failure);
    }
  }, [id]);

  useEffect(() => {
    console.log("Component mounted, fetching product data...");
    getProductData();
  }, [getProductData]);

  const renderLoadingView = () => (
    <div className="products-details-loader-container" id="loader">
      <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  const renderFailureView = () => (
    <div className="product-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="failure-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  );

  const onDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const onIncrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const renderProductDetailsView = () => {
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
      totalReviews,
    } = productData;

    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={imageUrl} alt="product" className="product-image" />
          <div className="product">
            <h1 className="product-name">{title}</h1>
            <p className="price-details">Rs {price}/-</p>
            <div className="rating-and-reviews-count">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="reviews-count">{totalReviews} Reviews</p>
            </div>
            <p className="product-description">{description}</p>
            <div className="label-value-container">
              <p className="label">Available:</p>
              <p className="value">{availability}</p>
            </div>
            <div className="label-value-container">
              <p className="label">Brand:</p>
              <p className="value">{brand}</p>
            </div>
            <hr className="horizontal-line" />
            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onDecrementQuantity}
                id="minus"
              >
                <BsDashSquare className="quantity-controller-icon" />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onIncrementQuantity}
                id="plus"
              >
                <BsPlusSquare className="quantity-controller-icon" />
              </button>
            </div>
            <button type="button" className="button add-to-cart-btn">
              ADD TO CART
            </button>
          </div>
        </div>
        <h1 className="similar-products-heading">Similar Products</h1>
        <ul className="similar-products-list">
          {similarProductsData.map((eachSimilarProduct) => (
            <SimilarProductItem
              productDetails={eachSimilarProduct}
              key={eachSimilarProduct.id}
            />
          ))}
        </ul>
      </div>
    );
  };

  const renderProductDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductDetailsView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="product-item-details-container">
        {renderProductDetails()}
      </div>
    </>
  );
};

export default ProductItemDetails;
