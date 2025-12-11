import React, { useState, useEffect, useMemo } from "react";
import { Search, Plus } from "lucide-react";
import "./pharmacy.css";
// Slider removed as requested
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { productsBase } from "../../Data/products";

/* Notification component (simple toast) */
const Notification = ({ message, show }) => {
  return (
    <div className={`notification ${show ? "show" : ""}`} role="status" aria-live="polite">
      {message}
    </div>
  );
};

const ProductCard = ({ product, onAdd, onOpen }) => {
  const onError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/images/placeholder.png";
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    onAdd(product);
  };

  const priceText = typeof product.price === "number" ? `$${product.price.toFixed(2)}` : "";
  const oldPriceText = typeof product.oldPrice === "number" ? `$${product.oldPrice.toFixed(2)}` : null;

  return (
    <article className="product-card" role="article" aria-label={product.name}>
      <button
        className="card-click-area"
        onClick={() => onOpen(product)}
        aria-label={`View ${product.name} details`}
        type="button"
      >
        <img
          src={product.imageUrl || "/images/placeholder.png"}
          alt={product.name || "Product image"}
          loading="lazy"
          onError={onError}
          className="product-image"
        />
      </button>

      <div className="product-body">
        <p className="product-name">{product.name}</p>
        <p className="product-details">{product.details}</p>
      </div>

      <div className="product-footer">
        <div className="price-group">
          <div className="price">{priceText}</div>
          {oldPriceText && <div className="old-price" aria-hidden="true">{oldPriceText}</div>}
        </div>
        <button
          className="add-btn"
          aria-label={`Add ${product.name} to cart`}
          onClick={handleAddClick}
          type="button"
        >
          <Plus size={16} />
        </button>
      </div>
    </article>
  );
};

