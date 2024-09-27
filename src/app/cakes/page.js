'use client'

import { useEffect, useState } from 'react';
import { Raleway } from 'next/font/google';
import Footer from '../components/Footer';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import { ImHappy2 } from "react-icons/im";
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import ClientOnly from '../components/ClientOnly';

const raleway = Raleway({
  subsets: ['cyrillic'],
  weight: '600'
});

function FloatingCartIcon({ itemCount }) {
  return (
    <Link href="/cart">
      <div className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-2xl cursor-pointer hover:bg-white hover:text-black border  transition-colors z-50">
        <ShoppingCart size={24} />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {itemCount}
          </span>
        )}
      </div>
    </Link>
  );
}

function Page() {
  const [cakes, setCakes] = useState([]);
  const { cart, dispatch } = useCart();

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await fetch('/api/products?category=cake');
        const data = await response.json();
        if (data.success) {
          setCakes(data.data);
          localStorage.setItem('cakes', JSON.stringify(data.data));
        }
      } catch (error) {
        console.error('Error fetching cakes:', error);
        // If fetch fails, try to use stored data
        const storedCakes = localStorage.getItem('cakes');
        if (storedCakes) {
          setCakes(JSON.parse(storedCakes));
        }
      }
    };

    fetchCakes();
  }, []);

  const addToCart = (cake) => {
    console.log('Adding to cart:', cake);
    dispatch({ type: 'ADD_TO_CART', payload: cake });
  };
  
  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <>
      <div className='flex flex-col items-center justify-center sm:pt-[15rem] pt-[9rem]'>
        <div className='flex flex-col sm:flex-row'>
          <h1 className={`text-4xl uppercase ${raleway.className} text-gray-700 mx-4`}>Cakes - Pricing 200 ₹</h1>
          <p className='m-4 border border-black p-3 text-gray-700 bg-inherit'>
            Whether you are hosting a party for 10 people or 100, we have the cake sizes and shapes that you need. Circular cakes come in eight, nine, and ten-inch sizes, with square cakes available in many customized sizes to fit your individual needs.
          </p>
        </div>

        <div className='pt-[5rem]'></div>

        {/* Cake cards start */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cakes.length > 0 ? (
              cakes.map((cake) => (
                <div key={cake._id} className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden">
                  <div className="relative h-48 sm:h-56">
                    <Image
                      src={cake.imageUrl}
                      alt={cake.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h6 className="mb-2 text-slate-800 text-xl font-semibold truncate">
                      {cake.name}
                    </h6>
                    <p className="text-slate-600 text-sm mb-2 line-clamp-3 flex">
                      <span className='font-semibold pr-2'>How is it?</span> {cake.description}
                    </p>
                    <p className="text-slate-600 font-serif">
                      Price: {cake.price} ₹
                    </p>
                  </div>
                  <div className="px-4 pb-4">
                    <button
                      onClick={() => addToCart(cake)}
                      className="w-full rounded-md py-2 px-5 text-sm text-black hover:text-white transition-all shadow-md hover:shadow-lg hover:bg-slate-700 focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none flex items-center justify-center space-x-2"
                      type="button"
                    >
                      <span className='font-serif hover:font-semibold'>Put me in cart</span>
                      <ImHappy2 size={20} className='text-green-500' />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading cakes...</p>
            )}
          </div>
        </div>
        {/* Cake cards end */}
      </div>

      <ClientOnly>
        <FloatingCartIcon itemCount={cartItemCount} />
      </ClientOnly>
      <Footer />
    </>
  );
}

export default Page;