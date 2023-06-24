import { GetServerSideProps, NextPage } from "next";
import Log from "@/components/log";
import { getAllUser, getLogBuyResponse, getLogEventResponse } from "@/typings";
import RowUser from "@/components/rowUser";
import { group } from "@/utils/boardLeader";
import { useState } from "react";
import { useRouter } from "next/router";

const AdminDashboard: NextPage<{ groups: getAllUser, logMessages: string[] }> = ({ groups, logMessages }) => {
  const router = useRouter();
  const [isEvent, setIsEvent] = useState(false);
  return (
    <div className="flex flex-col p-8 h-screen bg-slate-800 space-y-4">
      <div className="flex flex-col md:flex-row gap-4 h-5/6 md:h-5/6">
        <div className="w-full md:w-4/6 h-1/2 md:h-full">
          <div className="overflow-auto rounded-lg bg-slate-200 flex flex-col items-center justify-start h-full divide-y-2 divide-slate-400/25">
            <div className="block w-full sm:text-xl	md:text-4xl" key="user_id">
              <div className="grid grid-cols-3 gap-2 text-center justify-items-center p-4 font-bold">
                <div>ชื่อกลุ่ม</div>
                <div>คะแนน</div>
                <div>จำนวนการ์ด</div>
              </div>
            </div>
            {groups.data.map((eachGroup) => {
              return <RowUser groupUser={eachGroup} />;
            })}
          </div>
        </div>
        <Log messages={logMessages} />
      </div>
      <div className="flex h-1/6 md:h-1/6 w-full items-center justify-center text-2xl">
        <button
          className="bg-pink-400 rounded-l-lg w-1/2 h-full"
          onClick={() => {
            router.push("/admin/control");
          }}
        >
          Control
        </button>
        <button
          className="bg-green-400 rounded-r-lg w-1/2 h-full"
          onClick={() => {
            setIsEvent(true);
          }}
        >
          Start Event
        </button>
      </div>
    </div>
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

  const logBuyResponse: getLogBuyResponse = {
    code: "000",
    data: [
      {
        id: "001",
        user_id: "G01",
        card_id: "1",
        date_time: "2023-01-01 10:10:10",
      },
      {
        id: "002",
        user_id: "G01",
        card_id: "2",
        date_time: "2022-01-05 12:11:09",
      },
      {
        id: "003",
        user_id: "G02",
        card_id: "1",
        date_time: "2023-01-01 10:10:12",
      },
    ],
  };

  logBuyResponse.data.sort((a, b) => new Date(a.date_time).getTime() - new Date(b.date_time).getTime())
  const logBuyMessages = []
  for (let i = 0; i < logBuyResponse.data.length; i++) {
    let cur = logBuyResponse.data[i]
    logBuyMessages.push(`${cur.date_time} - (Buy) ${cur.user_id} bought card ${cur.card_id}.`)
  }

  return {
    props: {
      groups: dataJsonAllGroup,
      logMessages: logBuyMessages,
    },
  };
};
