import Image from "next/image";
import { ICard } from "@/typings";
import React, { use, useEffect, useState } from "react";
import Modal from "react-modal";
import { toBase64, convertImage } from "@/utils/imageUtils";
import { useCookies } from "react-cookie";
import Loading from "./loading";

const Card: React.FC<ICard> = ({ id, name, detail, type, prices, img_url }) => {
  const [cookies, setCookie] = useCookies();

  const handleSetCookie = () => {
    const expDate = new Date();
    expDate.setTime(expDate.getTime() + 20 * 60 * 1000); // 20 minutes from now
    setCookie(`bought_${id}`, true, { maxAge: 20 * 60 });
  };

  const handleGetCookie = () => {
    const cookieValue = cookies[`bought_${id}`];
    if (cookieValue === undefined) {
      return false;
    }
    return true;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const popupStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    content: {
      background: "#D9D9D9",
    },
  };

  async function buyCard(event: React.MouseEvent<HTMLElement>) {
    const tokenString = localStorage.getItem("token") as string;
    console.log("clicki");
    setLoading(true);

    let headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      authentication: tokenString,
    };
    const idUserString = localStorage.getItem("idUser") as string;
    await fetch(
      `https://api.cscamp.net/api/users/${idUserString}/cards/${id}`,
      {
        method: "POST",
        headers: headersList,
      }
    )
      .then((data) => data.json())
      .then((dataJson) => {
        console.log(dataJson);
      })
      .catch((error) => {
        console.error(error);
        alert("error");
      });

    // console.log(event)
    alert("ซื้อสำเร็จ");
    handleSetCookie();
    setDisabled(true);
    setLoading(false);
    closePopup();
  }

  const openPopup = () => {
    const haveCookie = handleGetCookie();
    if (haveCookie === true) {
      alert("คุณได้ซื้อการ์ดนี้ไปแล้ว โปรดรอสำหรับรอบถัดไป");
      return;
    }
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const haveCookie = handleGetCookie();
    setDisabled(haveCookie);
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        contentLabel="Buy Card"
        closeTimeoutMS={200}
        style={popupStyle}
      >
        <div
          className={
            `flex flex-col items-center text-center h-full w-full justify-center cursor-pointer ` +
            (disabled ? "grayscale cursor-not-allowed" : "grayscale-0")
          }
        >
          {loading && <Loading />}
          <Image
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
              onClick={buyCard}
              className="bg-[#F90000] px-4 py-2 w-1/2 rounded-r-lg"
            >
              ซื้อ
            </button>
          </div>
        </div>
      </Modal>

      <div
        className={
          `drop-shadow-md text-center rounded-lg ` +
          (disabled ? "grayscale cursor-not-allowed" : "grayscale-0")
        }
        onClick={openPopup}
      >
        <Image
          src={img_url}
          alt={name}
          width={200}
          height={400}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            convertImage(450, 700)
          )}`}
        />
        <p className="text-2xl text-white leading-10">{prices}$</p>
      </div>
    </>
  );
};

export default Card;
