import { GetServerSideProps, NextPage } from "next";
import BoardDisplay from "@/components/boardDisplay";
import Log from "@/components/log";
import { getAllUser } from "@/typings";
import RowUser from "@/components/rowUser";
import { group } from "@/utils/boardLeader";
import { useState } from "react";
import { useRouter } from "next/router";

const AdminDashboard: NextPage<{ groups: getAllUser }> = ({ groups }) => {
  const router = useRouter()
  const [isEvent, setIsEvent] = useState(false);
  return (
    <div className="flex flex-col p-8 h-screen bg-slate-800 space-y-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 h-5/6 md:h-5/6">
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
            {groups.data.map((eachGroup) => {
              return <RowUser groupUser={eachGroup} />;
            })}
            {groups.data.map((eachGroup) => {
              return <RowUser groupUser={eachGroup} />;
            })}
          </div>
        </div>
        <Log messages={[`In Event: ${isEvent}`]} />
      </div>
      <div className="flex h-1/6 md:h-1/6 w-full items-center justify-center text-2xl">
        <button className="bg-pink-400 rounded-l-lg w-1/2 h-full" onClick={() => {router.push("/admin/control")}}>
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
  return {
    props: {
      groups: group,
    },
  };
};
