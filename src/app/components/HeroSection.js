'use client'
import Image from 'next/image'
import Link from 'next/link'
// import cake_3 from '/cake_3.jpg'
// import MAX_3591 from '/MAX_3591.jpg'
// import MAX_3813 from '/MAX_3813.jpg'
// import MAX_4016 from '/MAX_4016.jpg'
// import rest_img from '/rest_img.jpg'
import { ReactTyped } from 'react-typed'
import Footer from './Footer'

import { Raleway, Ramaraja } from 'next/font/google'
const raleway = Raleway({
    subsets: ['latin'],
    weight: '600'
})

const ramaraja = Ramaraja({
    subsets: ['latin'],
    weight: '400'
})

function HeroSection() {
    
    return (
        <>
            <div className='relative w-full h-[calc(100vh-84px)] sm:h-[calc(100vh-116px)] overflow-hidden p-4'>
                <div className='fixed top-0 left-0 w-full h-full'>
                    <Image
                        src='/cake_3.jpg'
                        alt='Delicious Cake'
                        priority
                        fill
                        className='object-cover blur-sm'
                    />
                    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                        <h1 className='hero-text text-8xl font-bold border hover:border-black italic sm:p-2 m-2 hover:cursor-pointer'>Delicious Cake</h1>
                    </div>
                </div>
            </div>

            <div className='relative z-10 bg-white '>

                <div className='flex items-center justify-center pt-10 hero-section'>
                    <h1 className={`uppercase sm:text-2xl ${raleway.className} text-gray-700`}>Our bakery offerings {''}
                        <span className='text-purple-600 italic' >

                            <ReactTyped
                                strings={['c a k e s', 'p a s t r i e s', 'b r e a d', 'c o o k i e s', 'm a c r o n s', 's a v o r  y']}
                                typeSpeed={70}
                                backSpeed={70}
                                loop
                            />
                        </span>
                    </h1>
                </div>

                <div className='flex flex-col sm:flex-row items-center justify-center w-full pt-10 space-y-4'>
                    <div className='flex flex-col items-start p-2 w-full sm:w-1/3'>
                        <div className='relative w-full h-64'>
                            <Image
                                src='/MAX_3591.jpg'
                                alt='404 Not Found'
                                priority
                                layout='fill'
                                className='object-cover w-full h-full zoom rounded-lg'
                            />
                        </div>
                        <p className='pt-8 text-start'>C A K E S</p>
                        <p className='pt-6 text-start text-gray-600 italic'>We carry a wide variety of Indian style cakes that we make from scratch daily and for special events! You'll love our cakes.</p>
                        <Link href={'/cakes'} className='text-start'>
                            <button className='border border-gray-400 rounded-sm py-3 px-6 mt-5 uppercase'>
                                HEAD TO THE CAKES
                            </button>
                        </Link>
                    </div>
                    <div className='flex flex-col items-start p-2 w-full sm:w-1/3'>
                        <div className='relative w-full h-64'>
                            <Image
                                src='/MAX_3813.jpg'
                                alt='404 Not Found'
                                priority
                                layout='fill'
                                className='object-cover w-full h-full zoom rounded-lg'
                            />
                        </div>
                        <p className='pt-8 text-start'>M A C A R O N S</p>
                        <p className='pt-6 text-start text-gray-600 italic'>Gluten free and delicious, our macarons are our pride and joy! Made from high quality almond flour that you can enjoy in many flavors.</p>
                        <Link href={'/macarons'} className='text-start'>
                            <button className='border border-gray-400 rounded-sm py-3 px-6 mt-5 uppercase'>
                                TAKE ME TO THE MACARONS
                            </button>
                        </Link>
                    </div>
                    <div className='flex flex-col items-start p-2 w-full sm:w-1/3'>
                        <div className='relative w-full h-64'>
                            <Image
                                src='/MAX_4016.jpg'
                                alt='404 Not Found'
                                priority
                                layout='fill'
                                className='object-cover w-full h-full zoom rounded-lg'
                            />
                        </div>
                        <p className='pt-8 text-start'>P A S T R I E S</p>
                        <p className='pt-6 text-start text-gray-600 italic'>Our team of bakers work hard to craft pastries that bring Europe into your home but be careful once tried you’ll be coming back for more!</p>
                        <Link href={'/pastries'} className='text-start'>
                            <button className='border border-gray-400 rounded-sm py-3 px-6 mt-5 uppercase'>
                                I WANT PASTRIES
                            </button>
                        </Link>
                    </div>
                </div>

                <div className='pt-8 m-2 '>
                    {/* <Image
                        src='/rest_img.jpg'
                        alt='404 Not Found'
                        priority
                        className='rounded-md'
                        width={500}
                        height={400}
                    /> */}
                </div>

                <Footer />

            </div>



        </>
    )
}

export default HeroSection