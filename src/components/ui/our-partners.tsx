import React, { useEffect, useRef } from "react";
import Image from "next/image";
import style from "@/components/ui/our-partner.module.scss";
import Mask_group from "@/assets/icons/partner_logo/Mask_group.svg";
import Mask_group_1 from "@/assets/icons/partner_logo/Mask_group_1.svg";
import Mask_group_2 from "@/assets/icons/partner_logo/Mask_group_2.svg";
import Mask_group_3 from "@/assets/icons/partner_logo/Mask_group_3.svg";
import Mask_group_4 from "@/assets/icons/partner_logo/Mask_group_4.svg";
import Mask_group_5 from "@/assets/icons/partner_logo/Mask_group_5.svg";
import Mask_group_6 from "@/assets/icons/partner_logo/Mask_group_6.svg";
import Mask_group_7 from "@/assets/icons/partner_logo/Mask_group_7.svg";
import Mask_group_8 from "@/assets/icons/partner_logo/Mask_group_8.svg";
import Mask_group_9 from "@/assets/icons/partner_logo/Mask_group_9.svg";
import Mask_group_10 from "@/assets/icons/partner_logo/Mask_group_10.svg";
import Mask_group_11 from "@/assets/icons/partner_logo/Mask_group_11.svg";
import Mask_group_12 from "@/assets/icons/partner_logo/Mask_group_12.svg";
import Mask_group_13 from "@/assets/icons/partner_logo/Mask_group_13.svg";
import Mask_group_14 from "@/assets/icons/partner_logo/Mask_group_14.svg";
import Mask_group_15 from "@/assets/icons/partner_logo/Mask_group_15.svg";

const PartnersSlider = () => {
  const partners = [
    Mask_group,
    Mask_group_1,
    Mask_group_2,
    Mask_group_3,
    Mask_group_4,
    Mask_group_5,
    Mask_group_6,
    Mask_group_7,
    Mask_group_8,
    Mask_group_9,
    Mask_group_10,
    Mask_group_11,
    Mask_group_12,
    Mask_group_13,
    Mask_group_14,
    Mask_group_15,
  ];

  const trackRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const scrollPosition = useRef<number>(0); // Store scroll position

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate the logos to create a seamless infinite scroll
    const duplicateLogos = () => {
      const trackWidth = track.scrollWidth;
      const logos = Array.from(track.children);
      logos.forEach((logo) => {
        const clone = logo.cloneNode(true);
        track.appendChild(clone);
      });
      return trackWidth;
    };

    const trackWidth = duplicateLogos();

    const scroll = () => {
      if (!track) return;

      scrollPosition.current -= 1; // Scroll speed
      if (Math.abs(scrollPosition.current) >= trackWidth) {
        scrollPosition.current = 0; // Reset scroll position after full loop
      }

      track.style.transform = `translateX(${scrollPosition.current}px)`;
      animationFrameId.current = requestAnimationFrame(scroll); // Continue the loop
    };

    scroll(); // Start the scroll loop

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current); // Cleanup on unmount
      }
    };
  }, []);

  return (
    <div className={style["slider-wrapper"]}>
      <div className={style["slider-container"]}>
        <div className={style["slider-track"]} ref={trackRef}>
          {partners.map((logo, index) => (
            <div key={index} className={style["partner-logo"]}>
              <Image
                src={logo}
                alt={`Partner ${index + 1}`}
                className="object-contain"
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersSlider;
