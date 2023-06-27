import Image from "next/image";
import { ICard } from "@/typings";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Loading from "./loading";
import { toBase64, convertImage } from "@/utils/imageUtils";
import { useCookies } from 'react-cookie'


const Card: React.FC<ICard> = ({ id, name, detail, type, prices, img_url }) => {
  const [cookies, setCookie] = useCookies();
  const  handleSetCookie = () => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 20 * 60 * 1000); // 20 minutes from now

    setCookie( type, id, { maxAge: 20 * 60 });
  };
  const handleGetCookie = () => {
    const cookieValue = cookies[type];
    console.log('Cookie value:', cookieValue);
    if ( cookieValue == undefined){
      return false;
    }
    else return true
  };
  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  
  function tpyeCheck(type: string) {
    if (type === "Attack") return "ใช้ (สุ่มเป้าหมาย)";
    else if (type === "Defense") return "ใช้ (ป้องกันอัตโนมัติ)";
    return "ใช้";
  }
  const popupStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    content: {
      background: "#D9D9D9",
    },
  };

  async function buyCard(event: React.MouseEvent<HTMLElement>) {
    console.log("clicki");
    setDisabled(true);
    setLoading(true);
    const haveCookie = handleGetCookie()
    console.log(haveCookie);
    if(haveCookie === true ) {
      alert("cannot use type in this card");
      setLoading(false);
      return;
    }
    // console.log(event)
    // event.currentTarget.style.cursor =  'default';
    handleSetCookie()
    alert("successful");
    setLoading(false);
  }

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const haveCookie = handleGetCookie()
    setDisabled(haveCookie)
    console.log(type + haveCookie)
  },[])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        contentLabel="Test Modal"
        closeTimeoutMS={200}
        style={popupStyle}
      >
        <div className=" flex flex-col items-center text-center h-full w-full justify-center cursor-pointer">
          {loading ? <Loading /> : <div></div>}
          <Image
            style={{
              filter: disabled ? "grayscale(100%)" : "grayscale(0)",
            }}
            src={img_url}
            alt={name}
            width={200}
            height={400}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              convertImage(450, 700)
            )}`}
          />
          <p className="text-xl font-bold my-2">{name}</p>
          <p>ประเภท: {type}</p>
          <p>
            ความสามารถ:
            <br />
            {detail}
          </p>
          <p>ราคา: {prices}$</p>
          <div className="flex w-full justify-between mt-2">
            <button
              className="bg-[#ACACAC] px-4 py-2 w-1/2 rounded-l-lg"
              onClick={closePopup}
            >
              ออก
            </button>
            <button
              disabled={disabled}
              onClick={buyCard}
              className="bg-[#F90000] px-4 py-2 w-1/2 rounded-r-lg  cursor-pointer"
              style={{
                backgroundColor: disabled ? "grey" : "rgb(249, 0, 0)",
                cursor: disabled ? "default" : "pointer",
              }}
            >
              {tpyeCheck(type)}
            </button>
          </div>
        </div>
      </Modal>

      <div
        className="drop-shadow-md text-center rounded-lg"
        onClick={openPopup}
      >
        <Image
          style={{
            filter: disabled ? "grayscale(100%)" : "grayscale(0)",
          }}
          src={img_url}
          alt={name}
          width={200}
          height={400}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            convertImage(450, 700)
          )}`}
        />
        <p className="text-2xl text-white leading-10">{type}</p>
      </div>
    </>
  );
};

export default Card;
