import { GetServerSideProps, NextPage } from "next";
import Loading from "@/components/loading";
import Link from "next/link";
// import Card from "@/components/card";
import CardUser from "@/components/cardUser";
import { ICard, getCardsResponse, getUserByIdResponse } from "@/typings";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { varlidateToken } from "@/utils/validateAdmin";
import { useCookies } from 'react-cookie'
import Modal from "react-modal";

const Store: NextPage<{ cardArr: ICard[] }> = ({ cardArr }) => {
  const [filteredCardArr, setFilteredCardArr] = useState<ICard[]>(cardArr);
  const [disabled, setDisabled] = useState(false);
  console.log(disabled)
  const [loading, setLoading] = useState(false);
  const [myCardList, setmyCardList] = useState("");
  const [refreshCardUser, setRefreshCardUser] = useState(false);
  const [refreshMycard, setRefrerefreshMycard] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const router = useRouter();
  const booleanify = (value: string): boolean => {
    const truthy: string[] = [
      'true',
      'True',
      '1'
    ]

    return truthy.includes(value)
  }
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
    let validate: boolean = varlidateToken(tokenString);
    if (validate === null) {
      router.push('/login')
    }
    else if (validate === true) {
      router.push('/admin')
    }
    const idUserString = localStorage.getItem("idUser");
    const USER_URL = `https://api.cscamp.net/api/users/${idUserString}`;
    console.log(USER_URL)
    let headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    };
    fetch(USER_URL, {
      method: "GET",
      headers: headersList,
    }).then(data => data.json())
      .then((dataJson: getUserByIdResponse) => {
        setFilteredCardArr(dataJson.data.cards)
      })

    fetch('https://api.cscamp.net/api/status/plays', {
      method: "GET",
      headers: headersList,
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (!(JSON.parse(data.data[0].open)))
          router.push('/dashboard')
      })
      .catch(error => console.error(error))
    const haveCookie = cookies["used"]
    setDisabled(booleanify(haveCookie))
    console.log("used   " + haveCookie)
  }, []);
  const handleSetCookie = (isTrue: boolean) => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 20 * 60 * 1000); // 20 minutes from now

    setCookie("used", isTrue, { maxAge: 20 * 60 });
  };
  const handleGetCookie = (type: string) => {
    const cookieValue = cookies[type];
    console.log('Cookie value:', cookieValue);
    if (cookieValue === undefined) {
      return null;
    }
    return cookieValue
  };
  console.log(cardArr);
  async function buyCard(event: React.MouseEvent<HTMLElement>) {
    event.currentTarget.style.cursor = 'default';
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
      authorization: tokenString
    };
    const body = {
      buff: handleGetCookie('Buff'),
      atk: handleGetCookie('Attack'),
      def: handleGetCookie('Defense')
    }

    let res: {
      code: string,
      message: string
    } = {
      code: "",
      message: ""
    }
    await fetch(`https://api.cscamp.net/api/users/${idUserString}/play`, {
      method: "POST",
      headers: headersList,
      body: JSON.stringify({
        buff: handleGetCookie('Buff'),
        atk: handleGetCookie('Attack'),
        def: handleGetCookie('Defense')
      })
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        res = data
      })
      .catch(error => console.log(error))
    console.log(body);
    handleSetCookie(true)
    // console.log(res)

    if (res.code === "000") {
      alert("successful");
      return;
    }
    else if (res.code === "070") {
      alert("User already use card.");
      // setDisabled(false);
      // removeCookie('used')
      return;
    }
    else if (res.code === "071") {
      alert("User can not play card at this moment.");
      setDisabled(false);
      removeCookie('used')
      return;
    }
    else {
      alert("some error");
    }

    setLoading(false);
  }
  function clearCard() {
    removeCookie('Attack');
    removeCookie('Defense');
    removeCookie('Buff');
    makeList();
    setRefreshCardUser(!refreshCardUser);
    setRefrerefreshMycard(Math.floor(Math.random() * 99999))
  }

  function makeList() {
    let text: string = "";
    text += ((cookies["Attack"] !== undefined) ? cookies["Attack"] + ",    " : " ") + "    "
    text += ((cookies["Defense"] !== undefined) ? cookies["Defense"] + ",    " : " ") + "    "
    text += ((cookies["Buff"] !== undefined) ? cookies["Buff"] : " ") + "    "
    setmyCardList(text)
  }
  useEffect(() => {
    makeList();
  }, [refreshMycard])

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
          Back
        </div>
        <h1 className="text-5xl text-white">คลัง</h1>
        <div className="	w-full		" >
          <div className="bg-slate-200 mx-5 rounded">
            <button
              onClick={clearCard}
              disabled={disabled}
              className=" bg-blue-600 py-2 px-5 text-white right-5 m-3  cursor-pointer rounded"
              style={{
                cursor: disabled ? "default" : "pointer",
                backgroundColor: disabled ? "grey" : "rgb(37, 99, 235)"
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
                backgroundColor: disabled ? "grey" : "rgb(37, 99, 235)"
              }}
            >
              check
            </button>
            List : {myCardList}
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
          className="absolute bg-blue-600 py-2 px-5 text-white left-5 top-5 cursor-pointer rounded"
          style={{
            cursor: disabled ? "default" : "pointer",
            backgroundColor: disabled ? "grey" : "rgb(37, 99, 235)"
          }}

        >
          Use
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        contentLabel="Test Modal"
        closeTimeoutMS={200}
        style={popupStyle}
      >
        <div className="flex flex-col items-center text-center w-full justify-center">
          <div>การ์ดที่ใช้ </div>
          <div></div>
          <div>{myCardList} </div>
          <div></div>
          <div>แน่ใจ ไหม    ไม่ สามารถ แก้ไข ได้ </div>
        </div>

        <div className="flex w-auto justify-between mt-2">
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
