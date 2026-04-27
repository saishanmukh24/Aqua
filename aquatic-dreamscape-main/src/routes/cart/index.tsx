import { createFileRoute } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/currency";

export const Route = createFileRoute("/cart/")({
  component: CartPage,
});

function CartPage() {
  const items = useCart((s) => s.items);
  const increase = useCart((s) => s.increase);
  const decrease = useCart((s) => s.decrease);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleWhatsAppOrder() {
    const phone = "91"; // 👉 Whatsapp No.

    let message = "🐠 *Souls of Healing Order* 🐠\n\n";

    items.forEach((item) => {
      message += `- ${item.name} x${item.quantity} = ₹${item.price * item.quantity}\n`;
    });

    message += `\nTotal: ₹${total}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {/* ITEMS */}
          {items.map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <p className="font-semibold">{item.name}</p>

                {/* QUANTITY CONTROLS */}
                <div className="flex gap-3 mt-2 items-center">
                  <button
                    onClick={() => decrease(item.name)}
                    className="px-2 py-1 bg-muted rounded"
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increase(item.name)}
                    className="px-2 py-1 bg-muted rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* PRICE */}
              <div className="font-semibold">
                {formatINR(item.price * item.quantity)}
              </div>
            </div>
          ))}

          {/* TOTAL */}
          <h2 className="mt-6 text-xl font-bold">
            Total: {formatINR(total)}
          </h2>

          {/* WHATSAPP BUTTON */}
          <button
            onClick={handleWhatsAppOrder}
            className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold"
          >
            Order All on WhatsApp
          </button>
        </>
      )}
    </div>
  );
}