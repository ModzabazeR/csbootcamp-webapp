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

const Store: NextPage<{ cardArr: ICard[] }> = ({ cardArr }) => {
  const [filteredCardArr, setFilteredCardArr] = useState<ICard[]>(cardArr);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies();
  const router = useRouter();
  const booleanify = (value: string): boolean => {
    const truthy: string[] = [
        'true',
        'True',
        '1'
    ]

    return truthy.includes(value)
}
  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    let validate: boolean = varlidateToken(tokenString);
    if (validate === null) {
      router.push('/login')
    }
    else if(validate === true) {
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
    .then((dataJson : getUserByIdResponse)=> {
      setFilteredCardArr(dataJson.data.cards)
    })
    const haveCookie = cookies["bought"]
    setDisabled(booleanify(haveCookie))
    console.log("bought   "+haveCookie)
  }, []);
  const  handleSetCookie = () => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 20 * 60 * 1000); // 20 minutes from now

    setCookie( "bought", true, { maxAge: 20 * 60  });
  };
  const handleGetCookie = (type : string) => {
    const cookieValue = cookies[type];
    console.log('Cookie value:', cookieValue);
    if ( cookieValue === undefined){
      return null;
    }
    return cookieValue
  };
  console.log(cardArr);
  async function buyCard(event: React.MouseEvent<HTMLElement>) {
    setDisabled(true);
    const tokenString = localStorage.getItem("token") as string;
    console.log("clicki");
    setLoading(true);
    event.currentTarget.style.cursor = "wait";
    let headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      authentication : tokenString
    };
    const body = {
      buff : handleGetCookie('Buff'),
        atk: handleGetCookie('Attack'),
        def : handleGetCookie('Defense')}
    const idUserString = localStorage.getItem("idUser")
    // let response = await fetch(`https://api.cscamp.net/api/users/${idUserString}/play`, {
    //   method: "POST",
    //   headers: headersList,
    //   body: JSON.stringify({
    //     buff : handleGetCookie('Buff'),
    //     atk: handleGetCookie('Attack'),
    //     def : handleGetCookie('Defense')
    //   })
    // });
    // let getdata = await response.json();
    console.log(body);
    handleSetCookie()
    // console.log(event)
    // event.currentTarget.style.cursor =  'default';
    alert("successful");
    setLoading(false);
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center bg-[#555555] py-6 gap-4">
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
              />
            );
          })}
        </div>
        <button
        disabled={disabled}
          onClick={buyCard}
          className="absolute bg-blue-600 py-2 px-5 text-white left-5 top-5 cursor-pointer rounded"
          style={{ cursor: disabled ? "default" : "pointer",}}
        >
          Use
        </button>
      </div>
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
