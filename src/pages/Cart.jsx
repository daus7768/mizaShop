import React from "react";

export default function Cart() {
  // Demo items
  const items = [
    { id: 1, name: "Comic Book", price: 9.99, qty: 1 },
    { id: 2, name: "Stationery Set", price: 4.5, qty: 2 },
  ];
  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-4 bg-blue-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between bg-white p-3 rounded shadow"
          >
            <span>{item.name}</span>
            <span>
              {item.qty} × ${item.price.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <div className="text-right mt-4 font-semibold text-lg">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}
