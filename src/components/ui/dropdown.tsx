import React, { useState } from "react";
import Image from "next/image";
import Bitlayer from "@/assets/icons/bitlayer.png";
import Lorenzo from "@/assets/icons/lorenzo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Vaults from "@/app/vaults/page";

const Dropdown = ({
  selectedOption,
  setSelectedOption,
}: {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  const notify = () => toast("Hello coders it was easy!");
  console.log("Dropdown", selectedOption);

  return (
    <div className={`absolute top-35 right-20 md:top-35 md:right-10`}>
      {/* {selectedOption === "Bitlayer" ? (
        <Image src={Bitlayer} alt="Bitlayer" width={50} height={50} />
      ) : (
        <Image src={Lorenzo} alt="Lorenzo" width={50} height={50} />
      )} */}
      <ToastContainer />
      <select
        value={selectedOption}
        defaultValue="Bitlayer"
        onChange={handleOptionChange}
        className="border border-gray-300 rounded-md p-2"
      >
        <option value="Bitlayer">Bitlayer Testnet</option>
        <option value="Lorenzo">Lorenzo Testnet</option>
        <option value="BoB">BoB Testnet</option>
        <option value="Holesky">Holesky Testnet</option>
      </select>
    </div>
  );
};

export default Dropdown;
