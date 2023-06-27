import CardManual from "@/components/cardManual";
import { ICard, getCardsResponse } from "@/typings";
import { motion } from "framer-motion";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Manual: NextPage<{ cardArr: ICard[] }> = ({ cardArr }) => {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center bg-slate-800 py-6 gap-4">
        <Head>
          <title>คู่มือ | CS Bootcamp 2023</title>
        </Head>
        <div
          onClick={() => router.back()}
          className="absolute bg-blue-600 py-2 px-5 text-white right-5 top-5 cursor-pointer rounded"
        >
          กลับ
        </div>
        <h1 className="text-5xl text-white">คู่มือ</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {cardArr.map((e, i) => {
            return (
              <CardManual
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

export default Manual;

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
