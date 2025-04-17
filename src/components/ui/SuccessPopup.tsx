import React, { useEffect, useRef,useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import Success from "@/assets/icons/Success.svg";
import SuccessLoading from "@/assets/icons/Success_loading.gif";
import { Manrope, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";

const fontMonrope = Manrope({ subsets: ["latin"] });

type PopupProps = {
  isOpen: boolean; // Controls visibility
  onClose: () => void; // Close handler
  title: string; // Popup title
  message: string; // Popup message
  actions?: React.ReactNode; // Buttons or additional actions
};

const SuccessPopup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title,
  message,
  actions,
}) => {
  if (!isOpen) return null;
  const successRef = useRef<HTMLDivElement>(null);
  
  const [showGif, setShowGif] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGif(false);
    }, 3000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);


  // Detect clicks outside the tab container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        successRef.current &&
        !successRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="bg-white dark:bg-[#1A1A1A] rounded-[20px] shadow-lg w-[80%] lg:w-[40%] relative"
        ref={successRef}
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 bg-[#D6D3D1] hover:bg-gray-300 rounded-full p-2"
          onClick={onClose}
        >
          <X className="text-white dark:text-gray-300 w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mt-4">
        {showGif ? (
          <Image src={SuccessLoading} alt="Success Icon" width={64} height={64} />
      ) : (
          <Image src={Success} alt="Success Icon" width={64} height={64} />
      )}
        </div>

        {/* Title */}
        <h2
          className={cn(
            "text-center text-[20px] font-medium mt-2 text-[#0A0A0A] dark:text-[#FFFFFF]",
            fontMonrope.className
          )}
        >
          {title}
        </h2>

        {/* Message */}
        <p
          className={cn(
            "text-center text-[14px] font-medium text-[#A8A29E] mt-2 px-6",
            fontMonrope.className
          )}
        >
          {message}
        </p>

        {/* Actions */}
        <div className="mt-3 py-3 px-6 space-y-3 w-[100%] border-t border-dashed border-[#8C8FA166]">
          {actions}
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