export default function PharmacyWebPage() {
  const [searchRaw, setSearchRaw] = useState("");
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [category, setCategory] = useState("All");

  // notification state
  const [notification, setNotification] = useState({ show: false, message: "" });
  // keep timeout id to clear if needed
  const [notifTimeout, setNotifTimeout] = useState(null);

  const navigate = useNavigate();
  const { addItem } = useCart();

  // Debounced search logic
  useEffect(() => {
    const id = setTimeout(() => {
      const trimmed = searchRaw.trim();
      setSearchText(trimmed);
    }, 300);
    return () => clearTimeout(id);
  }, [searchRaw]);

  // show toast helper
  const showNotification = (msg, ms = 1800) => {
    // clear previous timeout if any
    if (notifTimeout) {
      clearTimeout(notifTimeout);
      setNotifTimeout(null);
    }
    setNotification({ show: true, message: msg });
    const t = setTimeout(() => {
      setNotification({ show: false, message: "" });
      setNotifTimeout(null);
    }, ms);
    setNotifTimeout(t);
  };

  // Data logic
  const categories = useMemo(() => ["All", ...Array.from(new Set(productsBase.map(p => p.category)))], []);
  const baseFiltered = useMemo(() => productsBase.filter(p => (category === "All" ? true : p.category === category)), [category]);

  const searchFiltered = (arr) => {
    if (!searchText) return arr;
    const lower = searchText.toLowerCase();
    return arr.filter(p => (p.name || "").toLowerCase().includes(lower) || (p.details || "").toLowerCase().includes(lower));
  };

  // Popular & Sale lists (still available when not searching)
  const filteredPopular = searchFiltered(baseFiltered.filter(p => ["Painkiller", "Cold & Flu", "Herbal"].includes(p.category) || (typeof p.id === "number" && p.id <= 4)));
  const filteredSale = searchFiltered(baseFiltered.filter(p => p.oldPrice));

  // When searching, show results across all products but respect category selection
  const searchResults = searchText ? baseFiltered.filter(p => (p.name || "").toLowerCase().includes(searchText.toLowerCase()) || (p.details || "").toLowerCase().includes(searchText.toLowerCase())) : [];

  const goToProduct = (product) => navigate(`/product/${product.id}`);
  const handleAddToCart = (product) => {
    addItem(product, 1);
    // show notification
    showNotification(`${product.name} added to cart`);
  };

  const handleUploadPrescription = () => {
    // simulate upload: create a local order so it appears in User Orders
    import("../../utils/orders").then((m) => {
      try {
        m.addOrder({
          title: "Prescription Upload",
          total: 0,
          nurse: "-",
          address: "Uploaded prescription",
          items: ["Prescription uploaded via website"],
        });
      } catch {}
    }).catch(() => {});
    showNotification("Prescription uploaded — يمكنك مشاهدة الطلب في طلباتي");
    try { navigate('/user'); } catch {}
  };

  return (
    <div className="page-root">
      {/* Search Bar Section */}
      <div className="search-bar-container">
        <div className="search-box" role="search">
          <Search className="icon" size={20} />
          <input
            className="search-input"
            placeholder="Search drugs, category..."
            value={searchRaw}
            onChange={(e) => setSearchRaw(e.target.value)}
            aria-label="Search products"
          />
        </div>
      </div>

      {/* Prescription Banner */}
      <div className="prescription-banner">
        <div className="banner-content">
          <h2>Order Quickly with Prescription</h2>
          <p>Upload your prescription and get your medicine delivered fast and safely.</p>
          <button className="banner-upload-btn" type="button" onClick={handleUploadPrescription}>Upload Prescription</button>
        </div>
      </div>

      {/* Main Filters */}
      <div className="filters-container">
        <div className="filters">
          <button className={`filter-btn ${activeFilter === "All" ? "active" : ""}`} onClick={() => setActiveFilter("All")} type="button">All</button>
          <button className={`filter-btn ${activeFilter === "Popular" ? "active" : ""}`} onClick={() => setActiveFilter("Popular")} type="button">Popular</button>
          <button className={`filter-btn ${activeFilter === "On Sale" ? "active" : ""}`} onClick={() => setActiveFilter("On Sale")} type="button">On Sale</button>
        </div>
      </div>

      {/* Category Filter Dropdown */}
      <div className="category-control-container">
        <div className="category-control">
          <label className="category-label" htmlFor="category-select">Category</label>
          <select id="category-select" value={category} onChange={(e) => setCategory(e.target.value)} className="filter-select" aria-label="Select category">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* If searching -> show search results grid */}
      {searchText ? (
        <section className="product-section">
          <h2 className="section-title">Search results for “{searchText}”</h2>
          <div className="results-grid">
            {searchResults.length === 0 ? (
              <div className="empty-state">No results found for "{searchText}"</div>
            ) : (
              searchResults.map(p => <ProductCard key={`sr-${p.id}`} product={p} onAdd={handleAddToCart} onOpen={goToProduct} />)
            )}
          </div>
        </section>
      ) : (
        <>
          {/* Popular Products Grid */}
          {filteredPopular.length > 0 && (activeFilter === "All" || activeFilter === "Popular") && (
            <section className="product-section">
              <h2 className="section-title">Popular Products</h2>
              <div className="results-grid">
                {filteredPopular.map(product => (
                  <div key={product.id} className="slide-item">
                    <ProductCard product={product} onAdd={handleAddToCart} onOpen={goToProduct} />
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="section-divider" />

          {/* Products on Sale Grid */}
          {filteredSale.length > 0 && (activeFilter === "All" || activeFilter === "On Sale") && (
            <section className="product-section is-last">
              <h2 className="section-title">Products on Sale</h2>
              <div className="results-grid">
                {filteredSale.map(product => (
                  <div key={product.id} className="slide-item">
                    <ProductCard product={product} onAdd={handleAddToCart} onOpen={goToProduct} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* Notification */}
      <Notification message={notification.message} show={notification.show} />
    </div>
  );
}
