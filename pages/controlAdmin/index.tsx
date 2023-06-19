import { useEffect, useState } from "react";
import Switch from "@/components/switch";
import Board from "@/components/board";
import { group, updateBoard } from "@/utils/controlPage";

function page() {
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
      <div className="flex w-full h-auto justify-center items-center bg-purple-100">
        <div id="boxControl" className="grid grid-cols-1 gap-4">
          <Board />
        </div>
      </div>
    </div>
  );
}

export default page;
