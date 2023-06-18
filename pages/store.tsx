import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Card from "@/components/card";
import { ICard } from "@/typings";
import Head from "next/head";

const Store: NextPage<{ cardArr: ICard[] }> = ({ cardArr }) => {
  return (
    <div className="flex flex-col items-center bg-[#555555] py-6 gap-4">
      <Head>
        <title>Shop | CS Bootcamp 2023</title>
      </Head>
      <Link
        href="/"
        className="absolute bg-blue-600 py-2 px-5 text-white right-5 top-5"
      >
        Back
      </Link>
      <h1 className="text-5xl text-white">ร้านค้า</h1>
      <div className="grid grid-cols-2 gap-4 p-4">
        {cardArr.map((e, i) => {
          return (
            <Card
              key={i}
              id={e.id}
              name={e.name}
              detail={e.detail}
              card_type_id={e.card_type_id}
              price={e.price}
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
  const tempCard = {
    id: "1",
    name: "Example Card",
    detail: "This is an Example Card",
    card_type_id: 0,
    price: 50,
    img_url:
      "https://1.bp.blogspot.com/-agFXet3-wqg/VBTsSI1HkrI/AAAAAAAACWg/4lKOvcczY6E/s1600/การ์ดนางฟ้า.jpg",
  };

  const cardArr = [];
  for (let i = 0; i < 10; i++) {
    cardArr.push(tempCard);
  }

  return {
    props: {
      cardArr,
    },
  };
};
