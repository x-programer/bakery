'use client'
import { useState } from "react"
import { Raleway } from 'next/font/google'
import Link from "next/link"
import Image from "next/image"
// import {FaD}
import { MdDeleteForever } from "react-icons/md";
import Footer from "../components/Footer"

const raleway = Raleway({
    subsets: ['latin'],
    weight: '600'
})


function Page() {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null
    });

    const [productsData, getProductsData] = useState([]);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);

    const handleDeleteClick = (productId) => {
        setProductIdToDelete(productId);
        setIsModelOpen(true);
    };

    const handleCloseModal = () => {
        setIsModelOpen(false);
        setProductIdToDelete(null);
    };

    const handleConfirmDelete = async () => {
        console.log(productIdToDelete, "from forntend ");
        if (!productIdToDelete) return;

        try {
            console.log(productIdToDelete, "from forntend ");
            const response = await fetch(`/api/products/${productIdToDelete}`, {
                method: 'DELETE',
            });
            console.log(productIdToDelete, "from forntend ");

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    // Show alert with deleted product information
                    alert(`Product deleted successfully:\n\nID: ${result.data._id}\nName: ${result.data.name}\nPrice: ${result.data.price}`);
                    // Handle successful deletion (e.g., refresh the product list)
                    console.log('Product deleted successfully', result.data);
                } else {
                    console.error('Failed to delete product:', result.message);
                    alert(`Failed to delete product: ${result.message}`);
                }
            } else {
                console.error('Failed to delete product');
                alert('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert(`Error deleting product: ${error.message}`);
        }

        setIsModelOpen(false);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = (e) => {
        setProduct({ ...product, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.image) {
            alert("Please select new image");
            return;
        }

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('category', product.category);
        if (product.image) {
            formData.append('image', product.image);
        }

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                body: formData,
                // Don't set Content-Type header, let the browser set it automatically
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Something went wrong');
            }

            const data = await res.json();
            if (data.success) {
                alert('Product added successfully!');
                // Clear the form
                setProduct({
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    image: null
                });
            } else {
                alert('Error adding product');
            }
        } catch (error) {
            console.error(error);
            alert(`Error: ${error.message}`);
        }
    };

    // fetch all products..
    const fetchProducts = async (category) => {
        console.log("Taped")

        try {
            const response = await fetch(`/api/products?category=${category}`);
            const results = await response.json();

            if (results.success) {
                getProductsData(results.data);
            } else {

                if (results.status === 404)
                    alert(results.message);
                else {
                    console.error('Failed to fetch products: ' + results.error);
                }
            }

        } catch (error) {
            console.log('Some error occured while fetching the Products data', error);
        }

    }

    return (
        <>
            <div className='flex flex-col items-center justify-center min-h-screen bg-white'>
                <div className="sm:pt-36"></div>
                <h1 className="text-2xl font-bold mb-4 pt-4">Dashboard</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h3 className={`${raleway.className}`}>Add Product</h3>

                    <div className="mb-4">
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            placeholder="Product Name"
                            required
                            className="shadow appearance-none border rounded w-full p-4 border-black leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Description"
                            required
                            className="shadow appearance-none border rounded w-full p-4 border-black leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            placeholder="Price"
                            required
                            className="shadow appearance-none border rounded w-full p-4 border-black leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <select
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-4 px-4 border-black leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="" disabled selected>Select Category</option>
                            <option className="lowercase" value="cake">Cake</option>
                            <option className="lowercase" value="pastries">Pastries</option>
                            <option className="lowercase" value="macrons">Macrons</option>
                            <option className="lowercase" value="savory">Savory</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            accept="image/*"
                            required
                            className="block w-full text-sm  border border-black rounded-lg cursor-pointer p-4 bg-gray-50 focus:outline-none dark:placeholder-gray-400"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className={` ${raleway.className} border px-4 py-3 border-black rounded-sm hover:bg-black hover:text-white`}
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>

            <div className="flex flex-col items-center justify-center">

                <button
                    onClick={() => fetchProducts('cake')}
                    className="border p-4 border-black hover:bg-black hover:text-white hover:p-5"
                >
                    Get Product
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {productsData.map((product) => (

                        <div key={product._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                            <a href="#">
                                <Image
                                    src={product.imageUrl}
                                    alt="Product Image would not showen at this time."
                                    width={500}
                                    height={300}
                                    layout="responsive"
                                    className="text-white p-6 rounded-md"
                                />
                            </a>

                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                                </a>
                                <p className="mb-3 font-normal text-white">{product.price} &#x20B9;</p>

                                <div className="flex ">

                                    <div className="">

                                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Update
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </a>

                                    </div>

                                    <div className="text-red-600 ml-auto hover:text-red-400" onClick={() => handleDeleteClick(product._id)}>
                                        <MdDeleteForever size={45} />
                                    </div>

                                    {/* model start */}

                                    {isModelOpen && (
                                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                                <h2 className="text-lg font-bold mb-4">Are you sure you want to delete this entry?</h2>
                                                <div className="flex justify-end space-x-4">
                                                    <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                                                    <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg">Yes</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* model end */}

                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />

        </>
    )
}

export default Page