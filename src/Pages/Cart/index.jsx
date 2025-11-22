import React, { useState } from "react";
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
  const { items, updateQuantity, removeItem, clearCart, getTotalItems, getTotalPrice } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState([30.0444, 31.2357]); // Default Cairo

  const increase = (id, qty) => updateQuantity(id, qty + 1);
  const decrease = (id, qty) => updateQuantity(id, Math.max(1, qty - 1));

  const onCheckout = () => {
    if (!items.length) return;
    setShowCheckout(true);
  };

  const confirmOrder = () => {
    if (!address || !coords) {
      alert("Please choose your delivery location");
      return;
    }

    clearCart();
    setShowCheckout(false);
    setAddress("");
    setCoords([30.0444, 31.2357]);

    alert("Order placed successfully!");
  };

  return (
    <div className="cart-page" style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h2>Your Cart ({getTotalItems()} items)</h2>

      {/* EMPTY CART */}
      {!items.length ? (
        <p style={{ marginTop: 24 }}>Your cart is empty.</p>
      ) : (
        <>
          {/* CART LIST */}
          <div className="cart-list" style={{ marginTop: 16 }}>
            {items.map((it) => (
              <div
                key={it.id}
                className="cart-row"
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  marginBottom: 12,
                  padding: 8,
                  border: "1px solid #ddd",
                  borderRadius: 8,
                }}
              >
                <img
                  src={it.imageUrl}
                  alt={it.name}
                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
                />

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

                <button onClick={() => removeItem(it.id)} style={{ color: "red" }}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div
            className="cart-summary"
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <div>Total items: {getTotalItems()}</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>
                Total: ${getTotalPrice().toFixed(2)}
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => clearCart()}
                style={{ background: "#eee", padding: "8px 12px", borderRadius: 4 }}
              >
                Clear
              </button>
              <button
                onClick={onCheckout}
                style={{
                  background: "#2b6cb0",
                  color: "#fff",
                  padding: "10px 16px",
                  borderRadius: 4,
                }}
              >
                Checkout
              </button>
            </div>
          </div>

          {/* CHECKOUT FORM */}
          {showCheckout && (
            <div
              style={{
                marginTop: 32,
                padding: 16,
                border: "1px solid #ccc",
                borderRadius: 8,
                background: "#f9f9f9",
              }}
            >
              <h3>Checkout — Delivery Details</h3>

              <input
                placeholder="Type your address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{
                  width: "100%",
                  padding: 8,
                  marginBottom: 12,
                  borderRadius: 4,
                  border: "1px solid #ccc",
                }}
              />

              <p>Select your delivery location:</p>
              <LocationPicker
                position={coords}
                onSelect={(point) => {
                  setCoords(point);
                  setAddress(`Lat: ${point[0].toFixed(4)}, Lng: ${point[1].toFixed(4)}`);
                }}
              />

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
                <button
                  onClick={() => setShowCheckout(false)}
                  style={{ padding: "8px 12px" }}
                >
                  Cancel
                </button>

                <button
                  onClick={confirmOrder}
                  style={{ padding: "8px 12px", background: "#2b6cb0", color: "#fff" }}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
