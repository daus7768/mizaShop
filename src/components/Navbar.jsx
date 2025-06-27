import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navItems = [
    { name: "Home", to: "/" },
    { name: "Products", to: "/products" },
    { name: "Cart", to: "/cart" },
    { name: "Checkout", to: "/checkout" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center text-pink-600 font-bold text-xl">
            <Link to="/">SchoolShop</Link>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "text-white bg-pink-600"
                      : "text-gray-700 hover:text-pink-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-700 hover:text-pink-600 focus:outline-none"
            >
              <ion-icon name={open ? "close" : "menu"} size="large"></ion-icon>
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white shadow">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? "text-white bg-pink-600"
                    : "text-gray-700 hover:text-pink-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
