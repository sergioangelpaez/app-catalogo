import type { CartItem } from "@/types/cart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCartStore } from "@/stores/cartStore";

interface CartItemProps {
  item: CartItem;
}

const CartElement: React.FC<CartItemProps> = ({ item }) => {
  const remove = useCartStore((state) => state.removeFromCart);
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);

  return (
    <Card className="p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-4">
        <div className="h-20 w-20 rounded-md overflow-hidden bg-muted shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="object-cover h-full w-full"
          />
        </div>

        <div className="flex gap-1 flex-col overflow-hidden w-full">
          <p className="font-medium text-left truncate">{item.title}</p>
          <div className="flex items-center gap-5">
            <p className="text-sm text-muted-foreground">In Stock</p>
            <span className="text-muted-foreground"> | </span>

            <Button
              variant="ghost"
              size="sm"
              className="text-red-500"
              onClick={() => remove(item.id)}
            >
              <Trash2 size={14}>Remove</Trash2>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-6">
        <div className="flex items-center border rounded-lg">
          <button
            className="p-2 hover-bg-accent rounded-md"
            onClick={() => decrease(item.id)}
          >
            <Minus size={16} />
          </button>
          <span className="px-4">{item.quantity}</span>
          <button
            className="p-2 hover-bg-accent rounded-md"
            onClick={() => increase(item.id)}
          >
            <Plus size={16}></Plus>
          </button>
        </div>

        <div className="text-right">
          <p className="font-semibold">${item.price * item.quantity}</p>
          <p className="text-xs text-muted-foreground">${item.price} each</p>
        </div>
      </div>
    </Card>
  );
};

export default CartElement;
