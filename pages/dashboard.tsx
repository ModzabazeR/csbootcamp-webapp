import { getAllUser, getUserByIdResponse } from "@/typings";
import { GetServerSideProps, NextPage } from "next";
import { updateBoard } from "@/utils/boardLeader";
import RowUser from "@/components/rowUser";
import Link from "next/link";
import router from "next/router";
import { getGroupName } from "@/utils/userUtils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { varlidateToken } from "@/utils/validateAdmin";
import { useCookies } from 'react-cookie'

const Page: NextPage<{ user: any; groups: getAllUser }> = ({
  groups
}) => {
  const [updateUser, setupdateUser] = useState(false);
  const [user, setUser] = useState<getUserByIdResponse>({
    code: "000",
    data: {
      id: "G99",
      point: 0,
      admin: 0,
      cards: []
    }
  });

  useEffect(() => {
    const idUserString = localStorage.getItem("idUser");
    const USER_URL = `https://api.cscamp.net/api/users/${idUserString}`;
    console.log(USER_URL)
    let headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    };
    const tokenString = localStorage.getItem("token");
    let validate: boolean = varlidateToken(tokenString);
    if (validate === null || idUserString === null) {
      router.push('/login')
    }
    else if (validate === false) {
      router.push('/dashboard')
    }
    else if (validate === true) {
      router.push('/admin')
    }
    fetch(USER_URL, {
      method: "GET",
      headers: headersList,
    }).then(data => data.json())
      .then((dataJson : getUserByIdResponse) => {
        setUser(dataJson);
        setupdateUser(prevState => !prevState);
      })
  }, []);
  console.log(groups);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
        <div
          onClick={() => {
            localStorage.removeItem("token");
            router.back()
          }}
          className="absolute bg-blue-600 py-2 px-5 text-white right-5 top-5 cursor-pointer rounded"
        >
          Log out
        </div>
        <div className="flex flex-col h-full gap-4 py-8 w-5/6">
          <div className="flex flex-col items-center justify-center sm:text-xl	md:text-4xl text-white h-1/6">
            <span className="text-xl">คะแนนของทีม {getGroupName(user.data.id)}</span>
            <span className="text-7xl">{user.data.point}</span>
          </div>
          <div className="overflow-auto rounded-lg bg-slate-200 flex flex-col items-center h-4/6 divide-y-2 divide-slate-400/25">
            <div className="block w-full sm:text-xl	md:text-4xl" key="user_id">
              <div className="grid grid-cols-3 gap-2 text-center justify-items-center p-4 font-bold">
                <div>ชื่อกลุ่ม</div>
                <div>คะแนน</div>
                <div>จำนวนการ์ด</div>
              </div>
            </div>
            {groups.data.map((eachGroup) => {
              return (
                <RowUser
                  groupUser={eachGroup}
                  key={eachGroup.id}
                  isFromAdmin={false}
                />
              );
            })}
          </div>
          <div className="content-center text-center grid grid-cols-2 row-start gap-4 justify-items-center w-full h-1/6">
            <Link
              href="/store"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-5 px-4 rounded sm:text-xl	md:text-4xl w-full transition-all duration-150"
            >
              ร้านค้า
            </Link>
            <Link
              href="/myCard"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-5 px-4 rounded sm:text-xl	md:text-4xl w-full  transition-all duration-15"
            >
              ใช้การ์ด
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {

  const ALLUESR_URL = "https://api.cscamp.net/api/users/";
  let headersList = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  };
  let responseAllgroup = await fetch(ALLUESR_URL, {
    method: "GET",
    headers: headersList,
  });
  let dataJsonAllGroup: getAllUser = await responseAllgroup.json();

  dataJsonAllGroup.data.sort((a, b) => {
    return b.point - a.point;
  });

  return {
    props: {
      groups: dataJsonAllGroup
    },
  };
};
