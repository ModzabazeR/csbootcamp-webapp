import { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import router from "next/router";

import { motion } from "framer-motion";

import { IUserCredentials } from "@/typings";
import { getAppCookies, getUserJson } from "@/utils/validateAdmin";

import Switch from "@/components/switch";
import Board from "@/components/boardControl";

const Page: NextPage<{ profile: IUserCredentials | null }> = ({ profile }) => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    if (profile === null) {
      router.push("/login");
    } else if (profile.admin === false) {
      router.push("/dashboard");
    } else if (profile.admin === true) {
      setIsPageLoaded(true);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        key="controlPage"
        className="overflow-scroll p-3 h-screen justify-center items-center bg-slate-800"
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
            url="https://api.cscamp.net/api/status/shops"
          />
          <Switch
            key={1}
            id2="UseCardBtn"
            name="use card"
            url="https://api.cscamp.net/api/status/plays"
          />
        </div>
        <div
          key="board"
          className="overflow-scroll mt-3 flex w-full h-auto justify-center items-center bg-purple-100 rounded"
        >
          <Board />
        </div>
      </div>
    </motion.div>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = getAppCookies(req);
  const profile = getUserJson(token);
  return {
    props: {
      profile,
    },
  };
};
