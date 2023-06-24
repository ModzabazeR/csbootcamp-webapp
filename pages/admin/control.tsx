import { useEffect, useState } from "react";
import Switch from "@/components/switch";
import Board from "@/components/boardControl";
import { getData, updateBoard } from "@/utils/boardLeader";
import { GetServerSideProps, NextPage } from "next";
import router from "next/router";
import { getAllUser } from "@/typings";

const Page: NextPage = () => {
  useEffect(() => {
    // console.log("main page");
  }, []);


  return (
    <div
      key="controlPage"
      className="overflow-scroll p-3 h-screen justify-center items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
    >
      <div
        onClick={() => router.back()}
        className="absolute bg-blue-600 py-2 px-5 text-white right-5 top-5 cursor-pointer rounded"
      >
        Back
      </div>
      <div className="flex w-full h-1/4 justify-center items-center bg-purple-200	rounded">
        <Switch
          key={0}
          id2="BuyCardBtn"
          name="buy card"
          url="https://api.cscamp.net/api/settings/shops"
        />
        <Switch
          key={1}
          id2="UseCardBtn"
          name="use card"
          url="https://api.cscamp.net/api/settings/plays"
        />
      </div>
      <div className="overflow-scroll mt-3 flex w-full h-auto justify-center items-center bg-purple-100 rounded">    
          <Board />
      </div>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const USER_URL = "https://jsonplaceholder.typicode.com/todos/1";
//   let headersList = {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     "User-Agent": "Thunder Client (https://www.thunderclient.com)",
//   };

//   // await updateBoard();

//   // let response = await fetch(USER_URL, {
//   //   method: "GET",
//   //   headers: headersList,
//   // });
//   // let dataJson: getAllUser = await response.json();
//   // console.log(`Get card status: ${dataJson}`);
  
//   return {
//     props: {
//       groups: group,
//     },
//   };
// };


export default Page;
