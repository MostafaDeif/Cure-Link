import { Plus } from "lucide-react";

export default function ProductCardUser({
  product,
  onAdd = () => {},
  onOpen = () => {},
}) {
  const onError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/images/placeholder.png";
  };

  const priceText =
    typeof product.price === "number"
      ? `$${product.price.toFixed(2)}`
      : "";

  const oldPriceText =
    typeof product.oldPrice === "number"
      ? `$${product.oldPrice.toFixed(2)}`
      : null;

  return (
    <article
      className="product-card"
      role="article"
      aria-label={product.name}
    >
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
          {oldPriceText && (
            <div className="old-price" aria-hidden="true">
              {oldPriceText}
            </div>
          )}
        </div>

        <button
          className="add-btn"
          aria-label={`Add ${product.name} to cart`}
          onClick={() => onAdd(product)}
          type="button"
        >
          <Plus size={16} />
        </button>
      </div>
    </article>
  );
}
