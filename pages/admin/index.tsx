import { GetServerSideProps, NextPage } from "next";
import Log from "@/components/log";
import {
  getAllUser,
  getLogBuyResponse,
  getLogEventResponseNew,
} from "@/typings";
import RowUser from "@/components/rowUser";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { varlidateToken } from "@/utils/validateAdmin";
import { IoLogOut } from "react-icons/io5";
let countRefresh = 0;
const AdminDashboard: NextPage<{
  groups: getAllUser;
  logMessages: string[];
  dataJsonEvenGroup: getLogEventResponseNew;
}> = ({ groups, logMessages, dataJsonEvenGroup }) => {
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [defaultValue, setDefaultValue] = useState(0);
  const [filteredData, setFilteredData] = useState<string[]>(logMessages);
  const router = useRouter();

  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    let validate: boolean = varlidateToken(tokenString);
    if (validate === null) {
      router.push("/login");
    } else if (validate === false) {
      router.push("/dashboard");
    } else if (validate === true) {
      setIsPageLoaded(true)
    }
  }, []);

  const [refreshedGroups, setRefreshedGroups] = useState(groups);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Fetch the updated groups data
      fetchGroupsData();
      // console.log(countRefresh++)
    }, 1000); // Refresh every 1 second

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchGroupsData = async () => {
    try {
      const headersList = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      };

      const responseAllGroup = await fetch(
        "https://api.cscamp.net/api/users/",
        {
          method: "GET",
          headers: headersList,
        }
      );

      const dataJsonAllGroup: getAllUser = await responseAllGroup.json();
      dataJsonAllGroup.data.sort((a, b) => {
        return b.point - a.point;
      });

      setRefreshedGroups(dataJsonAllGroup);
    } catch (error) {
      console.error("Error fetching groups data:", error);
    }
  };

  const handleChange = (event: any) => {
    setDefaultValue(event.target.value);
    let dataJsonEvenGroupCopy: getLogEventResponseNew["data"] =
      dataJsonEvenGroup.data.filter(
        (e) => Number(e.id) >= Number(event.target.value)
      );
    console.log(dataJsonEvenGroupCopy);
    const logBuyMessages: string[] = [];
    for (let i = 0; i < dataJsonEvenGroupCopy.length; i++) {
      let cur = dataJsonEvenGroupCopy[i];
      let at_cardName: string =
        cur.at_card_id === null ? "none" : cur.at_card_id.name;
      let bf_cardName: string =
        cur.bf_card_id === null ? "none" : cur.bf_card_id.name;
      let df_cardName: string =
        cur.df_card_id === null ? "none" : cur.df_card_id.name;
      logBuyMessages.push(
        `id:${cur.id} date: ${cur.date_time} - (Group) ${cur.user_id}\n\n` +
        ` use at_card ${at_cardName} \n
      use bf_card ${bf_cardName} \n use bf_card ${df_cardName} \n target is ${cur.target_id} \n detail ${cur.detail}`
      );
    }
    setFilteredData(logBuyMessages);
    // let arrCopy: getAllUser[] = refreshedGroups
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col p-8 h-screen bg-slate-800 space-y-4">
        <div
          onClick={() => {
            localStorage.removeItem("token");
            router.back();
          }}
          className="absolute bg-blue-600/25 p-4 backdrop-blur-md text-white right-5 top-5 cursor-pointer rounded-xl hover:backdrop-blur-sm transition-all drop-shadow border border-white hover:border-none"
          title="Log out"
        >
          <IoLogOut className="text-xl font-bold" />
        </div>
        <div className="flex flex-col md:flex-row gap-4 h-5/6 md:h-5/6">
          <div className="w-full md:w-11/12 h-1/2 md:h-full">
            <div className="overflow-auto rounded-lg bg-slate-200 flex flex-col items-center justify-start h-full divide-y-2 divide-slate-400/25">
              <div
                className="block w-full sm:text-xl md:text-4xl"
                key="user_id"
              >
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
                    isFromAdmin={true}
                  />
                );
              })}
            </div>
          </div>
          <div className="rounded-lg md:w-9/12	 h-1/2 sm:w-full md:h-full bg-slate-100 overflow-auto p-2">
            <input
              name="id"
              value={defaultValue}
              type="text"
              id="id"
              className="my-2 block w-full p-4 pl-10 text-center dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg"
              placeholder="ID"
              onChange={(event) => handleChange(event)}
            ></input>
            <Log messages={filteredData} />
          </div>
        </div>
        <div className="flex h-1/6 md:h-1/6 w-full items-center justify-center  text-center  text-2xl gap-4">
          <button
            className="bg-pink-400 rounded-lg w-full h-full"
            onClick={() => {
              router.push("/admin/control");
            }}
          >
            Control
          </button>
          <button
            className="bg-yellow-300 rounded-lg w-full h-full"
            onClick={() => {
              router.push("/manual");
            }}
          >
            คู่มือ
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const headersList = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  };

  const responseAllGroup = await fetch("https://api.cscamp.net/api/users/", {
    method: "GET",
    headers: headersList,
  });

  const dataJsonAllGroup: getAllUser = await responseAllGroup.json();
  dataJsonAllGroup.data.sort((a, b) => {
    return b.point - a.point;
  });

  const responseEvenGroup = await fetch(
    "https://api.cscamp.net/api/logs/events",
    {
      method: "GET",
      headers: headersList,
    }
  );

  const dataJsonEvenGroup: getLogEventResponseNew =
    await responseEvenGroup.json();
  dataJsonEvenGroup.data.sort((a, b) => a.id - b.id);

  const logBuyMessages: string[] = [];
  for (let i = 0; i < dataJsonEvenGroup.data.length; i++) {
    let cur = dataJsonEvenGroup.data[i];
    let at_cardName: string =
      cur.at_card_id === null ? "none" : cur.at_card_id.name;
    let bf_cardName: string =
      cur.bf_card_id === null ? "none" : cur.bf_card_id.name;
    let df_cardName: string =
      cur.df_card_id === null ? "none" : cur.df_card_id.name;
    logBuyMessages.push(
      `id:${cur.id} date: ${cur.date_time} - (Group) ${cur.user_id}\n\n` +
      ` use at_card ${at_cardName} \n use bf_card ${bf_cardName} \n use bf_card ${df_cardName} \n target is ${cur.target_id} \n detail ${cur.detail}`
    );
  }

  return {
    props: {
      groups: dataJsonAllGroup,
      logMessages: logBuyMessages as string[],
      dataJsonEvenGroup: dataJsonEvenGroup, // Pass the serialized object instead of responseEvenGroup
    },
  };
};
