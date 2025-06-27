import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Upload, Phone, MessageCircle, Star, X, Plus, Minus, Download, Menu } from 'lucide-react';

/*
  NOTE: This file contains the big single-page e-commerce experience that was previously
  (incorrectly) pasted into index.html.  It has been transplanted here unchanged, apart
  from minor formatting tweaks, so index.html can return to being plain HTML.
*/

const EcommerceWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [products, setProducts] = useState([
    {
      id: 1,
      title: 'Premium Wireless Headphones',
      description: 'High-quality sound with noise cancellation',
      price: 299.99,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      category: 'electronics',
    },
    {
      id: 2,
      title: 'JavaScript: The Definitive Guide',
      description: 'Complete guide to modern JavaScript programming',
      price: 45.99,
      image:
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
      category: 'books',
    },
    {
      id: 3,
      title: 'Smart Fitness Watch',
      description: 'Track your health and fitness goals',
      price: 199.99,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      category: 'electronics',
    },
    {
      id: 4,
      title: 'React Cookbook',
      description: 'Practical recipes for React development',
      price: 39.99,
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      category: 'books',
    },
  ]);

  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: 'electronics',
  });

  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    address: '',
    remarks: '',
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQuantity = Math.max(0, item.quantity + change);
            return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleProductUpload = (e) => {
    e.preventDefault();
    if (newProduct.title && newProduct.description && newProduct.price) {
      const product = {
        ...newProduct,
        id: Date.now(),
        price: parseFloat(newProduct.price),
        image:
          newProduct.image ||
          'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      };
      setProducts((prev) => [...prev, product]);
      setNewProduct({
        title: '',
        description: '',
        price: '',
        image: '',
        category: 'electronics',
      });
      setShowUploadForm(false);
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    // Build WhatsApp order message
    const orderLines = cart
      .map(
        (item) => `${item.title} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
      )
      .join('\n');
    const message = `Hello, I would like to place an order:%0A%0A${orderLines}%0A%0ATotal: $${getTotalPrice()}%0A%0AName: ${checkoutForm.name}%0APhone: ${checkoutForm.phone}%0AAddress: ${checkoutForm.address}%0ARemarks: ${checkoutForm.remarks || '-'}`;

    // Open WhatsApp chat in new tab/window
    window.open(`https://wa.me/60194341203?text=${message}`, '_blank');

    // Show success state locally
    setOrderSubmitted(true);
    setTimeout(() => {
      setOrderSubmitted(false);
      setCart([]);
      setCheckoutForm({ name: '', phone: '', address: '', remarks: '' });
      setCurrentPage('home');
    }, 3000);
  };

  const generateInvoice = () => {
    const invoiceContent = `INVOICE\n=======\nCustomer: ${checkoutForm.name}\nPhone: ${checkoutForm.phone}\nAddress: ${checkoutForm.address}\n\nItems:\n${cart
      .map(
        (item) => `${item.title} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
      )
      .join('\n')}\n\nTotal: $${getTotalPrice()}\nRemarks: ${checkoutForm.remarks}`.trim();

    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoice.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // ---- page components ----
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-schoolYellow via-schoolBlue to-schoolGreen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6 animate-bounce">
            🛍️ Welcome to MizaShop!
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Discover amazing products and books at unbeatable prices!
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setCurrentPage('products')}
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-purple-100 transform hover:scale-105 transition-all shadow-lg"
            >
              Shop Now 🚀
            </button>
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-yellow-400 text-purple-800 px-8 py-3 rounded-full font-semibold text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all shadow-lg"
            >
              Sell Products 💰
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 text-center text-white">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-2">Latest Electronics</h3>
            <p>Cutting-edge gadgets and devices</p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 text-center text-white">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">Amazing Books</h3>
            <p>Knowledge and entertainment at your fingertips</p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 text-center text-white">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            <p>Quick and reliable shipping worldwide</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-schoolBlue to-schoolGreen bg-clip-text text-transparent">
            🌟 Our Amazing Products
          </h2>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none bg-white"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="books">Books</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
                  ${product.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={16} />
                  ))}
                  <span className="text-gray-600 ml-2">(4.8)</span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all"
                >
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CartPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            🛒 Your Shopping Cart
          </h2>
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-xl text-gray-600 mb-8">Your cart is empty</p>
              <button
                onClick={() => setCurrentPage('products')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl">
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-xl" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQuantity(item.id, -1)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t-2 pt-6">
                <div className="text-2xl font-bold text-center mb-6">Total: ${getTotalPrice()}</div>
                <button onClick={() => setCurrentPage('checkout')} className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-2xl text-xl font-bold hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all">
                  Proceed to Checkout 💳
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const CheckoutPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            💳 Checkout
          </h2>
          {orderSubmitted ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-green-600 mb-4">Order Submitted Successfully!</h3>
              <p className="text-gray-600 mb-8">Thank you for your purchase. Redirecting to homepage...</p>
              <button onClick={generateInvoice} className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors">
                <Download className="inline mr-2" size={16} />
                Download Invoice
              </button>
            </div>
          ) : (
            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Name *</label>
                  <input type="text" required value={checkoutForm.name} onChange={(e) => setCheckoutForm((prev) => ({ ...prev, name: e.target.value }))} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                  <input type="tel" required value={checkoutForm.phone} onChange={(e) => setCheckoutForm((prev) => ({ ...prev, phone: e.target.value }))} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Address *</label>
                <input type="text" required value={checkoutForm.address} onChange={(e) => setCheckoutForm((prev) => ({ ...prev, address: e.target.value }))} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Remarks</label>
                <textarea value={checkoutForm.remarks} onChange={(e) => setCheckoutForm((prev) => ({ ...prev, remarks: e.target.value }))} rows="4" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors resize-none" placeholder="Any special instructions..." />
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center mb-2">
                    <span>{item.title} x{item.quantity}</span>
                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-orange-600">${getTotalPrice()}</span>
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl text-xl font-bold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all">
                Submit Order 🎉
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-cyan-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            📞 Contact Us
          </h2>
          <div className="space-y-8">
            <div className="bg-green-50 p-8 rounded-3xl">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-4">WhatsApp Support</h3>
              <p className="text-gray-600 mb-6">Get instant help on WhatsApp!</p>
              <a href="https://wa.me/60194341203" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-600 transform hover:scale-105 transition-all">
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>
            </div>
            <div className="bg-blue-50 p-8 rounded-3xl">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-4">Call Us</h3>
              <p className="text-gray-600 mb-6">Speak directly with our team</p>
              <a href="tel:+60194341203" className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 transform hover:scale-105 transition-all">
                <Phone size={20} />
                +60 19-434 1203
              </a>
            </div>
            <div className="bg-purple-50 p-8 rounded-3xl">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-bold mb-4">Business Hours</h3>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-xl sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold bg-gradient-to-r from-schoolBlue to-schoolGreen bg-clip-text text-transparent">
                MizaShop 🛍️
              </div>
              {/* Desktop links */}
              <div className="hidden md:flex space-x-6">
                <button onClick={() => setCurrentPage('home')} className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentPage === 'home' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}>
                  Home
                </button>
                <button onClick={() => setCurrentPage('products')} className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentPage === 'products' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}>
                  Products
                </button>
                <button onClick={() => setCurrentPage('cart')} className={`px-4 py-2 rounded-lg font-semibold transition-colors relative ${currentPage === 'cart' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}>
                  <ShoppingCart className="inline mr-1" size={18} />
                  Cart
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </button>
                <button onClick={() => setCurrentPage('contact')} className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentPage === 'contact' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}>
                  Contact
                </button>
              </div>
            </div>
            <button onClick={() => setShowUploadForm(true)} className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all">
              <Upload className="inline mr-1" size={18} />
              Upload
            </button>
            {/* Mobile hamburger */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setMobileNavOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
        {/* Mobile slide-over */}
        {mobileNavOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setMobileNavOpen(false)}>
            <div className="bg-white w-3/4 max-w-xs h-full p-6" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold">Menu</span>
                <button onClick={() => setMobileNavOpen(false)}><X size={24} /></button>
              </div>
              <nav className="space-y-4">
                <button className="block w-full text-left" onClick={() => {setCurrentPage('home'); setMobileNavOpen(false);}}>Home</button>
                <button className="block w-full text-left" onClick={() => {setCurrentPage('products'); setMobileNavOpen(false);}}>Products</button>
                <button className="block w-full text-left flex items-center" onClick={() => {setCurrentPage('cart'); setMobileNavOpen(false);}}>
                  <ShoppingCart className="mr-2" size={18}/> Cart
                </button>
                <button className="block w-full text-left" onClick={() => {setCurrentPage('contact'); setMobileNavOpen(false);}}>Contact</button>
                <button className="block w-full text-left" onClick={() => {setShowUploadForm(true); setMobileNavOpen(false);}}>Upload</button>
              </nav>
            </div>
          </div>
        )}
      </nav>
      {/* Product Upload Modal */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Upload Product</h3>
              <button onClick={() => setShowUploadForm(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleProductUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Product Title *</label>
                <input type="text" required value={newProduct.title} onChange={(e) => setNewProduct((prev) => ({ ...prev, title: e.target.value }))} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                <textarea required value={newProduct.description} onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none" rows="3" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Price *</label>
                <input type="number" step="0.01" required value={newProduct.price} onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                <input type="url" value={newProduct.image} onChange={(e) => setNewProduct((prev) => ({ ...prev, image: e.target.value }))} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" placeholder="https://example.com/image.jpg" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select value={newProduct.category} onChange={(e) => setNewProduct((prev) => ({ ...prev, category: e.target.value }))} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none bg-white">
                  <option value="electronics">Electronics</option>
                  <option value="books">Books</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all">
                Upload Product
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Page Content */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'products' && <ProductsPage />}
      {currentPage === 'cart' && <CartPage />}
      {currentPage === 'checkout' && <CheckoutPage />}
      {currentPage === 'contact' && <ContactPage />}
    </div>
  );
};

export default EcommerceWebsite;
