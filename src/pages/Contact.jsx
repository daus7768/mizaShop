import React from "react";

export default function Contact() {
  return (
    <div className="p-4 bg-yellow-50 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-pink-600">Contact Us</h2>
      <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow space-y-4">
        <input
          className="w-full p-3 border rounded"
          placeholder="Name"
          required
        />
        <input
          type="email"
          className="w-full p-3 border rounded"
          placeholder="Email"
          required
        />
        <textarea
          className="w-full p-3 border rounded"
          rows="4"
          placeholder="Your message"
          required
        />
        <button className="w-full px-4 py-3 bg-pink-600 text-white rounded">
          Send Message
        </button>
      </form>
    </div>
  );
}
