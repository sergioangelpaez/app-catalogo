import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Star } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const filledStars = Math.floor(product.rating.rate);
  const halfStar = product.rating.rate % 1 >= 0.5;
  const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

  return (
    <div className="space-y-6 text-left">
      <Badge variant="outline" className="text-sm">
        {product.category}
      </Badge>

      <h1 className="text-3xl font-semibold leading-tight">{product.title}</h1>

      <p className="text-4xl font-bold">${product.price}</p>

      <div className="flex items-center gap-2">
        {Array.from({ length: filledStars }).map((_, i) => (
          <Star
            key={`filled-${i}`}
            className="w-5 h-5 fill-yellow-400 text-yellow-400"
          ></Star>
        ))}

        {halfStar && (
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 opacity-50"></Star>
        )}

        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300"></Star>
        ))}

        <span>{product.rating.rate}</span>

        <span className="text-sm text-secondary-foreground">
          ({product.rating.count} reviews)
        </span>
      </div>

      <Separator />

      <p className="text-secondary-foreground">{product.description}</p>

      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-lg border px-2">
          <button
            className="p-2 hover-bg-accent rounded-md"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus size={16} />
          </button>
          <span className="px-4">{quantity}</span>
          <button
            className="p-2 hover-bg-accent rounded-md"
            onClick={() => setQuantity(Math.max(quantity + 1))}
          >
            <Plus size={16}></Plus>
          </button>
        </div>
        <Button
          size="lg"
          className="px-6"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product, quantity);
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
