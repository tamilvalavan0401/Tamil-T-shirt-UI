"use client"
import React, { useState } from 'react'

const SizeChart = () => {
  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
        <a 
          href="#" 
          className="text-[#207BB4] text-[12px] font-bold" 
          onClick={(e) => {
            e.preventDefault()
            togglePopup()
          }}
        >
          SIZE GUIDE
        </a>
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={togglePopup}
          >
            <div className="bg-white p-6 rounded-lg max-w-[500px] mx-[16px] w-full max-h-[90vh] overflow-auto relative md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray_text hover:text-gray_text text-2xl"
                onClick={togglePopup}
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-4">Size Guide</h2>
              <p className="text-gray_text">Your size guide content goes here...</p>
            </div>
          </div>
        )}
    </div>
  )
}

export default SizeChart