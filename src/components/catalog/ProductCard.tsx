import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { Product } from "@/types/product";
import { useCartStore } from "@/stores/cartStore";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="rounded-2xl h-full hover:shadow-md transition-shadow bg-white">
      <Link to={`/product/${product.id}`}>
        <div className="h-80 w-full rounded-t-2xl overflow-hidden p-0 bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="text-left p-3 flex flex-col gap-5">
          <div className="mb-5 h-16">
            <h1 className="font-bold text-lg line-clamp-1">{product.title}</h1>
            <p className="text-secondary-foreground text-sm line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="font-bold text-2xl">${product.price}</p>
            <Button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product, 1);
              }}
            >
              + Add
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
