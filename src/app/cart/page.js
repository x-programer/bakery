'use client';

import { useCart } from '../../context/CartContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Trash2, Plus, Minus } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const Cart = () => {
  const { cart, dispatch } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id, change) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, change } });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:pt-[15rem] pt-[9rem]">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="flex items-center mb-6 bg-white shadow-md rounded-lg overflow-hidden">
              <div className="relative w-32 h-32 flex-shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex-grow p-4">
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-2">{item.price} ₹</p>
                <div className="flex items-center">
                  <button 
                    className="p-1 bg-gray-200 rounded-full"
                    onClick={() => updateQuantity(item._id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="mx-3">{item.quantity}</span>
                  <button 
                    className="p-1 bg-gray-200 rounded-full"
                    onClick={() => updateQuantity(item._id, 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <button
                className="p-4 text-red-500 hover:text-red-700"
                onClick={() => removeFromCart(item._id)}
              >
                <Trash2 size={24} />
              </button>
            </div>
          ))}
          <div className="mt-8 text-right">
            <p className="text-xl font-semibold">Total: {calculateTotal()} ₹</p>
            <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
              <PayPalButtons
                createOrder={async (data, actions) => {
                  try {
                    const response = await fetch('/api/paypal/create-order', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ total: calculateTotal() }),
                    });
                    if (!response.ok) {
                      throw new Error('Failed to create order');
                    }
                    const order = await response.json();
                    return order.id;
                  } catch (error) {
                    console.error('Error creating order:', error);
                    // Handle the error appropriately
                  }
                }}
                onApprove={async (data, actions) => {
                  try {
                    const response = await fetch('/api/paypal/capture-order', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ orderID: data.orderID }),
                    });
                    if (!response.ok) {
                      throw new Error('Failed to capture order');
                    }
                    const capture = await response.json();
                    console.log('Order captured:', capture);
                    // Handle successful payment (e.g., clear cart, show confirmation)
                  } catch (error) {
                    console.error('Error capturing order:', error);
                    // Handle the error appropriately
                  }
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;