// pages/contact.js
import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 sm:pt-[15rem] pt-[9rem]">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-md p-8 flex">
        <div className="w-1/2 pr-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">Contact Us</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                placeholder="Your Message"
                rows="5"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white p-3 rounded hover:bg-indigo-600 focus:outline-none"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="w-1/2 pl-6 flex items-center justify-center">
          <div className="text-center">
            <img src="/path-to-your-cake-image.jpg" alt="Cake" className="w-full h-auto rounded" />
            <h3 className="text-xl font-semibold mt-4">Our Story</h3>
            <p className="text-gray-700 mt-2">
              Here at [Your Bakery Name], we bake every cake with love and passion. Our journey started with a simple dream to share the joy of baking. Come join us in creating sweet memories, one slice at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;


// ╭─▶    
// ╰─▶ 