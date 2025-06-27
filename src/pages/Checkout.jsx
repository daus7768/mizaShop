import React from "react";
export default function Checkout() {
  return (
    <div className="p-4 bg-green-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form className="space-y-4">
        <input className="w-full p-2 border" placeholder="Name" />
        <input className="w-full p-2 border" placeholder="Phone Number" />
        <input className="w-full p-2 border" placeholder="Address" />
        <textarea className="w-full p-2 border" placeholder="Remarks"></textarea>
        <button className="px-4 py-2 bg-pink-500 text-white rounded">Submit Order</button>
      </form>
    </div>
  );
}
