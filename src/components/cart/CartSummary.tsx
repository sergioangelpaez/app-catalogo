import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { useCartStore } from "@/stores/cartStore";
import { Link } from "react-router";
import { LockIcon } from "lucide-react";

const CartSummary: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    <Card className="p-6 space-y-4 h-fit">
      <h2 className="text-xl font-semibold text-left">Order Summary</h2>

      <div className="text-sm space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Link to={"/"}>
          <Button variant="outline" className="w-full py-2">
            Continue Shopping
          </Button>
        </Link>
        <Button className="py-2">
          <LockIcon />
          Proceed to Checkout
        </Button>
      </div>
    </Card>
  );
};

export default CartSummary;
