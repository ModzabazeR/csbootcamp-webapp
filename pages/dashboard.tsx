import { useEffect, useRef, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import { animate, motion } from "framer-motion";
import { IoLogOut } from "react-icons/io5";
import { useCookies } from "react-cookie";

import {
  getUsersResponse,
  getUserByIdResponse,
  IUserCredentials,
} from "@/typings";
import { getGroupName } from "@/utils/userUtils";
import { getAppCookies, getUserJson } from "@/utils/validateAdmin";

import RowUser from "@/components/rowUser";

let countRefresh = 0;
const Page: NextPage<{
  profile: IUserCredentials | null;
  groups: getUsersResponse;
}> = ({ profile, groups }) => {
  const router = useRouter();
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isPlayOpen, setIsPlayOpen] = useState(false);
  const [updateUser, setupdateUser] = useState(false);
  const [refreshedGroups, setRefreshedGroups] = useState(groups);
  const [user, setUser] = useState<getUserByIdResponse>({
    code: "000",
    data: {
      id: "G99",
      point: 0,
      admin: 0,
      cards: [],
    },
  });
  const [cookies, setCookie, removeCookie] = useCookies()

  useEffect(() => {
    if (profile === null) {
      router.push("/login");
      return;
    } else if (profile.admin === true) {
      router.push("/admin");
    }

    const idUserString = profile.username;
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
        setUser(dataJson);
        setupdateUser((prevState) => !prevState);
      });

    fetch("https://api.cscamp.net/api/status/shops", {
      method: "GET",
      headers: headersList,
    })
      .then((res) => res.json())
      .then((data) => setIsShopOpen(JSON.parse(data.data[0].open)))
      .catch((error) => console.log(error));

    fetch("https://api.cscamp.net/api/status/plays", {
      method: "GET",
      headers: headersList,
    })
      .then((res) => res.json())
      .then((data) => setIsPlayOpen(JSON.parse(data.data[0].open)))
      .catch((error) => console.log(error));
  }, []);

  const fetchGroupsData = async () => {
    const ALLUSER_URL_INSIZE = "https://api.cscamp.net/api/users/";
    let headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    };

    let responseAllgroup = await fetch(ALLUSER_URL_INSIZE, {
      method: "GET",
      headers: headersList,
    });

    let dataJsonAllGroup: getUsersResponse = await responseAllgroup.json();

    dataJsonAllGroup.data.sort((a, b) => {
      return b.point - a.point;
    });

    setRefreshedGroups(dataJsonAllGroup);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Fetch the updated groups data
      fetchGroupsData();
    }, 1000); // Refresh every 1 second

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex h-screen items-center justify-center bg-slate-800">
        <div
          onClick={() => {
            removeCookie("token");
            router.back();
          }}
          className="absolute bg-blue-600/25 p-4 backdrop-blur-md text-white right-5 top-5 cursor-pointer rounded-xl hover:backdrop-blur-sm transition-all drop-shadow"
          title="Log out"
        >
          <IoLogOut className="text-xl font-bold" />
        </div>
        <div className="flex flex-col h-full gap-4 py-8 w-5/6">
          <div className="flex flex-col items-center justify-center sm:text-xl	md:text-4xl text-white h-1/6">
            <span className="text-xl">
              คะแนนของทีม {getGroupName(user.data.id)}
            </span>
            <Counter from={0} to={user.data.point} />
          </div>
          <div className="overflow-auto rounded-lg bg-slate-200 flex flex-col items-center h-4/6 divide-y-2 divide-slate-400/25">
            <div className="block w-full sm:text-xl	md:text-4xl" key="user_id">
              <div className="grid grid-cols-3 gap-2 text-center justify-items-center p-4 font-bold">
                <div>ชื่อกลุ่ม</div>
                <div>คะแนน</div>
                <div>จำนวนการ์ด</div>
              </div>
            </div>
            {refreshedGroups.data.map((eachGroup) => {
              return (
                <RowUser
                  groupUser={eachGroup}
                  key={eachGroup.id}
                  isFromAdmin={false}
                />
              );
            })}
          </div>
          <div className="flex py-4 text-center gap-4 w-full h-1/6">
            {isShopOpen && (
              <Link
                href="/store"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-5 px-4 rounded sm:text-xl	md:text-4xl w-full transition-all duration-150"
              >
                ร้านค้า
              </Link>
            )}
            {isPlayOpen && (
              <Link
                href="/myCard"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-5 px-4 rounded sm:text-xl	md:text-4xl w-full  transition-all duration-15"
              >
                ใช้การ์ด
              </Link>
            )}
            <Link
              href="/manual"
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold p-5 px-4 rounded sm:text-xl	md:text-4xl w-full  transition-all duration-15"
            >
              คู่มือ
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default Page;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const ALLUSER_URL = "https://api.cscamp.net/api/users/";
  let headersList = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  };

  let responseAllgroup = await fetch(ALLUSER_URL, {
    method: "GET",
    headers: headersList,
  });

  let dataJsonAllGroup: getUsersResponse = await responseAllgroup.json();

  dataJsonAllGroup.data.sort((a, b) => {
    return b.point - a.point;
  });

  const { token } = getAppCookies(req);
  const profile = getUserJson(token);

  return {
    props: {
      profile,
      groups: dataJsonAllGroup,
    },
  };
};

const Counter: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node!.textContent = value.toFixed(0);
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <span className="text-7xl" ref={nodeRef} />;
};
