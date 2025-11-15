import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export default function Header() {
  const cartCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
        <Link to="/" className="text-2xl font-bold">
          ShopCatalog
        </Link>

        <Link to="/cart" className="ml-auto relative">
          <ShoppingCart size={28} />
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-primary text-primary-foreground text-xs flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        </Link>
      </div>
    </header>
  );
}
