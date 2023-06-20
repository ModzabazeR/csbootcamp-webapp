import { useEffect, useState } from "react";
import Switch from "@/components/switch";
import Board from "@/components/board";
import { group, updateBoard } from "@/utils/controlPage";
import { NextPage } from "next";

const Page: NextPage = () => {
  useEffect(() => {
    // console.log("main page");
  }, []);

  return (
    <div
      key="controlPage"
      className="p-3 h-screen justify-center items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
    >
      <div className="flex w-full h-1/4 justify-center items-center bg-purple-200	">
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
      <div className="mt-3 flex w-full h-auto justify-center items-center bg-purple-100">    
          <Board />
      </div>
    </div>
  );
}

export default Page;
