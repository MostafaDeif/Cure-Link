import React, { useState, useRef, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import ".//pharmacy.css";

import medPanadol from "../../assets/med3.jpg";
import medBodrex from "../../assets/med3.jpg";
import medKonidin from "../../assets/med3.jpg";
import medParacetamol from "../../assets/med3.jpg";
import medOBH from "../../assets/med3.jpg";
import medBetadine from "../../assets/med3.jpg";
import medBodrexin from "../../assets/med3.jpg";
import medAntangin from "../../assets/med3.jpg";

const productsBase = [
  { id: 1, name: "Panadol", details: "20pcs", price: 15.99, category: "Painkiller", imageUrl: medPanadol },
  { id: 2, name: "Bodrex Herbal", details: "100ml", price: 7.99, category: "Cold & Flu", imageUrl: medBodrex },
  { id: 3, name: "Konidin", details: "3pcs", price: 5.99, category: "Cold & Flu", imageUrl: medKonidin },
  { id: 4, name: "Paracetamol", details: "50pcs", price: 12.5, category: "Painkiller", imageUrl: medParacetamol },
  { id: 5, name: "OBH Combi", details: "75ml", price: 9.99, oldPrice: 10.99, category: "Cough", imageUrl: medOBH },
  { id: 6, name: "Betadine", details: "50ml", price: 6.99, oldPrice: 8.99, category: "First Aid", imageUrl: medBetadine },
  { id: 7, name: "Bodrexin", details: "75ml", price: 7.99, oldPrice: 9.99, category: "Cold & Flu", imageUrl: medBodrexin },
  { id: 8, name: "Antangin JRG", details: "12pcs", price: 5.5, oldPrice: 6.5, category: "Herbal", imageUrl: medAntangin },
];

const ProductCard = ({ product }) => {
  const onError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/images/placeholder.png";
  };

  return (
    <article className="product-card" role="article" aria-label={product.name}>
      <img src={product.imageUrl} alt={product.name} loading="lazy" onError={onError} className="product-image" />
      <div className="product-body">
        <p className="product-name">{product.name}</p>
        <p className="product-details">{product.details}</p>
        <div className="product-footer">
          <div>
            <div className="price">${product.price.toFixed(2)}</div>
            {product.oldPrice && <div className="old-price">${product.oldPrice.toFixed(2)}</div>}
          </div>
          <button className="add-btn" aria-label={`Add ${product.name}`}><Plus size={16} /></button>
        </div>
      </div>
    </article>
  );
};

const SmoothSlider = ({ items, pause }) => {
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const speed = 0.28;
  const pos = useRef(0);
  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;
    let trackWidth = track.scrollWidth / 2;
    let lastTime = performance.now();
    let mounted = true;
    const loop = (t) => {
      if (!mounted) return;
      const delta = t - lastTime;
      lastTime = t;
      if (!pause) {
        pos.current += (speed * delta) / 16;
        if (pos.current >= trackWidth) pos.current = 0;
        track.style.transform = `translateX(-${pos.current}px)`;
      }
      requestAnimationFrame(loop);
    };
    const raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(() => {
      pos.current = 0;
      track.style.transform = `translateX(0px)`;
      trackWidth = track.scrollWidth / 2;
    });
    ro.observe(outer);
    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [pause, items.length]);
  return (
    <div className="marquee-outer" ref={outerRef}>
      <div className="marquee-track" ref={trackRef}>
        {items.map((it) => <ProductCard key={`a-${it.id}`} product={it} />)}
        {items.map((it) => <ProductCard key={`b-${it.id}`} product={it} />)}
      </div>
    </div>
  );
};

export default function PharmacyWebPage() {
  const [searchRaw, setSearchRaw] = useState("");
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [category, setCategory] = useState("All");
  const [showResultsModal, setShowResultsModal] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setSearchText(searchRaw.trim());
      setShowResultsModal(searchRaw.trim().length > 0);
    }, 300);
    return () => clearTimeout(id);
  }, [searchRaw]);

  const categories = ["All", ...Array.from(new Set(productsBase.map(p => p.category)))];

  const baseFiltered = productsBase.filter(p => (category === "All" ? true : p.category === category));

  const searchFiltered = (arr) => {
    if (!searchText) return arr;
    return arr.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()) || p.details.toLowerCase().includes(searchText.toLowerCase()));
  };

  const filteredPopular = searchFiltered(baseFiltered.filter(p => ["Painkiller", "Cold & Flu", "Herbal"].includes(p.category) || p.id <= 4));
  const filteredSale = searchFiltered(baseFiltered.filter(p => p.oldPrice));
  const displayedPopular = (activeFilter === "All" || activeFilter === "Popular") ? filteredPopular : [];
  const displayedSale = (activeFilter === "All" || activeFilter === "On Sale") ? filteredSale : [];
  const modalResults = searchText ? productsBase.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()) || p.details.toLowerCase().includes(searchText.toLowerCase())) : [];

  return (
    <div className="page-root">
      <div className="max-w-4xl mx-auto mt-10 mb-6">
        <div className="search-box" role="search">
          <Search className="icon" size={20} />
          <input
            className="search-input"
            placeholder="Search drugs, category..."
            value={searchRaw}
            onChange={(e) => setSearchRaw(e.target.value)}
            onFocus={() => setShowResultsModal(searchRaw.trim().length > 0)}
          />
        </div>
      </div>

      <div className="prescription-banner">
        <h2>Order Quickly with Prescription</h2>
        <p>Upload your prescription and get your medicine delivered fast and safely.</p>
        <button>Upload Prescription</button>
      </div>

      <div className="filters">
        <button className={`filter-btn ${activeFilter==="All"?"active":""}`} onClick={()=>setActiveFilter("All")}>All</button>
        <button className={`filter-btn ${activeFilter==="Popular"?"active":""}`} onClick={()=>setActiveFilter("Popular")}>Popular</button>
        <button className={`filter-btn ${activeFilter==="On Sale"?"active":""}`} onClick={()=>setActiveFilter("On Sale")}>On Sale</button>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="split-controls" style={{display:"flex",gap:16,justifyContent:"center",alignItems:"center",marginBottom:16}}>
          <div className="center-text">
            <label style={{marginRight:8}}>Category</label>
            <select value={category} onChange={(e)=>setCategory(e.target.value)} className="filter-select">
              {categories.map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {displayedPopular.length > 0 && (
        <section className="max-w-7xl mx-auto mb-12">
          <h2 className="section-title">Popular Products</h2>
          <div>
            <SmoothSlider items={displayedPopular} pause={!!searchText || showResultsModal} />
          </div>
        </section>
      )}

      <div className="section-divider"></div>

      {displayedSale.length > 0 && (
        <section className="max-w-7xl mx-auto mb-24">
          <h2 className="section-title">Products on Sale</h2>
          <SmoothSlider items={displayedSale} pause={!!searchText || showResultsModal} />
        </section>
      )}

      {showResultsModal && (
        <div className="results-modal" role="dialog" aria-modal="true" onClick={()=>{ setShowResultsModal(false); setSearchRaw(""); setSearchText(""); }}>
          <div className="results-card" onClick={(e)=>e.stopPropagation()}>
            <div className="results-header">
              <h3>Search results for “{searchText}”</h3>
              <button className="close-btn" onClick={()=>{ setShowResultsModal(false); setSearchRaw(""); setSearchText(""); }}>Close</button>
            </div>
            <div className="results-grid">
              {modalResults.length === 0 ? (
                <div className="center-text">No results</div>
              ) : modalResults.map(p => <ProductCard key={`res-${p.id}`} product={p} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
