import React, { useState } from "react";
import "./ProductInfo.css";

export default function ProductInfo() {
  const images = [
    "/src/assets/med3.jpg",
    "/src/assets/med4.jpg",
    "/src/assets/med2.jpg",
  ];

  const [qty, setQty] = useState(1);
  const [isFav, setIsFav] = useState(false);
  const [mainImg, setMainImg] = useState(images[0]);

  const increase = () => setQty((prev) => prev + 1);
  const decrease = () => setQty((prev) => Math.max(1, prev - 1));
  const toggleFav = () => setIsFav((prev) => !prev);

  return (
    <div className="pi-wrapper">
      <div className="pi-card">
        <div className="pi-left">
          <div className="pi-main-img">
            <img src={mainImg} alt="medicine" />
          </div>

          <div className="pi-thumbs">
            {images.map((img, index) => (
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

        <div className="pi-right">
          <div className="pi-header">
            <h4 className="category">Pharmacy</h4>
            <button
              className={`fav ${isFav ? "active" : ""}`}
              onClick={toggleFav}
            >
              {isFav ? "♥" : "♡"}
            </button>
          </div>

          <h1 className="title">FluRelief</h1>
          <p className="size">75 ml</p>

          <div className="rating">
            <div className="stars">★★★★☆</div>
            <div className="rating-number">4.0</div>
          </div>

          <div className="price-row">
            <div className="price">
              <span className="current">$9.99</span>
              <span className="old">$12.00</span>
              <span className="discount">20% off</span>
            </div>

            <div className="qty-control">
              <button onClick={decrease} className="qty-btn">
                −
              </button>
              <div className="qty-num">{qty}</div>
              <button onClick={increase} className="qty-btn">
                +
              </button>
            </div>
          </div>

          <div className="description">
            <h3>Description</h3>
            <p>
              FluRelief is a cough medicine containing Paracetamol, Ephedrine
              HCl, and Chlorphenamine maleate used to relieve coughs accompanied
              by flu symptoms such as fever, headache, and sneezing.
            </p>
          </div>

          <div className="cta-row">
            <button className="cart-btn">🛒</button>
            <button className="buy-btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
