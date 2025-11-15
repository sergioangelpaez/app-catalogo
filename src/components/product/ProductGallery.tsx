import { useState } from "react";
import type { Product } from "@/types/product";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  product: Product;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const images = [product.image, product.image, product.image, product.image];
  const [selected, setSelected] = useState<number>(0);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl h-100">
        <AspectRatio ratio={4 / 3} className="h-100">
          <img
            src={images[selected]}
            alt={product.title}
            className="object-cover h-full w-full"
          />
        </AspectRatio>
      </div>

      <div className="flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={cn(
              "h-20 w-20 rounded-md overflow-hidden border transition-all",
              selected === i
                ? "ring-2 ring-primary border-primary"
                : "border-muted"
            )}
          >
            <img src={img} alt="" className="object-cover h-full w-full" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
