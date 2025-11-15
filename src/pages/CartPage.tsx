import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import CartElement from "@/components/cart/CartElement";
import CartSummary from "@/components/cart/CartSummary";

export default function CartPage() {
  const items = useCartStore((status) => status.items);
  const cartCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <div className="max-w-7xl mx-auto py-4 flex flex-col flex-1 h-full">
      <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-5">
        <Link
          to={"/"}
          className="flex gap-3 text-secondary-foreground hover:underline items-center"
        >
          <ChevronLeft />
          <span>Continue Shopping</span>
        </Link>
        <div className="bg-white rounded-xl flex flex-col p-5 gap-5">
          <div className="flex justify-between w-full items-center">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <span className="text-secondary-foreground">{cartCount} items</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="md:col-span-2 space-y-4">
              {items.length === 0 ? (
                <p className="text-center text-secondary-foreground py-10">
                  Your cart is empty.
                </p>
              ) : (
                items.map((item) => <CartElement key={item.id} item={item} />)
              )}
            </div>
          </div>

          {items.length > 0 && <CartSummary />}
        </div>
      </div>
    </div>
  );
}
