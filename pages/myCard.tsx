import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Card from "@/components/card";
import { ICard, getCardsResponse } from "@/typings";
import Head from "next/head";
import { useRouter } from "next/router";

const Store: NextPage<{ cardArr: ICard[] }> = ({ cardArr }) => {
  const router = useRouter()
  console.log(cardArr)
  return (
    <div className="flex flex-col items-center bg-[#555555] py-6 gap-4">
      <Head>
        <title>Shop | CS Bootcamp 2023</title>
      </Head>
      <div
        onClick={() => router.back()}
        className="absolute bg-blue-600 py-2 px-5 text-white right-5 top-5 cursor-pointer"
      >
        Back
      </div>
      <h1 className="text-5xl text-white">ร้านค้า</h1>
      <div className="grid grid-cols-2 gap-4 p-4">
        {cardArr.map((e, i) => {
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
  );
};

export default Store;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const CARDS_URL = "https://api.cscamp.net/api/cards"
  let headersList = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "User-Agent": "Thunder Client (https://www.thunderclient.com)"
  }
   
   let response = await fetch(CARDS_URL, { 
     method: "GET",
     headers: headersList
   });
   let dataJson: getCardsResponse = await response.json()
   console.log(`Get card status: ${dataJson.code}`)
   
  return {
    props: {
      cardArr: dataJson.data,
    },
  };
};
