import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="max-w-7xl mx-auto py-4 flex flex-col flex-1 gap-6 h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-full grid-rows-1">
        {products.map((p) => (
          <ProductCard key={p.id} product={p}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
