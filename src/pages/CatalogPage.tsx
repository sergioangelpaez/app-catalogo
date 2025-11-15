import CatalogFilters from "../components/catalog/CatalogFilters";
import ProductList from "@/components/catalog/ProductList";
import PaginationFooter from "@/components/catalog/Pagination";
import { useProductStore } from "@/stores/productStore";
import { useEffect } from "react";

export default function CatalogPage() {
  const { products, fetchProducts, loading, page } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="space-y-6">
      <CatalogFilters />
      {loading ? <p>Loading...</p> : <ProductList products={products} />}
      <PaginationFooter />
    </div>
  );
}
