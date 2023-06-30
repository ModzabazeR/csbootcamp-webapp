import { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import Modal from "react-modal";

import { ICard, getCardsResponse, getUserByIdResponse } from "@/typings";
import { getUserJson, validateToken } from "@/utils/validateAdmin";

import CardUser from "@/components/cardUser";

const Store: NextPage<{ cardArr: ICard[] }> = ({ cardArr }) => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [filteredCardArr, setFilteredCardArr] = useState<ICard[]>(cardArr);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myCardList, setmyCardList] = useState("");
  const [refreshCardUser, setRefreshCardUser] = useState(false);
  const [refreshMycard, setRefrerefreshMycard] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const router = useRouter();
  const booleanify = (value: string): boolean => {
    const truthy: string[] = ["true", "True", "1"];

    return truthy.includes(value);
  };
  const popupStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    content: {
      background: "#D9D9D9",
    },
    width: "auto",
    height: "auto",
  };
  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    let validate = validateToken(tokenString);
    if (validate === null) {
      router.push("/login");
    } else if (validate === true) {
      router.push("/admin");
    }

    const userJson = getUserJson(tokenString);
    if (userJson === null) {
      router.push("/login");
      return;
    }
    const idUserString = userJson.username;
    const USER_URL = `https://api.cscamp.net/api/users/${idUserString}`;
    let headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    };
    fetch(USER_URL, {
      method: "GET",
      headers: headersList,
    })
      .then((data) => data.json())
      .then((dataJson: getUserByIdResponse) => {
        setFilteredCardArr(dataJson.data.cards);
      });

    fetch("https://api.cscamp.net/api/status/plays", {
      method: "GET",
      headers: headersList,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!JSON.parse(data.data[0].open)) {
          router.push("/dashboard");
        } else {
          setIsPageLoaded(true);
        }
      })
      .catch((error) => console.error(error));
    const haveCookie = cookies["used"];
    setDisabled(booleanify(haveCookie));
    console.log("used   " + haveCookie);
  }, []);
  const handleSetCookie = (isTrue: boolean) => {
    const expirationDate = new Date();

    setCookie("used", isTrue, { maxAge: 20 * 60 });
  };
  const handleGetCookie = (type: string) => {
    const cookieValue = cookies[type];
    console.log("Cookie value:", cookieValue);
    if (cookieValue === undefined) {
      return null;
    }
    return cookieValue;
  };
  console.log(cardArr);
  async function buyCard(event: React.MouseEvent<HTMLElement>) {
    event.currentTarget.style.cursor = "default";
    setDisabled(true);
    const tokenString = localStorage.getItem("token") as string;
    const idUserString = localStorage.getItem("idUser") as string;
    console.log(tokenString);
    setLoading(true);
    event.currentTarget.style.cursor = "wait";
    let headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      authorization: tokenString,
    };
    const body = {
      buff: handleGetCookie("Buff"),
      atk: handleGetCookie("Attack"),
      def: handleGetCookie("Defense"),
    };

    let res: {
      code: string;
      message: string;
    } = {
      code: "",
      message: "",
    };
    await fetch(`https://api.cscamp.net/api/users/${idUserString}/play`, {
      method: "POST",
      headers: headersList,
      body: JSON.stringify({
        buff: handleGetCookie("Buff"),
        atk: handleGetCookie("Attack"),
        def: handleGetCookie("Defense"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        res = data;
      })
      .catch((error) => console.log(error));
    console.log(body);
    handleSetCookie(true);
    try {
      if (res.code === "000") {
        alert("successful");
        return;
      } else if (res.code === "070") {
        alert("User already use card.");
        return;
      } else if (res.code === "071") {
        alert("User can not play card at this moment.");
        setDisabled(false);
        removeCookie("used");
        return;
      } else {
        alert(res.message);
        console.log(res);
      }
    } catch (error) {
      alert("some error");
    }

    setLoading(false);
  }
  function clearCard() {
    removeCookie("Attack");
    removeCookie("Defense");
    removeCookie("Buff");
    removeCookie("AttackName");
    removeCookie("DefenseName");
    removeCookie("BuffName");
    makeList();
    setRefreshCardUser(!refreshCardUser);
    setRefrerefreshMycard(Math.floor(Math.random() * 99999));
  }

  function makeList() {
    let text: string = "";
    text +=
      (cookies["AttackName"] !== undefined
        ? cookies["AttackName"] + ",    "
        : " ") + "    ";
    text +=
      (cookies["DefenseName"] !== undefined
        ? cookies["DefenseName"] + ",    "
        : " ") + "    ";
    text +=
      (cookies["BuffName"] !== undefined ? cookies["BuffName"] : " ") + "    ";
    setmyCardList(text);
  }

  function empty() {
    if (myCardList.trim() === "") {
      return "คุณไม่ได้เลือกการ์ดที่จะใช้ในรอบนี้ ยืนยันที่จะไม่ใช้หรือไม่";
    }
  }

  useEffect(() => {
    makeList();
  }, [refreshMycard]);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center bg-slate-800 py-6 gap-4">
        <Head>
          <title>My Card | CS Bootcamp 2023</title>
        </Head>
        {/* {loading ? <Loading /> : <div></div>} */}
        <div
          onClick={() => router.back()}
          className="absolute bg-blue-600 py-2 px-5 text-white right-5 top-5 cursor-pointer rounded"
        >
          กลับ
        </div>
        <h1 className="text-5xl text-white">คลัง</h1>
        <div className="break-all	w-full		">
          <div className="bg-slate-200 mx-5 rounded">
            <button
              onClick={clearCard}
              disabled={disabled}
              className=" bg-blue-600 py-2 px-5 text-white right-5 m-3  cursor-pointer rounded"
              style={{
                cursor: disabled ? "default" : "pointer",
                backgroundColor: disabled ? "grey" : "rgb(37, 99, 235)",
              }}
            >
              clear
            </button>
            <button
              onClick={makeList}
              disabled={disabled}
              className=" bg-blue-600 py-2 px-5 text-white right-5 m-3  cursor-pointer rounded"
              style={{
                cursor: disabled ? "default" : "pointer",
                backgroundColor: disabled ? "grey" : "rgb(37, 99, 235)",
              }}
            >
              refresh
            </button>
            <div className="break-all p-5">การ์ดที่จะใช้ : {myCardList}</div>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-yellow-300 mx-5 p-4 rounded">
            <p className="font-bold">การใช้การ์ด:</p>
            <p>
              สามารถเลือกใช้การ์ดได้ประเภทละ 1 ใบต่อ 1 ตา
              การ์ดที่เลือกแล้วจะกลายเป็นสีเทา เมื่อมั่นใจแล้วให้กด use
              เป็นการยืนยันการใช้
            </p>
            <p>
              การ์ดมีทั้งหมด 3 ประเภทคือ Attack, Buff, และ Defense
              ดังนั้นหมายความว่าเราสามารถใช้ได้มากสุด 3 ใบต่อตานั่นเอง
            </p>
            <p>
              หากว่าเลือกการ์ดไปแล้วอยากเปลี่ยน สามารถกด clear
              เพื่อเลือกอีกครั้งได้เรื่อย ๆ (ถ้ากด use
              ไปแล้วจะเปลี่ยนไม่ได้แล้วนะครับ)
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {filteredCardArr.map((e, i) => {
            return (
              <CardUser
                key={i}
                id={e.id}
                name={e.name}
                detail={e.detail}
                type={e.type}
                prices={e.prices}
                img_url={e.img_url}
                refresh={refreshCardUser}
                refreshMain={setRefrerefreshMycard}
              />
            );
          })}
        </div>
        <button
          disabled={disabled}
          onClick={openPopup}
          className="text-lg	 absolute bg-red-600 py-2 px-5 text-white left-5 top-5 cursor-pointer rounded"
          style={{
            cursor: disabled ? "default" : "pointer",
            backgroundColor: disabled ? "grey" : "rgb(220, 38, 38)",
          }}
        >
          Use
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        contentLabel="Use Card"
        closeTimeoutMS={200}
        style={popupStyle}
      >
        <div className="text-lg	 flex flex-col items-center text-center h-full w-full justify-center">
          <div className="flex gap-4 flex-col items-center text-center w-full justify-center">
            <p>การ์ดที่จะใช้</p>
            <div className="border-2 border-sky-500 p-3 rounded">
              <p>{myCardList} </p>
              <p>{empty()}</p>
            </div>
            <p>( หากกดปุ่ม &quot;ใช้&quot; จะไม่สามารถแก้ได้ ในรอบนี้ ) </p>
          </div>

          <div className="text-xl flex w-auto justify-between mt-2">
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
              ใช้
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default Store;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const CARDS_URL = "https://api.cscamp.net/api/cards";
  let headersList = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  };

  let response = await fetch(CARDS_URL, {
    method: "GET",
    headers: headersList,
  });
  let dataJson: getCardsResponse = await response.json();
  console.log(`Get card status: ${dataJson.code}`);

  return {
    props: {
      cardArr: dataJson.data,
    },
  };
};
