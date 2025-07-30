
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

const ExtraNav = () => {

const router = useRouter()
  const pathname = usePathname()

  // Determine text based on URL
  const mobileTitle = pathname.includes('/cart')
    ? 'Cart'
    : pathname.includes('/checkout')
    ? 'Checkout'
    : ''
    
  return (
    <div className='!sticky !top-0 z-40'>
        <div className=' w-full h-[50px] bg-white shadow-md flex md:justify-center justify-between px-[16px]'>
          <Button variant="ghost" className='my-auto md:hidden block' size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <div className='hidden md:block'>
            <Link href="/" className="flex items-center gap-2 p-2">
                <Image className='w-[120px]' src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/pxRQdPAEVq1yxEVqlUt4jy8BYE2OL41fccnkSsNn.webp" alt="தமிழ் டி-ஷர்ட் Logo" width={80} height={32} />
            </Link>
          </div>
          <div className='block md:hidden my-auto'>
           <p>{mobileTitle}</p>
          </div>
          <Button variant="ghost" className='invisible' size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
        </div>
    </div>
  )
}

export default ExtraNav