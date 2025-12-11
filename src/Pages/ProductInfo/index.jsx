import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productsBase } from "../../Data/products";
import { useCart } from "../../Context/CartContext";
import "./ProductInfo.css";

export default function ProductInfo() {
  const imagesFallback = [
    "/src/assets/med3.jpg",
    "/src/assets/med4.jpg",
    "/src/assets/med2.jpg",
  ];

  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);
  const product = productsBase.find((p) => p.id === productId);

  const [qty, setQty] = useState(1);
  const [isFav, setIsFav] = useState(false);
  const [mainImg, setMainImg] = useState(
    product ? product.imageUrl || imagesFallback[0] : imagesFallback[0]
  );

  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="pi-not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const increase = () => setQty((prev) => prev + 1);
  const decrease = () => setQty((prev) => Math.max(1, prev - 1));
  const toggleFav = () => setIsFav((prev) => !prev);

  const onAddToCart = () => {
    addItem(product, qty);
    navigate("/cart");
  };

  return (
    <div className="pi-wrapper">
      {/*  زر الرجوع */}
      <button className="pi-back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="pi-card">
        {/* LEFT SIDE */}
        <div className="pi-left">
          <div className="pi-main-img">
            <img src={mainImg} alt={product.name} />
          </div>

          <div className="pi-thumbs">
            {(product.images || imagesFallback).map((img, index) => (
              <button
                key={index}
                className={`thumb ${mainImg === img ? "active" : ""}`}
                onClick={() => setMainImg(img)}
              >
                <img src={img} alt={`thumb-${index}`} />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="pi-right">
          <div className="pi-header">
            <h4 className="category">{product.category}</h4>
            <button className={`fav ${isFav ? "active" : ""}`} onClick={toggleFav}>
              {isFav ? "♥" : "♡"}
            </button>
          </div>

          <h1 className="title">{product.name}</h1>
          <p className="size">{product.details}</p>

          <div className="rating">
            <div className="stars">★★★★☆</div>
            <div className="rating-number">4.0</div>
          </div>

          <div className="price-row">
            <div className="price">
              <span className="current">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <>
                  <span className="old">${product.oldPrice.toFixed(2)}</span>
                  <span className="discount">
                    {Math.round((1 - product.price / product.oldPrice) * 100)}% off
                  </span>
                </>
              )}
            </div>

            <div className="qty-control">
              <button onClick={decrease} className="qty-btn">−</button>
              <div className="qty-num">{qty}</div>
              <button onClick={increase} className="qty-btn">+</button>
            </div>
          </div>

          <div className="description">
            <h3>Description</h3>
            <p>
              {product.description ||
                `Details: ${product.details}. Price: $${product.price}`}
            </p>
          </div>

          <div className="cta-row">
            <button className="cart-btn" onClick={onAddToCart}>🛒 Add to cart</button>
            <button
              className="buy-btn"
              onClick={() => {
                addItem(product, qty);
                navigate("/cart");
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
