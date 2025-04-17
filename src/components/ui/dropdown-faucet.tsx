import React, { useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import stBTC from "@/assets/images/tokenImg/stBTC.svg";
import stBTC_1 from "@/assets/images/tokenImg/stBTC_1.svg";
import LSTS_1 from "@/assets/icons/LSTS_1.svg";
import LSTS_2 from "@/assets/icons/LSTS_2.svg";
import { ChevronDown, ChevronUp } from "lucide-react";

const Dropdown = ({
  selectedOption,
  setSelectedOption,
}: {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [{ value: "bmBTC", label: "bmBTC", icon: stBTC_1 }];

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const notify = () => toast("Hello coders it was easy!");
  console.log("Dropdown", selectedOption);

  return (
    <div className="relative">
      <ToastContainer />
      <div
        onClick={toggleDropdown}
        className="border border-gray-300 rounded-md p-2 cursor-pointer"
      >
        <div className="flex items-center text-[16px] font-semibold text-gray-600 dark:text-gray-300">
          {options.find((option) => option.value === selectedOption)?.icon && (
            <Image
              src={
                options.find((option) => option.value === selectedOption)?.icon
              }
              alt={selectedOption}
              width={24}
              height={24}
              className="mr-2"
            />
          )}
          <span className="flex justify-between w-full">
            {selectedOption}
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </span>
        </div>
      </div>
      {isOpen && (
        <ul className="absolute mt-2 border border-gray-300 rounded-md bg-white w-full z-10 dark:bg-gray-700">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionChange(option.value)}
              className="flex items-center text-[16px] font-semibold p-2 hover:bg-gray-100 cursor-pointer dark:text-gray-300 dark:hover:text-gray-700"
            >
              <Image
                src={option.icon}
                alt={option.label}
                width={24}
                height={24}
                className="mr-2"
              />
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
