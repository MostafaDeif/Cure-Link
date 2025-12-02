import { useState } from "react";
import { productsBase } from "../../data/products";
import { useCart } from "../../../Context/CartContext";
import { useNavigate } from "react-router-dom";

// نفس الـ Notification البسيطة
const Notification = ({ message, show }) => {
  return (
    <div
      className={`notification ${show ? "show" : ""}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
};

export default function FavoritesSection({ ProductCardUser }) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const favorites = productsBase.filter((p) => p.isFav);

  // ====== Notification State ======
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });
  const [notifTimeout, setNotifTimeout] = useState(null);

  // ====== Show Notification ======
  const showNotification = (msg, ms = 1800) => {
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

  // ====== Add to Cart Action ======
  const handleAdd = (product) => {
    addItem(product, 1);
    showNotification(`${product.name} تمت إضافته إلى السلة`);
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">المفضلة</h3>

      {favorites.length === 0 ? (
        <div className="text-gray-500 text-center py-6">
          لا توجد منتجات في المفضلة حالياً.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((product) => (
            <ProductCardUser
              key={product.id}
              product={product}
              onAdd={() => handleAdd(product)}
              onOpen={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      )}

      {/* Notification at bottom */}
      <Notification
        message={notification.message}
        show={notification.show}
      />
    </div>
  );
}
