'use client'
import Link from 'next/link'
import { FaInstagram } from 'react-icons/fa'
import { Raleway, Roboto } from 'next/font/google'
const roboto = Roboto({
    subsets: ['latin'],
    weight: '500'
})
const raleway = Raleway({
    subsets: ['latin'],
    weight: '400'
})


function Footer() {
  return (
    <div
        className='h-[50rem] flex flex-col justify-center pt-2 mx-5 space-y-10'
    >
        <p className={`${roboto.className} text-xl text-center`}> HAVE A QUESTION OR WAITING TO PLACE AN <br></br> ORDER? </p>
        
        <Link href={'/contact-us' } className="uppercase text-center">
            <button className='border-2 border-black px-8 py-4 rounded-sm hover:bg-black hover:text-white'>
                contact - us
            </button>
        </Link>
        
        <div className='py-7'></div>

        <p className='text-center font-serif font-bold pt-5'>
            S W E E T  -  T O U C H  
        </p>

        <div className='flex justify-center text-pink-600'>
            <Link href="https://www.instagram.com/patel.shrawana?igsh=eTIwanlnZDVnbmZr"> 
            < FaInstagram size={25}/>
             </Link>
        </div>

        <h1 className={`${raleway.className}  text-black text-center flex justify-center `}> DEVLOPED BY <p className='border-b border-black ml-2'> SHRAVANA</p> </h1>
    </div>
  )
}

export default Footer

