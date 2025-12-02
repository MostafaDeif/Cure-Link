import { productsBase } from "../../data/products";

export default function FavoritesSection({ ProductCardUser }) {
  const favorites = productsBase.filter((p) => p.isFav);

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
              onAdd={() => {}}
              onOpen={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}
