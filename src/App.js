import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

const RestaurantMenu = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const menuItems = [
    { id: 1, name: 'Margherita Pizza', price: 12.99, category: 'Main', image: '🍕' },
    { id: 2, name: 'Cheeseburger', price: 10.99, category: 'Main', image: '🍔' },
    { id: 3, name: 'Caesar Salad', price: 8.99, category: 'Appetizer', image: '🥗' },
    { id: 4, name: 'Spaghetti Carbonara', price: 14.99, category: 'Main', image: '🍝' },
    { id: 5, name: 'Chicken Wings', price: 9.99, category: 'Appetizer', image: '🍗' },
    { id: 6, name: 'Chocolate Cake', price: 6.99, category: 'Dessert', image: '🍰' },
    { id: 7, name: 'Ice Cream Sundae', price: 5.99, category: 'Dessert', image: '🍨' },
    { id: 8, name: 'Fresh Lemonade', price: 3.99, category: 'Beverage', image: '🍋' },
  ];

  const addToCart = (item) => {
    const existing = cart.find(cartItem => cartItem.id === item.id);
    if (existing) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const categories = [...new Set(menuItems.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Delicious Bites</h1>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition"
          >
            <ShoppingCart size={20} />
            <span>Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {categories.map(category => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b-2 border-orange-500 pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {menuItems.filter(item => item.category === category).map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
                  <div className="text-5xl text-center mb-2">{item.image}</div>
                  <h3 className="font-semibold text-gray-800 text-center">{item.name}</h3>
                  <p className="text-orange-600 font-bold text-center mt-2">${item.price}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full mt-3 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Your Order</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                      <div className="text-3xl">{item.image}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-orange-600">${item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-orange-600">${getTotal()}</span>
                </div>
                <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;