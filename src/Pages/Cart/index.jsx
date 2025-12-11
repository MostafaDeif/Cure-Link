import React, { useState } from "react";
import { addOrder } from "../../utils/orders";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";

// Leaflet
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component for picking location
function LocationPicker({ onSelect, position }) {
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "250px", width: "100%", borderRadius: "8px", marginBottom: 16 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler onSelect={onSelect} />
      <Marker position={position}></Marker>
    </MapContainer>
  );
}

function MapClickHandler({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearCart, getTotalItems, getTotalPrice } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState([30.0444, 31.2357]); // Default Cairo
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // States for modals
  const [confirmRemove, setConfirmRemove] = useState({ show: false, itemId: null, itemName: "" });
  const [confirmClear, setConfirmClear] = useState(false);

  const increase = (id, qty) => updateQuantity(id, qty + 1);
  const decrease = (id, qty) => updateQuantity(id, Math.max(1, qty - 1));

  // REMOVE modal
  const handleRemove = (id, name) => {
    setConfirmRemove({ show: true, itemId: id, itemName: name });
  };
  const confirmRemoveItem = () => {
    removeItem(confirmRemove.itemId);
    setConfirmRemove({ show: false, itemId: null, itemName: "" });
  };
  const cancelRemove = () => setConfirmRemove({ show: false, itemId: null, itemName: "" });

  // CLEAR modal
  const handleClear = () => setConfirmClear(true);
  const confirmClearCart = () => {
    clearCart();
    setConfirmClear(false);
  };
  const cancelClear = () => setConfirmClear(false);

  const onCheckout = () => {
    if (!items.length) return;
    setShowCheckout(true);
  };

  const confirmOrder = () => {
    if (!name || !phone || !address || !coords) {
      alert("Please fill in all required fields");
      return;
    }

    // create a local order record so it appears in User -> Orders
    try {
      addOrder({
        title: "صيدلية - طلبية أدوية",
        total: getTotalPrice(),
        nurse: "Pharmacy",
        address: address || "-",
        items: items.map((it) => `${it.name} x${it.qty}`),
      });
    } catch (err) {
      // ignore storage errors
    }

    clearCart();
    setShowCheckout(false);
    setAddress("");
    setCoords([30.0444, 31.2357]);
    setName("");
    setPhone("");

    alert("Order placed successfully!");
    try { navigate('/user'); } catch {}
  };

  return (
    <div className="cart-page" style={{ padding: 24, maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Back arrow */}
      <button
        onClick={() => navigate("/pharmacy")}
        aria-label="Back to Pharmacy"
        style={{
          border: "none",
          background: "transparent",
          fontSize: "1.2rem",
          cursor: "pointer",
          marginBottom: "12px",
          color: "#2b6cb0",
        }}
      >
        ← Back to Pharmacy
      </button>

      <h2>Your Cart ({getTotalItems()} items)</h2>

      {/* EMPTY CART */}
      {!items.length ? (
        <div className="cart-empty-wrapper" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          {/* CART LIST */}
          <div className="cart-list" style={{ marginTop: 16 }}>
            {items.map((it) => (
              <div key={it.id} className="cart-row" style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, padding: 8, border: "1px solid #ddd", borderRadius: 8 }}>
                <img src={it.imageUrl} alt={it.name} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{it.name}</div>
                  <div style={{ color: "#666" }}>{it.details}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button onClick={() => decrease(it.id, it.qty)}>−</button>
                  <div>{it.qty}</div>
                  <button onClick={() => increase(it.id, it.qty)}>+</button>
                </div>
                <div style={{ width: 110, textAlign: "right", fontWeight: 600 }}>
                  ${(it.qty * Number(it.price)).toFixed(2)}
                </div>
                <button onClick={() => handleRemove(it.id, it.name)} style={{ color: "red" }}>Remove</button>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="cart-summary" style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div>Total items: {getTotalItems()}</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Total: ${getTotalPrice().toFixed(2)}</div>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={handleClear} style={{ background: "#eee", padding: "8px 12px", borderRadius: 4 }}>Clear</button>
              <button onClick={onCheckout} style={{ background: "#2b6cb0", color: "#fff", padding: "10px 16px", borderRadius: 4 }}>Checkout</button>
            </div>
          </div>

          {/* CHECKOUT FORM */}
          {showCheckout && (
            <div style={{ marginTop: 32, padding: 16, border: "1px solid #ccc", borderRadius: 8, background: "#f9f9f9" }}>
              <h3>Checkout — Delivery Details</h3>
              <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 12, borderRadius: 4, border: "1px solid #ccc" }} />
              <input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 12, borderRadius: 4, border: "1px solid #ccc" }} />
              <input placeholder="Type your address..." value={address} onChange={(e) => setAddress(e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 12, borderRadius: 4, border: "1px solid #ccc" }} />
              <p>Select your delivery location:</p>
              <LocationPicker position={coords} onSelect={(point) => { setCoords(point); setAddress(`Lat: ${point[0].toFixed(4)}, Lng: ${point[1].toFixed(4)}`); }} />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
                <button onClick={() => setShowCheckout(false)} style={{ padding: "8px 12px" }}>Cancel</button>
                <button onClick={confirmOrder} style={{ padding: "8px 12px", background: "#2b6cb0", color: "#fff" }}>Confirm Order</button>
              </div>
            </div>
          )}
        </>
      )}

      {/* REMOVE CONFIRMATION MODAL */}
      {confirmRemove.show && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
          <div style={{ background: "#fff", padding: 24, borderRadius: 8, textAlign: "center", width: "90%", maxWidth: 400, boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }}>
            <p style={{ marginBottom: 16 }}>Are you sure you want to remove "{confirmRemove.itemName}" from the cart?</p>
            <div style={{ display: "flex", justifyContent: "space-around", gap: 12 }}>
              <button onClick={cancelRemove} style={{ padding: "8px 16px", borderRadius: 4, border: "1px solid #ccc" }}>Cancel</button>
              <button onClick={confirmRemoveItem} style={{ padding: "8px 16px", borderRadius: 4, background: "red", color: "#fff" }}>Remove</button>
            </div>
          </div>
        </div>
      )}

      {/* CLEAR CONFIRMATION MODAL */}
      {confirmClear && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
          <div style={{ background: "#fff", padding: 24, borderRadius: 8, textAlign: "center", width: "90%", maxWidth: 400, boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }}>
            <p style={{ marginBottom: 16 }}>Are you sure you want to clear your cart?</p>
            <div style={{ display: "flex", justifyContent: "space-around", gap: 12 }}>
              <button onClick={cancelClear} style={{ padding: "8px 16px", borderRadius: 4, border: "1px solid #ccc" }}>Cancel</button>
              <button onClick={confirmClearCart} style={{ padding: "8px 16px", borderRadius: 4, background: "red", color: "#fff" }}>Clear</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
