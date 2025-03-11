import React from "react";
import { ShoppingCart, Search, User } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 mt-20">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">ShopEase</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border rounded-lg"
            />
            <Search className="absolute left-3 top-2 text-gray-500" size={20} />
          </div>
          <button variant="outline">
            <User className="mr-2" /> Login
          </button>
          <button variant="outline">
            <ShoppingCart className="mr-2" /> Cart
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-blue-500 text-white text-center py-16 px-4">
        <h2 className="text-4xl font-bold">Discover Amazing Deals</h2>
        <p className="mt-2 text-lg">Shop the latest trends at unbeatable prices.</p>
        <button className="mt-4 bg-white text-blue-600 px-6 py-3 font-semibold rounded-lg">
          Shop Now
        </button>
      </header>

      {/* Featured Products */}
      <section className="p-2">
        <h3 className="text-2xl font-semibold text-gray-800">Featured Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white p-4 rounded-lg shadow-md">
              <div className="h-56 bg-gray-300 rounded-lg"></div>
              <h4 className="mt-2 text-lg font-semibold">Product {item}</h4>
              <p className="text-gray-600">$99.99</p>
              <button className="mt-2 w-full">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-10">
        <p>&copy; 2025 ShopEase. All rights reserved.</p>
      </footer>
    </div>
  );
}