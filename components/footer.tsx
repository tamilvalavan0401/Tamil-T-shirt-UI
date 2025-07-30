// components/footer.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook, Youtube } from "lucide-react"
import Image from "next/image"

// Data for footer sections
const supportLinks = [
  { name: "Refer Products", href: "/refer-products" },
  { name: "Track Order", href: "/track-order" },
  { name: "Return & Exchange Policy", href: "/returns" },
  { name: "FAQ's", href: "/faqs" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Shipping Policy", href: "/shipping" },
]

const companyLinks = [
  { name: "Blog", href: "/blog" },
  { name: "Store Location", href: "/store-locator" },
  { name: "Contact Us", href: "/contact" },
  { name: "About", href: "/about" },
  { name: "Shipping Policy", href: "/shipping" },
  { name: "Support", href: "/support" },
]

const accordionItems = [
  {
    title: "Popular Searches",
    content: `All T-Shirts | Graphic T-Shirts | Oversized T-Shirts | Solid T-Shirts | Printed T-Shirts | Anime T-Shirts | Typography T-Shirts | Minimal T-Shirts | Polo T-Shirts | Henley T-Shirts | Full Sleeve T-Shirts | Crop T-Shirts | Vintage T-Shirts | Band T-Shirts | Summer T-Shirts | Winter T-Shirts | Plain T-Shirts | Longline T-Shirts | Unisex T-Shirts | Men's T-Shirts | Women's T-Shirts | Plus Size T-Shirts | Workout T-Shirts | Casual T-Shirts | Everyday Essentials | Organic Cotton T-Shirts | Dry-Fit T-Shirts | Best of T-Shirts | New Arrivals | Best Sellers | Trending T-Shirts | Limited Edition Tees | Custom T-Shirts | T-Shirts Under ₹499 | All Topwear`,
  },
  {
    title: "எங்கள் கதை - தமிழ் மொழியை கொண்டாடும் தமிழ் டி-ஷர்ட்கள்",
    content: `பல்லாயிரம் ஆண்டுகளுக்கு முன் தோன்றிய செம்மொழி, நம் தமிழ் மொழி. இம்மொழியின் சொல்லும்-சுவையும், இலக்கணமும்- இலக்கியங்களும், கலாச்சாரமும்-பண்பாடும், பெருமையையும்-புகழையும் போற்றாத புலவர்கள், கவிஞர்கள் பாரில் இல்லை. இத்தனை பேர்பெற்ற தமிழ் மொழி, அதன் ஆதிக்க இடமான, தமிழ் நாட்டிலேயே அழிந்து வருவது, வருத்தத்திற்குரிய விஷயமாகும். ஒரு தமிழனாக இந்த மொழியையும் கலாச்சாரத்தையும் பரப்புவது தன் கடமை என்று, இதையே தொழிலாய் முனைந்து ஆர்வமாய் ஈடுபட்டு வருகிறார் கோபிநாத் ரவிராஜன். யுவர்ஸ்டோரி தமிழ் உடன் பகிர்ந்து கொண்ட அவரது தொழில் பயணம் உங்கள் பார்வைக்கு! "இலவம்" முதல் "வில்வா" வரை விருதுநகர் மாவட்டத்தில் உள்ள ராஜபாளையத்தில் பிறந்த கோபிநாத், 2012இல் தன் பொறியியல் படிப்பை முடித்தார். பின் இவரும் இவரது நண்பர்களும் கூட்டு சேர்ந்து தொழில் முனைவதில் ஆர்வம் கொண்டிருந்தனர். ஆறு, ஏழு மாதங்கள் கழித்து, 'இலவம்' எனும் ஆடை ப்ராண்ட் பெயரில் சட்டைகளைத் தயாரித்து, விற்பனை செய்யத் தொடங்கினர். தமிழ்நாட்டில் மட்டுமின்றி மலேசியா, ஆஸ்திரேலியா மற்றும் சிங்கப்பூர் முதலிய நாடுகளில் வசிக்கும் தமிழர்களிடையே, இவர்களது 'தமிழ் வார்த்தைகள் அச்சடிக்கப்பட்ட சட்டைகளுக்கு' நல்ல வரவேற்பு கிடைத்து, லாபகரமான தொழில் செய்து வந்தனர். ஆனால் பங்குதாரர்களுக்கிடையே ஏற்பட்ட சிக்கல்களினால், அதிலிருந்து வெளியேறி, மார்ச் 2015இல் கோபிநாத், சொந்தமாக "வில்வா" எனும் பெயரில், இணையதளம் மூலம் டி-ஷர்ட் விற்பனையை செய்யத் தொடங்கினார்`,
  },
  {
    title: "TAMIL T-SHIRTS THE NEW AGE ONLINE SHOPPING EXPERIENCE",
    content: `Tamiltshirts® is a lifestyle fashion brand committed to crafting innovative...`,

    content2: ` Empowering style since 2012, TAMIL T-SHIRTS® boasts a 400-member strong team, with a remarkable track record of 2 million products sold. Our unrestricted approach to experimentation allows us to strike the perfect balance between creativity and relatability, resulting in innovative designs that redefine fashion. Always at the forefront of style, our product range is consistently fresh and in-demand, with monthly sales exceeding 1 lakh products. Operating on a vertical integration model, we manufacture our products in-house, eliminating middlemen to offer high-quality fashion at affordable prices. Our commitment extends beyond fashion to environmental and social responsibility, encompassing practices like rainwater harvesting, sustainable packaging, and employee benefits. At TAMIL T-SHIRTS®, we not only keep up with the latest trends but also set them. From our exclusive T-shirt collection to personalized Tamil letter T-shirts, we provide an accessible, affordable, and thoughtful online shopping experience tailored for the Indian fashion enthusiast.`,
  },
  {
    title: "ONLINE SHOPPING AT TAMIL T-SHIRTS IS HASSLE-FREE, CONVENIENT AND SUPER-EXCITING!",
    content: `Transforming the shopping experience, online shopping is now a delightful journey right from the comfort of your home. Gone are the days of planning trips to physical stores; today, you can indulge in the excitement of online shopping with tamiltshirt.in. Explore a world of amazing deals, discounts, and a user-friendly interface that stands out among other online shopping sites in India. With numerous shopping filters, we ensure your experience is truly hassle-free. Welcome to tamiltshirt.in, where convenience meets exceptional offers, making online shopping a joyous affair in every click.`,

     content2: ` Welcome to Tamiltshirts®, your ultimate destination for the trendiest online fashion. Explore our curated collection of fine, high-quality merchandise and embark on a delightful online shopping experience for both men and women. Discover a diverse range, from men's fashion to essential clothing items, as well as a wide variety of women's wear and accessories. Simply fill up your carts and enjoy swift home delivery for all orders. Indulge in the latest fashion trends with Tamiltshirts®, where style meets convenience. Our exciting categories, combined with exclusive online shopping offers, create an irresistible and uber cool combo for fashion enthusiasts. Whether you're shopping for yourself or looking for the perfect gift, Tamiltshirts® guarantees a smile on the faces of your near and dear ones. Elevate your fashion journey with Tamiltshirts®, where every click is a step towards style and satisfaction.`
  },
  {
    title: "TAMILTSHIRTS.in: THE QUICK ONLINE SHOPPING SITES OF ALL!",
    content: `Experience the optimize of accessible online fashion with Tamiltshirt.in. Dive into our latest collections featuring Marvel t-shirts, including official Avengers and Captain America merchandise. We specialize in creating personalized Tamil word t-shirts and Tamil letter t-shirts, adding a unique touch to your wardrobe. Discover the quirkiest t-shirts unavailable on any other Indian online shopping site, exclusively showcased at Tamiltshirt.in. If your wardrobe craves a stylish transformation, Tamiltshirt.in stands as your top choice among online shopping sites. Explore our diverse range, from trendy sliders and joggers to cozy sweatshirts, fashionable bags, and backpacks. At Tamiltshirt.in, fashion doesn't have to break the bank. Say goodbye to expensive alternatives; here, you'll find affordable and chic options to elevate your style. What you wear is a reflection of your mood, and we've got the quirky t-shirts that allow you to express yourself with confidence. Take a journey through the latest runway trends on our Tamiltshirt.in blog and become a trendsetter among your peers. With us, you're not just shopping; you're defining your style story. No tags, just seamless style and unbeatable affordability, making Tamiltshirt.in your go-to destination for a fashion-forward online experience.`,
  },
  {
    title: "DONT MISS OUT ON ACCESSORIES AVAILABLE ON OUR MULTI-FACETED ONLINE STORE!",
    content: `Explore beyond the ordinary in online fashion with Tamiltshirt.in, where we don't just provide thrilling clothing options but also offer an array of fabulous accessories, featuring exceptionally cool bags and backpacks. Our collection is designed for those who appreciate compactness, hassle-free functionality, and the ease of storing essentials. Carry your belongings with an added touch of swag, thanks to our stylish designs.`,

    content2: `At Tamiltshirt.in, we believe in ensuring that our accessories section is just as captivating as our clothing line. Immerse yourself in the world of cool designs that effortlessly complement your style. Our bags and backpacks are not just accessories; they are a statement. With Tamiltshirt.in, step into a realm where online fashion seamlessly combines practicality, style, and a touch of swag, ensuring you never compromise on individuality and convenience. As for our accessories collection, they are also manufactured with impeccable quality materials. Our mobile covers are made from hard and durable polycarbonate, with a matte finish that will make for a great protection for your phone with the rough use that we put them through nowadays.`
  },
  {
    title: "TAMILTSHIRTS.in: THE UBER COOL ONLINE FASHION STORE FOR THE YOUTH",
    content: `At tamiltshirt.in, we offer everything you need to elevate your cool quotient. Our extensive range includes plus-size clothing, casual shirts for men, and accessories for everyone. We bring forth a diverse array of choices, consolidating the best options that the online shopping platform in India has to offer under one umbrella. Explore a vast selection of men's t-shirts, joggers, sliders, Henley shirts, Polo t-shirts, Oxford pants, and more to curate a stunning ensemble. Our goal is to cater to all kinds of customers by understanding their needs and preferences. Communication is the cornerstone of our operation. Welcome to your Tamiltshirts® Online Fashion Shop! Don't miss out on our attractive daily online shopping offers. Express your style effortlessly with our wide range of apparels just a click away. Make a statement with our premium t-shirts online—more style, more value. Get more, pay less! Your fashion journey begins here.`,
  },
  {
    title: "OUR PHILOSOPHY",
    content: `At Tamiltshirts®, our mission is to craft fashion that not only aligns with the latest local and global trends but also provides functional value for your money. We prioritize quality materials, ensuring comfortable and flattering prints that make you stand out. We delve into the minds of our customers, drawing inspiration from their conversations and experiences to create graphics that resonate and relate. Constant and consistent innovation is at our core, offering our fans nothing short of the best at affordable rates. Unlike many, we don't outsource manufacturing; from design conception to production and styling, everything happens in-house. We're vertically integrated, bringing fashion directly from us to your doorstep without middlemen, ensuring reliability and building trust with our fans. Environmental impact is a concern, and we're actively implementing initiatives, such as optimizing processes to use only what we need from nature, rainwater harvesting, and recycling water from our RO facility. At Tamiltshirts®, our spirit is about making an impact by breaking conventions and offering a different perspective!`,
  },
  {
    title: "ONLINE SHOPPING AT TAMILTSHIRTS® IS EASY, CONVENIENT, AND REWARDING!",
    content: `Step into a world where online shopping meets convenience and excitement at Tamiltshirts®. Say goodbye to long store visits — now you can browse and buy your favorite t shirts for couples online, printed t-shirts, and more from the comfort of your home. With user-friendly navigation, amazing deals, and secure checkout, Tamiltshirts® stands out as one of the best online shopping sites in India.`,

    content2: `Our extensive collection includes trendy printed t-shirts for couples and stylish options for everyone. Whether you want to buy printed tshirts or explore customised t shirts for couples, Tamiltshirts® offers a seamless, hassle-free shopping experience. Use smart filters to find exactly what you need, enjoy quick home delivery, and make your fashion journey joyful and effortless.`,

   content3: `Welcome to Tamiltshirts®, your ultimate destination for high-quality, fashionable t-shirts online. Explore exclusive collections for men and women, perfect for gifting or upgrading your wardrobe. Every click brings you closer to style and satisfaction — shop now and experience the best of online shopping with Tamiltshirts®!

    SSL Certificate`,
  },
]

export function Footer() {
  const [openAccordionItem, setOpenAccordionItem] = React.useState<string | undefined>(accordionItems[0].title)

  return (
    <footer className="bg-footer_bg text-gray_text py-12 px-4 md:px-6 ">
      <div className="max-w-6xl mx-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* Support Section */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            {supportLinks.map((link, index) => (
              <li key={`${link.name}-${index}`}>
                <Link href={link.href} className="hover:text-primary_hover text-white transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            {companyLinks.map((link, index) => (
              <li key={`${link.name}-${index}`}>
                <Link href={link.href} className="hover:text-primary_hover text-white transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Location Section */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Location</h3> 
          <address className="not-italic text-sm space-y-2 ">
            <p className="text-white">9/11, Narayananswamy Garden 3rd Main Rd,</p>
            <p className="text-white">Narayananswamy Garden, Chinna</p>
            <p className="text-white">Kodungaiyur, Kodungaiyur, Chennai,</p>
            <p className="text-white">Tamil Nadu 600118.</p>
            <p className="mt-2 text-white">+91 95 517 89459</p>
            <p className="text-white">contact@tamilshirts.com</p>
          </address>
        </div>

        {/* Connect with & Download App Section */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Connect with</h3>
          <div className="flex space-x-4 mb-6">
            <Link href="https://instagram.com" aria-label="Follow us on Instagram">
              <Instagram className="h-6 w-6 text-gray_text hover:text-primary_hover text-white transition-colors" />
            </Link>
            <Link href="https://facebook.com" aria-label="Follow us on Facebook">
              <Facebook className="h-6 w-6 text-gray_text hover:text-primary_hover text-white transition-colors" />
            </Link>
            <Link href="https://x.com" aria-label="Follow us on X">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-gray_text hover:text-primary_hover text-white transition-colors"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.21-6.873L4.92 21.75H1.616l7.228-8.26L1.01 2.25h7.545L12 8.714 18.244 2.25zm-2.91 15.409l-3.25-4.28L5.392 4.31H8.08L12 9.714l3.82-5.404h2.692l-5.21 6.873 5.21 7.336h-3.308z" />
              </svg>
            </Link>
            <Link href="https://youtube.com" aria-label="Subscribe to our YouTube channel">
              <Youtube className="h-6 w-6 text-gray_text hover:text-primary_hover text-white transition-colors" />
            </Link>
          </div>
          <h3 className="text-lg font-medium text-white mb-4">Download App</h3>
          <div className="flex flex-col space-y-3">
            <Link href="https://play.google.com" aria-label="Download on Google Play">
              <img src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/2XI8BBSVQV6aBrHhkWa75tY6DwBzc7QVb2MpIenJ.webp" alt="Google Play Store" className="h-10 w-auto" />
            </Link>
            <Link href="https://www.apple.com/app-store" aria-label="Download on Apple App Store">
              <img src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/dAW1I3GXJ10BYStWCgsNZc6sopEqAMPmMTxkyKKd.webp" alt="Apple App Store" className="h-10 w-auto" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 my-8 pt-8">
        <div className="flex md:flex-row flex-col justify-between md:space-y-[0px] space-y-[18px]">
          <div >
            <h3 className="text-lg font-medium text-white mb-4">Get our Offers!</h3>
            <div className="flex  gap-2 max-w-md">
              <Input
                type="email"
                placeholder="Enter Email"
                className="flex-1 bg-white rounded-[4px] border-gray-700 text-white placeholder:text-gray_text focus:border-green-500"
              />
              <Button className="bg-footer_btn hover:bg-footer_btn_hover text-white font-medium rounded-[4px]">Subscribe</Button>
            </div>
          </div>
          <div className="">
            <h3 className="text-lg font-medium text-white mb-4">100% Secure Payment</h3>

            <div className="flex justify-center space-x-4 mt-2">
              <img src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/gph3FD2vBi4SRoczzuqHfMKuZIcnEpmyC6dmBizW.webp" alt="PhonePe" className="md:h-[24px] h-[20px] object-contain w-auto" />
              <img src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/9Toq0oHvfbtdHEFHtYD6xhSZgTLf4VMMoaKM2b1W.webp" alt="Razorpay" className="md:h-[24px] h-[20px] object-contain w-auto" />
              <img src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/tjhht6A475hPI2gZ8HuuSxZ4pIUWy1W2nV6qoZLf.webp" alt="Mastercard" className="md:h-[24px] h-[20px] object-contain w-auto" />
              <img src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/mIQpQTfwv6KWJKeJaluipepoPv8zvMhdO2eNPvXq.webp" alt="Visa" className="md:h-[24px] h-[20px] object-contain w-auto" />
              <img src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/FE5NRH5T3Yf3ilXT4AVvu8hdKFIfgMceaEdaPGwa.webp" alt="PayPal" className="md:h-[24px] h-[20px] object-contain w-auto" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 my-8 pt-8 text-center text-sm text-white">
        
        <p>© {new Date().getFullYear()} Vilva Tamil Tshirts Powered by ✨Vilva | Your Technology Partner</p>
      </div>

      {/* Popular Searches and other Accordion sections */}
      <div className=" my-8 pt-8 ">
        <Accordion
          type="single"
          collapsible
          value={openAccordionItem}
          onValueChange={setOpenAccordionItem}
          className="w-full"
        >
          {accordionItems.map((item) => (
            <AccordionItem value={item.title} key={item.title} className="bg-footer_light p-[16px] border-none m-2">
              <AccordionTrigger className="transition-colors text-white [&[data-state=open]>svg]:rotate-180 border-b-none">
                <p className="text-[16px] font-medium text-white">
                  {item.title}
                </p>
              </AccordionTrigger>
              <AccordionContent className="space-y-[16px]">
                <p className="text-[15px] text-white">
                  {item.content}
                </p>
                <p className="text-[15px] text-white">
                  {item.content2}
                </p>
                <p className="text-[15px] text-white">
                  {item.content3}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Bottom Tamil Logo */}
      <div className="flex justify-center items-center">
        <Link href="/" className="flex items-center bg-white rounded-[4px] py-2">
          <Image src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/pxRQdPAEVq1yxEVqlUt4jy8BYE2OL41fccnkSsNn.webp" alt="தமிழ் டி-ஷர்ட் Logo" width={80} height={32} />
        </Link>
      </div>
      </div>
    </footer>
  )
}