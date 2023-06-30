import { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import { motion } from "framer-motion";

import { ICard, getCardsResponse, getUserByIdResponse } from "@/typings";
import { getUserJson, validateToken } from "@/utils/validateAdmin";

import Card from "@/components/card";

const Store: NextPage<{ cardArr: ICard[] }> = ({ cardArr }) => {
  const [refreshCardUser, setRefreshCardUser] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [filteredCardArr, setFilteredCardArr] = useState<ICard[]>(cardArr);
  const router = useRouter();

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
        let cardGet: ICard[] = dataJson.data.cards;
        const filteredCards = cardArr.filter(
          (e1) => !cardGet.some((e2) => e2.id === e1.id)
        );
        setFilteredCardArr(filteredCards);
      });

    fetch("https://api.cscamp.net/api/status/shops", {
      method: "GET",
      headers: headersList,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!JSON.parse(data.data[0].open)) {
          router.push("/dashboard");
        } else {
          setIsPageLoaded(true);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center bg-slate-800 py-6 gap-4">
        <Head>
          <title>Shop | CS Bootcamp 2023</title>
        </Head>
        <div
          onClick={() => router.back()}
          className="absolute bg-blue-600 py-2 px-5 text-white right-5 top-5 cursor-pointer rounded"
        >
          กลับ
        </div>
        <h1 className="text-5xl text-white">ร้านค้า</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {filteredCardArr.map((e, i) => {
            return (
              <Card
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
      </div>
    </motion.div>
  );
};

export default Store;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const CARDS_URL = "https://api.cscamp.net/api/shops";
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
