import { useParams } from "react-router-dom";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import { useEffect, useState } from "react";
import { useProductStore } from "@/stores/productStore";
import type { Product } from "@/types/product";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const fetchProductById = useProductStore((state) => state.fetchProductById);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;

    const numericId = Number(id);

    fetchProductById(numericId).then((data) => {
      setProduct(data ?? null);
    });
  }, [id, fetchProductById]);

  if (loading) {
    return <p className="text-center">Loading product...</p>;
  }

  if (error) {
    return <p className="text-center text-destructive">{error}</p>;
  }

  if (!product) {
    return <p className="text-center">Product not found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto py-4 flex flex-col flex-1 gap-6 h-full">
      <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-10">
        <Link
          to={"/"}
          className="flex gap-3 text-secondary-foreground hover:underline items-center"
        >
          <ChevronLeft />
          <span>Back to Products</span>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-[0.5fr_1fr] gap-10">
          <ProductGallery product={product}></ProductGallery>
          <ProductInfo product={product}></ProductInfo>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
