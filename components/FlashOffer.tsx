import React, { useEffect, useRef } from 'react';
import { FaTruckFast } from "react-icons/fa6";

const FlashOffer = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const triggerAnimation = () => {
    const el = sliderRef.current;
    if (!el) return;

    el.classList.remove("cross-slide");
    void el.offsetWidth; // Force reflow
    el.classList.add("cross-slide");
  };

  useEffect(() => {
    triggerAnimation(); // Initial run
    const interval = setInterval(triggerAnimation, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="!flex !justify-center !items-center !w-full !bg-[#9f01da] !gap-1 !relative overflow-hidden">
        {/* Main content */}
        <div>
          <FaTruckFast className="text-white" />
        </div>
        <div>
          <p className="!text-center !w-full !text-white !font-semibold !text-[12px] !py-3">
            FREE SHIPPING on all orders above ₹299
          </p>
        </div>

        {/* Sliding image */}
        <div
          ref={sliderRef}
          className="absolute -left-[150px] -translate-y-1/2"
        >
          <div className="w-[150px] flex items-center justify-center rounded shadow-md !opacity-25">
            <img
              className="!opacity-80 h-full"
              src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/lE6oaKjFzKpdSBYPLAfTFGuycxXGvdbdmLUkQYPz.webp"
              alt="Shipping"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashOffer;
