import Image from "next/image";
import { ICard } from "@/typings";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const Card: React.FC<ICard> = ({
  id,
  name,
  detail,
  type,
  prices,
  img_url,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  function tpyeCheck(type: string) {
    if (type === 'Attack')
      return 'ใช้ (สุ่มเป้าหมาย)'
    else if(type === 'Defense')
      return 'ใช้ (ป้องกันอัตโนมัติ)'
    return 'ใช้'
  }
  const popupStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    content: {
      background: "#D9D9D9",
    },
  };

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    console.log("Card Id: " + id);
  }, []);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        contentLabel="Test Modal"
        closeTimeoutMS={200}
        style={popupStyle}
      >

        <div className="flex flex-col items-center text-center h-full w-full justify-center cursor-pointer">
          <Image src={img_url} alt={name} width={200} height={400} />
          <p className="text-xl font-bold my-2">{name}</p>
          <p>ประเภท: {type}</p>
          <p>
            ความสามารถ:
            <br />
            {detail}
          </p>
          <p>ราคา: {prices}$</p>
          <div className="flex w-full justify-between mt-2">
            <button className="bg-[#ACACAC] px-4 py-2 w-1/2 rounded-l-lg" onClick={closePopup}>ออก</button>
            <button className="bg-[#F90000] px-4 py-2 w-1/2 rounded-r-lg">{tpyeCheck(type)}</button>
          </div>
        </div>
      </Modal>

      <div
        className="drop-shadow-md text-center rounded-lg"
        onClick={openPopup}
      >
        <Image src={img_url} alt={name} width={200} height={400} />
        <p className="text-2xl text-white leading-10">{type}</p>
      </div>
    </>
  );
};

export default Card;
