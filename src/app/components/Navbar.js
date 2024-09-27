'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes, FaInstagram, FaBirthdayCake, FaHamburger } from 'react-icons/fa'
import { Raleway } from 'next/font/google'

const raleway = Raleway({
    subsets: ['latin'],
    weight: '600'
})

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef(null)

    const handleNav = () => {
        setMenuOpen(!menuOpen);
        console.log(!menuOpen);
    }

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    return (
        <>
            <nav className='fixed top-0 left-0 w-full h-[96px] sm:h-[158px] shadow-xl bg-white z-50 rounded-t-sm rounded-2xl '>

                <div className='flex justify-between items-center w-full p-8'>

                    <div className='flex-1 text-left'>

                        {/* left */}
                        <Link href={'/product'} className={`${raleway.className} text-xs hidden sm:inline-block`}>
                            ORDER ONLINE - CLICK HERE
                        </Link>

                        <Link href={'/product'} className={`${raleway.className} text-xs inline-block sm:hidden text-red-400`}>
                            <FaBirthdayCake size={40} />
                        </Link>

                    </div>

                    <div className='flex-1 text-center flex flex-col mt-5 justify-center items-center'>

                        {/* middle */}
                        <Link href={'/'}>
                            <h2 className={`uppercase ${raleway.className} sm:text-2xl `}>Sweet Touch</h2>
                        </Link>

                        <ol className={`hidden sm:flex uppercase mt-5 space-x-3 ${raleway.className} text-xs items-center justify-center`}>

                            <Link href={'/our-story'}> <li> our story </li> </Link>
                            <Link href={'/cakes'}> <li > cakes </li> </Link>
                            <Link href={'/pastries'}> <li> pastries </li> </Link>
                            <Link href={'/macrons'}> <li> macrons </li> </Link>
                            <Link href={'/savory'}> <li> savory </li> </Link>
                            <Link href={'/contact-us'}> <li> contact us </li> </Link>

                        </ol>

                    </div>


                    <div className='flex-1 flex justify-end'>

                        {/* right */}
                        <div className='sm:hidden text-end text-green-400' onClick={handleNav} >
                            <FaHamburger size={35} />
                        </div>
                    </div>

                </div>

                <div ref={menuRef} className={
                    menuOpen
                        ? "fixed top-0 left-0 w-full sm:hidden h-[100%] bg-gray-100 p-10 ease-in duration-500"
                        : "fixed top-[-100%] left-0 w-full p-0 ease-in duration-500"
                }>
                    {/* Mobile menu */}


                    <div className="flex flex-col h-full">
                        {/* Your menu items here */}

                        <div className='flex flex-col items-center justify-center text-2xl uppercase h-full'>

                            <ol className={`flex flex-col space-y-4 ${raleway.className} text-gray-500 hover:border-b`}>
                                <Link href={'/our-story'}> <li> our story </li> </Link>
                                <Link href={'/cakes'}> <li> cakes </li> </Link>
                                <Link href={'/pastries'}> <li> pastries </li> </Link>
                                <Link href={'/macrons'}> <li> macrons </li> </Link>
                                <Link href={'/savory'}> <li> savory </li> </Link>
                                <Link href={'/contact-us'}> <li> contact us </li> </Link>

                                <div className='flex text-pink-600 sm:hidden items-center'>
                                    <Link href={'/'}>
                                        <FaInstagram size={30} />
                                    </Link>
                                </div>
                            </ol>
                        </div>

                        <div className="mt-auto">
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>
                    </div>

                </div>

            </nav>

        </>
    )
}

export default Navbar
