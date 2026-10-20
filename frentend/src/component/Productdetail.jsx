import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  FiShoppingCart,  FiZap,  FiHeart,  FiTruck,  FiShield,  FiRefreshCw,  FiMinus,  FiPlus,  FiStar,} from "react-icons/fi";

import "../design/productdetail.css";
import { get_product_by_id_axios } from "../axios/product.axios";

function Productdetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  const getProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await get_product_by_id_axios(id);

      console.log("PRODUCT:", response);

      setProduct(response.product
);

    } catch (error) {
      console.error("Product detail error:", error);
      setError("Unable to load product");
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    getProduct();
  }
}, [id]);

  const increaseQuantity = () => {
    if (product?.stock && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      productId: product._id,
      quantity,
    });
  };

  const handleBuyNow = () => {
    console.log("Buy now:", {
      productId: product._id,
      quantity,
    });
  };

  if (loading) {
    return (
      <div className="productdetail-container">
        <p>Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="productdetail-container">
        <p>{error || "Product not found"}</p>
      </div>
    );
  }

  return (
    <div className="productdetail-container">

      <div className="productdetail-card">

        {/* IMAGE */}

        <div className="productdetail-image-section">

          <div className="productdetail-image-box">

            {product.discount > 0 && (
              <span className="productdetail-discount-badge">
                {product.discount}% OFF
              </span>
            )}

            <button
              className={`productdetail-wishlist ${
                wishlist ? "active" : ""
              }`}
              onClick={() => setWishlist((prev) => !prev)}
            >
              <FiHeart />
            </button>

            <img
              src={product.image || product.imageUrl}
              className="productdetail-image"
              alt={product.name}
            />

          </div>

          <div className="productdetail-image-features">

            <div className="image-feature">
              <FiShield />
              <span>Secure Payment</span>
            </div>

            <div className="image-feature">
              <FiTruck />
              <span>Fast Delivery</span>
            </div>

            <div className="image-feature">
              <FiRefreshCw />
              <span>Easy Returns</span>
            </div>

          </div>

        </div>


        {/* PRODUCT INFO */}

        <div className="productdetail-product-info">

          <p className="productdetail-category">
            {product.category}
          </p>

          <h1 className="productdetail-product-name">
            {product.name}
          </h1>

          <p className="productdetail-brand">
            Brand: <strong>{product.brand}</strong>
          </p>


          {/* RATING */}

          <div className="productdetail-rating-row">

            <div className="productdetail-rating">
              <span>{product.rating || 0}</span>
              <FiStar />
            </div>

            <span className="productdetail-reviews">
              Ratings & Reviews
            </span>

          </div>


          <div className="productdetail-divider" />


          {/* PRICE */}

          <div className="productdetail-price-section">

            <span className="productdetail-price">
              ₹{product.price?.toLocaleString("en-IN")}
            </span>

            {product.originalPrice && (
              <span className="productdetail-original-price">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}

            {product.discount > 0 && (
              <span className="productdetail-save">
                Save {product.discount}%
              </span>
            )}

          </div>


          {/* STOCK */}

          <div className="productdetail-stock">

            <span className="stock-dot" />

            {product.stock > 0
              ? `${product.stock} available`
              : "Out of stock"}

          </div>


          {/* DESCRIPTION */}

          <div className="productdetail-description-section">

            <h3>Product Description</h3>

            <p className="productdetail-description">
              {product.description}
            </p>

          </div>


          {/* HIGHLIGHTS */}

          {product.highlights?.length > 0 && (
            <div className="productdetail-highlights">

              <h3>Highlights</h3>

              <ul>
                {product.highlights.map((highlight, index) => (
                  <li key={index}>
                    {highlight}
                  </li>
                ))}
              </ul>

            </div>
          )}


          {/* QUANTITY */}

          <div className="productdetail-quantity-section">

            <span>Quantity</span>

            <div className="quantity-control">

              <button
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <FiMinus />
              </button>

              <span>{quantity}</span>

              <button
                onClick={increaseQuantity}
                disabled={
                  !product.stock ||
                  quantity >= product.stock
                }
              >
                <FiPlus />
              </button>

            </div>

          </div>


          {/* BUTTONS */}

          <div className="productdetail-buttons">

            <button
              className="productdetail-cart-btn"
              onClick={handleAddToCart}
              disabled={!product.stock}
            >
              <FiShoppingCart />
              Add to Cart
            </button>

            <button
              className="productdetail-buy-btn"
              onClick={handleBuyNow}
              disabled={!product.stock}
            >
              <FiZap />
              Buy Now
            </button>

          </div>

        </div>
      </div>


      {/* EXTRA INFORMATION */}

      <div className="productdetail-extra">

        <div className="extra-box">

          <div className="extra-icon">
            <FiTruck />
          </div>

          <div>
            <h4>Fast Delivery</h4>
            <p>Get your product delivered quickly.</p>
          </div>

        </div>


        <div className="extra-box">

          <div className="extra-icon">
            <FiShield />
          </div>

          <div>
            <h4>Secure Payment</h4>
            <p>Your payment information is protected.</p>
          </div>

        </div>


        <div className="extra-box">

          <div className="extra-icon">
            <FiRefreshCw />
          </div>

          <div>
            <h4>Easy Returns</h4>
            <p>Simple and hassle-free return policy.</p>
          </div>

        </div>

      </div>


      {/* PRODUCT DETAILS */}

      <div className="productdetail-specification">

        <h2>Product Details</h2>

        <div className="specification-grid">

          <div className="specification-row">
            <span>Brand</span>
            <strong>{product.brand}</strong>
          </div>

          <div className="specification-row">
            <span>Category</span>
            <strong>{product.category}</strong>
          </div>

          <div className="specification-row">
            <span>Availability</span>
            <strong>
              {product.stock > 0
                ? "In Stock"
                : "Out of Stock"}
            </strong>
          </div>

          <div className="specification-row">
            <span>Product ID</span>
            <strong>{product._id}</strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Productdetail;