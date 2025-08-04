"use client"

import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, Smartphone, Mail, Pencil } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { countries, type Country } from "@/lib/countries"
import { MediaCarousel } from "@/components/media-carousel"
import { LoadingDots } from "@/components/loading-dots"
import Link from "next/link"
// import { AK } from "@/lib/api-config"
import { AxiosPost } from "@/utilities/axioscall";
import { AK } from "@/lib/api-config"

export default function LoginMobile() {
  const [activeTab, setActiveTab] = useState("mobile")
  const [mobileNumber, setMobileNumber] = useState("")
  const [otpSentMobile, setOtpSentMobile] = useState(false)
  const [otpMobile, setOtpMobile] = useState<string[]>(["", "", "", ""])
  const [isLoadingMobile, setIsLoadingMobile] = useState(false)
  const [mobileNumberError, setMobileNumberError] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0])
  const [emailAddress, setEmailAddress] = useState("")
  const [otpSentEmail, setOtpSentEmail] = useState(false)
  const [otpEmail, setOtpEmail] = useState<string[]>(["", "", "", ""])
  const [isLoadingEmail, setIsLoadingEmail] = useState(false)
  const [emailAddressError, setEmailAddressError] = useState("")
  const [countdown, setCountdown] = useState(120)
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const otpInputRefsMobile = useRef<(HTMLInputElement | null)[]>([])
  const otpInputRefsEmail = useRef<(HTMLInputElement | null)[]>([])

  const mediaItems = [
    { type: "image", src: "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/nyLBbJW4RMbAmPjBwo4NK9NEOKT7C0psDCjOSnhM.webp" },
    { type: "image", src: "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/MSl04H6cS8xchxk2cMKCKyBwaew3CtQ914SxV4n4.webp" },
    { type: "image", src: "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/bPRiboXsI3NJbUPmO7JQRp3Y8Z1CuBOXJNgU4HaV.webp" },
  ]

  const invalidMobileNumbers = ["1234567890", "0987654321", "1111111111", "2222666666"]

  const validateMobileNumber = (number: string) => {
    if (number.length !== 10) {
      return "Enter valid number"
    }
    if (!/^\d{10}$/.test(number)) {
      return "Only numbers are accepted"
    }
    if (invalidMobileNumbers.includes(number)) {
      return "Please enter the correct number"
    }
    return ""
  }

  const validateEmail = (email: string) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address"
    }
    return ""
  }

  const startCountdown = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current)
    }
    setCountdown(120)
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current!)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleGenerateOtpMobile = async () => {
    const error = validateMobileNumber(mobileNumber)
    if (error) {
      setMobileNumberError(error)
      return
    }
    setMobileNumberError("")
    setIsLoadingMobile(true)
    try {
     const  requestotppayload ={
            mobile: mobileNumber,
          mobile_prefix: selectedCountry.code,
          storeid: AK.STOREID,
          storecode: AK.STORECODE,
     }

      const response: any = await AxiosPost(
        AK.REQUESTOTPAPI,
        requestotppayload,
        false
      );
      const data = await response.json()
      if (response.ok && data.success) {
        setOtpSentMobile(true)
        startCountdown()
      } else {
        setMobileNumberError(data.message || "Unauthorized access. Please check your credentials.")
      }
    } catch (error) {
      console.error("Error in handleGenerateOtpMobile:", error)
      setMobileNumberError("An error occurred. Please try again.")
    } finally {
      setIsLoadingMobile(false)
    }
  }

  const handleVerifyOtpMobile = async () => {
    const otp = otpMobile.join("")
    if (otp.length !== 4) {
      setMobileNumberError("Please enter a valid 4-digit OTP")
      return
    }
    setIsLoadingMobile(true)
    try {
      const response = await fetch(`${AK.APIURL}${AK.VERIFYOTPAPI}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Key": AK.ACCESSKEY,
        },
        body: JSON.stringify({
          mobile: mobileNumber,
          otp: otp,
          mobile_prefix: selectedCountry.code,
          storeid: AK.STOREID,
          storecode: AK.STORECODE,
          // additional_data: JSON.stringify({
          //   search: "test",
          //   fbp: "fb.1.1743479817499.587164218431192879",
          //   userid: 141961,
          //   source: "/signin",
          // }),
        }),
      })
      const data = await response.json()
      if (response.ok && data.success) {
        console.log("Mobile OTP verified successfully")
        // Handle successful verification (e.g., redirect to next page)
      } else {
        setMobileNumberError(data.message || "Invalid OTP or unauthorized access.")
      }
    } catch (error) {
      console.error("Error in handleVerifyOtpMobile:", error)
      setMobileNumberError("An error occurred. Please try again.")
    } finally {
      setIsLoadingMobile(false)
    }
  }

  const handleResendOtpMobile = async () => {
    setMobileNumberError("")
    try {
      // const response = await fetch(`${AK.APIURL}${AK.REQUESTOTPAPI}`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Access-Key": AK.ACCESSKEY,
      //   },
      //   body: JSON.stringify({
      //     mobile: mobileNumber,
      //     mobile_prefix: selectedCountry.code,
      //     storeid: AK.STOREID,
      //     storecode: AK.STORECODE,
      //     // additional_data: JSON.stringify({
      //     //   search: "test",
      //     //   fbp: "fb.1.1743479817499.587164218431192879",
      //     //   userid: 141961,
      //     //   source: "/signin",
      //     // }),
      //   }),
      // })
     const  requestotppayload ={
            mobile: mobileNumber,
          mobile_prefix: selectedCountry.code,
          storeid: AK.STOREID,
          storecode: AK.STORECODE,
     }

      const response: any = await AxiosPost(
        AK.REQUESTOTPAPI,
        requestotppayload,
        false
      );
      console.log(response,"re")
      const data = await response.json()
      if (response.ok && data.success) {
        startCountdown()
        console.log("OTP resent to mobile")
      } else {
        setMobileNumberError(data.message || "Failed to resend OTP. Unauthorized access.")
      }
    } catch (error) {
      console.error("Error in handleResendOtpMobile:", error)
      setMobileNumberError("An error occurred. Please try again.")
    }
  }

  const handleGenerateOtpEmail = async () => {
    const error = validateEmail(emailAddress)
    if (error) {
      setEmailAddressError(error)
      return
    }
    setEmailAddressError("")
    setIsLoadingEmail(true)
    try {
           const  requestotppayload ={
            email: emailAddress,
          storeid: AK.STOREID,
          storecode: AK.STORECODE,
     }

      const response: any = await AxiosPost(
        AK.EMAILREQUESTOTPAPI,
        requestotppayload,
        false
      );


      const data = await response.json()
      if (response.ok && data.success) {
        setOtpSentEmail(true)
        startCountdown()
      } else {
        setEmailAddressError(data.message || "Unauthorized access. Please check your credentials.")
      }
    } catch (error) {
      console.error("Error in handleGenerateOtpEmail:", error)
      setEmailAddressError("An error occurred. Please try again.")
    } finally {
      setIsLoadingEmail(false)
    }
  }

  const handleVerifyOtpEmail = async () => {
    const otp = otpEmail.join("")
    if (otp.length !== 4) {
      setEmailAddressError("Please enter a valid 4-digit OTP")
      return
    }
    setIsLoadingEmail(true)
    try {
      const response = await fetch(`${AK.APIURL}${AK.EMAILVERIFYOTPAPI}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Key": AK.ACCESSKEY,
        },
        body: JSON.stringify({
          email: emailAddress,
          otp: otp,
          storeid: AK.STOREID,
        }),
      })
      const data = await response.json()
      if (response.ok && data.success) {
        console.log("Email OTP verified successfully")
        // Handle successful verification (e.g., redirect to next page)
      } else {
        setEmailAddressError(data.message || "Invalid OTP or unauthorized access.")
      }
    } catch (error) {
      console.error("Error in handleVerifyOtpEmail:", error)
      setEmailAddressError("An error occurred. Please try again.")
    } finally {
      setIsLoadingEmail(false)
    }
  }

  const handleResendOtpEmail = async () => {
    setEmailAddressError("")
    try {
      const response = await fetch(`${AK.APIURL}${AK.EMAILREQUESTOTPAPI}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Key": AK.ACCESSKEY,
        },
        body: JSON.stringify({
          email: emailAddress,
          storeid: AK.STOREID,
        }),
      })
      const data = await response.json()
      if (response.ok && data.success) {
        startCountdown()
        console.log("OTP resent to email")
      } else {
        setEmailAddressError(data.message || "Failed to resend OTP. Unauthorized access.")
      }
    } catch (error) {
      console.error("Error in handleResendOtpEmail:", error)
      setEmailAddressError("An error occurred. Please try again.")
    }
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, type: "mobile" | "email") => {
    const value = e.target.value
    if (!/^\d*$/.test(value)) return

    const newOtp = type === "mobile" ? [...otpMobile] : [...otpEmail]
    newOtp[index] = value.slice(0, 1)

    if (type === "mobile") {
      setOtpMobile(newOtp)
      if (value && index < 3) {
        otpInputRefsMobile.current[index + 1]?.focus()
      }
    } else {
      setOtpEmail(newOtp)
      if (value && index < 3) {
        otpInputRefsEmail.current[index + 1]?.focus()
      }
    }
  }

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number, type: "mobile" | "email") => {
    const currentOtp = type === "mobile" ? otpMobile : otpEmail
    const currentRefs = type === "mobile" ? otpInputRefsMobile : otpInputRefsEmail

    if (e.key === "Backspace" && !currentOtp[index] && index > 0) {
      currentRefs.current[index - 1]?.focus()
    }
  }

  const formatTime = (seconds: number) => {
    return `${seconds}`
  }

  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    setOtpSentMobile(false)
    setOtpMobile(["", "", "", ""])
    setIsLoadingMobile(false)
    setMobileNumberError("")
    setMobileNumber("")
    setOtpSentEmail(false)
    setOtpEmail(["", "", "", ""])
    setIsLoadingEmail(false)
    setEmailAddressError("")
    setEmailAddress("")
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current)
    }
    setCountdown(120)
  }, [activeTab])

  return (
    <div className="flex max-h-full md:h-screen md:items-center items-stretch md:justify-center justify-end bg-gray-100 md:p-8">
      <div className="w-full max-w-5xl overflow-hidden md:rounded-[6px] md:shadow-lg md:grid md:grid-cols-2  ">
        <div className=" h-[600px]  md:h-[600px] bg-dark-green-bg">
          <MediaCarousel media={mediaItems} />
        </div>
        <div
          className=" h-[250px] w-full bg-cover bg-center hidden"
          style={{ backgroundImage: `url('/placeholder.svg?height=500&width=800')` }}
        ></div>
        <div className="flex flex-col items-center  md:relative absolute bottom-0 right-0 left-0 rounded-tl-[12px] rounded-tr-[12px] justify-center bg-light-green-bg p-6 md:p-10 bg-white">
          <div className="mb-8">
            <Link href='/'>
            <Image
              src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/pxRQdPAEVq1yxEVqlUt4jy8BYE2OL41fccnkSsNn.webp"
              alt="logo"
              width={100}
              height={100}
              className="mx-auto object-contain"
            />
            </Link>
          </div>
          <div className="mb-8 flex space-x-8">
            <button
              className={`flex items-center space-x- text-lg font-medium ${
                activeTab === "mobile" ? "text-active-tab-green border-b-2 border-primary" : "text-gray_text"
              }`}
              onClick={() => setActiveTab("mobile")}
            >
              <div
                className={`flex items-center space-x-2 text-lg font-medium ${
                  activeTab === "email" ? "" : "text-primary"
                }`}
              >
                {activeTab === "email" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <path d="M16.1841 2.83936H7.81578C6.81754 2.83936 6.0083 3.67223 6.0083 4.69964V19.4791C6.0083 20.5065 6.81754 21.3394 7.81578 21.3394H16.1841C17.1823 21.3394 17.9915 20.5065 17.9915 19.4791V4.69964C17.9915 3.67223 17.1823 2.83936 16.1841 2.83936Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 18.8627C12.2868 18.8627 12.5193 18.6302 12.5193 18.3434C12.5193 18.0567 12.2868 17.8242 12 17.8242C11.7132 17.8242 11.4807 18.0567 11.4807 18.3434C11.4807 18.6302 11.7132 18.8627 12 18.8627Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.0027 5.36169H13.9972" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <path d="M16.5449 2.75H8.1949C7.50972 2.75792 6.85562 3.03703 6.37581 3.52621C5.89599 4.0154 5.6295 4.67481 5.63484 5.36002V20.14C5.6295 20.8252 5.89599 21.4846 6.37581 21.9738C6.85562 22.463 7.50972 22.7421 8.1949 22.75H16.5649C17.2501 22.7421 17.9042 22.463 18.384 21.9738C18.8638 21.4846 19.1303 20.8252 19.1249 20.14V5.36002C19.1276 5.01905 19.0629 4.68091 18.9345 4.36502C18.8062 4.04913 18.6166 3.76169 18.3769 3.5192C18.1372 3.2767 17.852 3.08393 17.5377 2.95193C17.2233 2.81994 16.8858 2.75131 16.5449 2.75ZM12.3649 20.52C12.0635 20.522 11.7682 20.4343 11.5167 20.268C11.2652 20.1017 11.0689 19.8645 10.9526 19.5863C10.8363 19.3082 10.8053 19.0017 10.8636 18.7059C10.9219 18.4102 11.0669 18.1384 11.2801 17.9252C11.4933 17.7121 11.7651 17.5671 12.0609 17.5088C12.3566 17.4504 12.6631 17.4814 12.9412 17.5977C13.2194 17.7139 13.4566 17.9103 13.6229 18.1618C13.7891 18.4133 13.8769 18.7085 13.8749 19.01C13.8723 19.4097 13.7124 19.7922 13.4298 20.0748C13.1471 20.3574 12.7646 20.5174 12.3649 20.52ZM14.3649 7.01999H10.3649C10.0997 7.01999 9.84533 6.91465 9.65779 6.72711C9.47025 6.53958 9.36494 6.28521 9.36494 6.01999C9.36494 5.75477 9.47025 5.50043 9.65779 5.3129C9.84533 5.12536 10.0997 5.01999 10.3649 5.01999H14.3649C14.6301 5.01999 14.8844 5.12536 15.072 5.3129C15.2595 5.50043 15.3649 5.75477 15.3649 6.01999C15.3649 6.28521 15.2595 6.53958 15.072 6.72711C14.8844 6.91465 14.6301 7.01999 14.3649 7.01999Z" fill="#457dff"/>
                  </svg>
                )}
              </div>
              <span 
                className={`flex items-center text-lg font-medium ${
                activeTab === "email" ? " text-black" : "text-primary"
              }`}
              >Mobile</span>
            </button>
            <button
              className={`flex items-center space-x-1 text-lg font-medium ${
                activeTab === "email" ? "text-active-tab-green border-b-2 border-primary" : "text-gray_text"
              }`}
              onClick={() => setActiveTab("email")}
            >
              <div
                className={`flex items-center space-x-2 text-lg font-medium ${
                  activeTab === "mobile" ? "" : "text-primary"
                }`}
              >
                {activeTab === "mobile" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17.1816 3.5H6.68164C4.4725 3.5 2.68164 5.29086 2.68164 7.5V16.5C2.68164 18.7091 4.4725 20.5 6.68164 20.5H17.1816C19.3908 20.5 21.1816 18.7091 21.1816 16.5V7.5C21.1816 5.29086 19.3908 3.5 17.1816 3.5Z" stroke="black" stroke-width="1.5"/>
                    <path d="M2.72876 7.58972L9.934 11.7197C10.5383 12.0708 11.2238 12.2556 11.9216 12.2556C12.6195 12.2556 13.305 12.0708 13.9093 11.7197L21.1344 7.58972" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path d="M17.6328 2.75H7.13281C5.87303 2.75 4.66485 3.25044 3.77405 4.14124C2.88326 5.03203 2.38281 6.24022 2.38281 7.5V16.5C2.38281 17.7598 2.88326 18.968 3.77405 19.8588C4.66485 20.7496 5.87303 21.25 7.13281 21.25H17.6328C18.8918 21.2474 20.0984 20.7461 20.9886 19.8558C21.8789 18.9656 22.3802 17.759 22.3828 16.5V7.5C22.3802 6.24103 21.8789 5.03439 20.9886 4.14417C20.0984 3.25394 18.8918 2.75264 17.6328 2.75ZM13.9828 11.07C13.4908 11.3506 12.9342 11.4982 12.3678 11.4982C11.8014 11.4982 11.2448 11.3506 10.7528 11.07L3.90281 7.14C3.99139 6.3453 4.36982 5.61115 4.96573 5.07797C5.56164 4.54479 6.33319 4.25 7.13281 4.25H17.6328C18.4318 4.25219 19.2022 4.54774 19.7976 5.08051C20.3931 5.61327 20.7721 6.34616 20.8628 7.14L13.9828 11.07Z" fill="#457dff"/>
                  </svg>
                )}
              </div>
              <span className={`flex items-center text-lg font-medium ${
                      activeTab === "mobile" ? " text-black" : "text-primary"
                    }`}>
                Email
              </span>
            </button>
          </div>
          {activeTab === "mobile" && (
            <div className="w-full max-w-xs space-y-6">
              {otpSentMobile && (
                <div className="flex items-center justify-center space-x-[8px] text-sm text-gray_text">
                  <p className="text-[14px]">OTP sent to your Mobile number</p>
                  <Button variant="ghost" size="icon" onClick={() => setOtpSentMobile(false)} className="h-6 w-6 rounded-[6px] bg-[#457dff2d]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                      <path d="M3.94587 13.9454L4.35637 11.0915C4.37886 10.9052 4.46521 10.7326 4.60071 10.6028L12.6543 2.54921C12.7579 2.44365 12.8871 2.36661 13.0292 2.32551C13.1712 2.28442 13.3216 2.28068 13.4655 2.31464C14.2083 2.51253 14.8837 2.90766 15.4203 3.45817C15.9755 3.9926 16.3743 4.66849 16.5736 5.41292C16.6047 5.55699 16.5997 5.70655 16.5587 5.84815C16.5177 5.98976 16.4422 6.11896 16.339 6.22415L8.28543 14.2777C8.14638 14.4057 7.97325 14.4905 7.78696 14.5221L4.92326 14.9326C4.7898 14.9507 4.65397 14.9374 4.52648 14.8941C4.39898 14.8507 4.28331 14.7782 4.18856 14.6826C4.0938 14.5869 4.02256 14.4705 3.98045 14.3426C3.93834 14.2147 3.92651 14.0787 3.94587 13.9454Z" stroke="#457dff" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M11.1393 4.07389L14.8143 7.73906" stroke="#457dff" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M3.65057 17.7083H17.3339" stroke="#457dff" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </Button>
                </div>
              )}
              <div className="space-y-2">
                {!otpSentMobile && (
                  <label htmlFor="mobile-number" className="text-sm font-medium text-gray_text">
                    Mobile number
                  </label>
                )}
                <div
                  className={`flex items-center h-[52px] rounded-[6px]  border-2 ${
                    mobileNumberError ? "border-error" : "border-[#CECECE]"
                  } bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-active-tab-green`}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center p-0 h-auto">
                        <Image
                          src={selectedCountry.flag || "/placeholder.svg"}
                          alt={`${selectedCountry.name} flag`}
                          width={20}
                          height={20}
                          className=""
                        />
                        <span className="text-sm font-medium text-gray_text">{selectedCountry.code}</span>
                        <ChevronDown className="h-4 w-4 text-gray_text" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white rounded-[6px]">
                      {countries.map((country:any) => (
                        <DropdownMenuItem
                          key={country.code}
                          onSelect={() => setSelectedCountry(country)}
                          className="flex items-center"
                        >
                          <Image
                            src={country.flag || "/placeholder.svg"}
                            alt={`${country.name} flag`}
                            width={20}
                            height={20}
                            className="  rounded-sm"
                          />
                          <span>
                            {country.code} {country.name}
                          </span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Input
                    id="mobile-number"
                    type="tel"
                    placeholder={otpSentMobile ? mobileNumber : "00000 00000"}
                    value={otpSentMobile ? mobileNumber : mobileNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 10)
                      setMobileNumber(value)
                      setMobileNumberError("")
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isLoadingMobile) {
                        handleGenerateOtpMobile()
                      }
                    }}
                    className="flex-1 border-none !bg-transparent rounded-[6px] !bg-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
                    disabled={otpSentMobile}
                  />
                </div>
                {mobileNumberError && <p className="text-sm text-error">{mobileNumberError}</p>}
              </div>
              {!otpSentMobile ? (
                <Button
                  className="w-full bg-button-green py-2 text-white bg-primary h-[52px] rounded-[6px] hover:bg-button-green/90"
                  onClick={handleGenerateOtpMobile}
                  disabled={isLoadingMobile}
                >
                  {isLoadingMobile ? <LoadingDots /> : "Generate OTP"}
                </Button>
              ) : (
                <>
                  <div className="flex justify-center  space-x-2">
                    {otpMobile.map((digit, index) => (
                      <Input
                        key={index}
                        type="tel"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e, index, "mobile")}
                        onKeyDown={(e) => handleOtpKeyDown(e, index, "mobile")}
                        ref={(el) => (otpInputRefsMobile.current[index] = el)}
                        className="h-[52px] md:w-[70px] w-[60px] text-center text-lg font-bold rounded-[6px] bg-white border-2 border-[#DEDDDD] focus:border-active-tab-green focus:ring-2 focus:ring-active-tab-green"
                      />
                    ))}
                  </div>
                  <div className="flex justify-end items-center space-x-[5px] text-sm">
                    <Button
                      variant="link"
                      className="p-0 h-auto text-[#666666] hover:text-primary"
                      onClick={handleResendOtpMobile}
                      disabled={countdown > 0}
                    >
                      Resend OTP
                    </Button>
                    <span className="text-gray_text">{formatTime(countdown)} Sec</span>
                  </div>
                  <Button
                    className="w-full bg-button-green py-2 text-white bg-primary !rounded-[6px] !h-[52px] hover:bg-button-green/90"
                    onClick={handleVerifyOtpMobile}
                    disabled={isLoadingMobile}
                  >
                    {isLoadingMobile ? <LoadingDots /> : "Verify Account"}
                  </Button>
                </>
              )}
            </div>
          )}
          {activeTab === "email" && (
            <div className="w-full max-w-xs space-y-6">
              {otpSentEmail && (
                <div className="flex items-center justify-center space-x-[8px] text-sm text-gray_text">
                  <span>OTP sent to your Email address</span>
                  <Button variant="ghost" size="icon" onClick={() => setOtpSentEmail(false)} className="h-6 w-6 rounded-[6px] bg-[#457dff2d]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                      <path d="M3.94587 13.9454L4.35637 11.0915C4.37886 10.9052 4.46521 10.7326 4.60071 10.6028L12.6543 2.54921C12.7579 2.44365 12.8871 2.36661 13.0292 2.32551C13.1712 2.28442 13.3216 2.28068 13.4655 2.31464C14.2083 2.51253 14.8837 2.90766 15.4203 3.45817C15.9755 3.9926 16.3743 4.66849 16.5736 5.41292C16.6047 5.55699 16.5997 5.70655 16.5587 5.84815C16.5177 5.98976 16.4422 6.11896 16.339 6.22415L8.28543 14.2777C8.14638 14.4057 7.97325 14.4905 7.78696 14.5221L4.92326 14.9326C4.7898 14.9507 4.65397 14.9374 4.52648 14.8941C4.39898 14.8507 4.28331 14.7782 4.18856 14.6826C4.0938 14.5869 4.02256 14.4705 3.98045 14.3426C3.93834 14.2147 3.92651 14.0787 3.94587 13.9454Z" stroke="#457dff" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M11.1393 4.07389L14.8143 7.73906" stroke="#457dff" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M3.65057 17.7083H17.3339" stroke="#457dff" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </Button>
                </div>
              )}
              <div className="space-y-2">
                {!otpSentEmail && (
                  <label htmlFor="email-address" className="text-sm font-medium text-gray_text">
                    Email address
                  </label>
                )}
                <Input
                  id="email-address"
                  type="email"
                  placeholder={otpSentEmail ? emailAddress : "Enter email"}
                  value={otpSentEmail ? emailAddress : emailAddress}
                  onChange={(e) => {
                    setEmailAddress(e.target.value)
                    setEmailAddressError("")
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isLoadingEmail) {
                      handleGenerateOtpEmail()
                    }
                  }}
                  className={`w-full rounded-md border-2 ${
                    emailAddressError ? "border-error" : "border-[#CECECE]"
                  } bg-white px-3 py-2 focus:border-active-tab-green focus:outline-none rounded-[6px] h-[52px] focus:ring-2 focus:ring-active-tab-green`}
                  disabled={otpSentEmail}
                />
                {emailAddressError && <p className="text-sm text-error">{emailAddressError}</p>}
              </div>
              {!otpSentEmail ? (
                <Button
                  className="w-full bg-button-green py-2 text-white bg-primary h-[52px] rounded-[6px] hover:bg-button-green/90"
                  onClick={handleGenerateOtpEmail}
                  disabled={isLoadingEmail}
                >
                  {isLoadingEmail ? <LoadingDots /> : "Generate OTP"}
                </Button>
              ) : (
                <>
                  <div className="flex justify-center space-x-2">
                    {otpEmail.map((digit, index) => (
                      <Input
                        key={index}
                        type="tel"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e, index, "email")}
                        onKeyDown={(e) => handleOtpKeyDown(e, index, "email")}
                        ref={(el) => (otpInputRefsEmail.current[index] = el)}
                        className="h-[52px] md:w-[70px] w-[60px] text-center text-lg font-bold rounded-[6px] bg-white border-2 border-[#DEDDDD] focus:border-active-tab-green focus:ring-2 focus:ring-active-tab-green"
                      />
                    ))}
                  </div>
                  <div className="flex justify-end items-center space-x-[5px] text-sm">
                    <Button
                      variant="link"
                      className="p-0 h-auto text-[#666666] hover:text-primary"
                      onClick={handleResendOtpEmail}
                      disabled={countdown > 0}
                    >
                      Resend OTP
                    </Button>
                    <span className="text-gray_text">{formatTime(countdown)} Sec</span>
                  </div>
                  <Button
                    className="w-full bg-button-green py-2 text-white bg-primary !rounded-[6px] !h-[52px] hover:bg-button-green/90"
                    onClick={handleVerifyOtpEmail}
                    disabled={isLoadingEmail}
                  >
                    {isLoadingEmail ? <LoadingDots /> : "Verify Account"}
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}