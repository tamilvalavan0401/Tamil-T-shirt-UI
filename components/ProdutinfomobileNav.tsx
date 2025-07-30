import Link from 'next/link';
import React from 'react'

const ProdutinfomobileNav = () => {



  return (
    <div className=' md:hidden block !sticky !top-0 z-50 '>
        <div className='shadow-md w-full h-[60px] px-4 flex items-center bg-white '>

        <div className='flex items-center justify-between w-full '>
            <div>
                <a className="cursor-pointer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-left-icon lucide-chevron-left"
                >
                    <path d="m15 18-6-6 6-6" />
                </svg>
                </a>
            </div>
            <div className='flex items-center gap-4'>
                <Link href="/my-wishlist" className="!flex !items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide !text-black lucide-heart-icon lucide-heart"
                    >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                </Link>
                <Link href="/cart" className="!flex !items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-shopping-bag-icon lucide-shopping-bag"
                    >
                        <path d="M16 10a4 4 0 0 1-8 0" />
                        <path d="M3.103 6.034h17.794" />
                        <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
                    </svg>
                    
                </Link>
            </div>
        </div>

        </div>
    </div>
  )
}

export default ProdutinfomobileNav