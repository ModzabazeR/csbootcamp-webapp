import { GetServerSideProps, NextPage } from "next";
import BoardDisplay from "@/components/boardDisplay";
import Log from "@/components/log";
import { getAllUser } from "@/typings";
import RowUser from "@/components/rowUser";
import { group } from "@/utils/boardLeader";
import { useState } from "react";

const AdminDashboard: NextPage<{ groups: getAllUser }> = ({ groups }) => {
  const [isEvent, setIsEvent] = useState(false)
  return (
    <div className="p-8 flex gap-8 h-screen bg-slate-800">
      <div className="w-4/6">
        <div className="overflow-auto rounded-lg bg-slate-200 flex flex-col items-center justify-start h-full divide-y-2 divide-slate-400/25">
          <div className="block w-full sm:text-xl	md:text-4xl" key="user_id">
            <div className="grid grid-cols-3 gap-2 justify-items-center p-4 font-bold">
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
      <Log />
    </div>
  );
};

export default AdminDashboard;


export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      groups: group
    }
  }
}