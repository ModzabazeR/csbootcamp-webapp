import { getAllUser, getUserByIdResponse } from "@/typings";
import { GetServerSideProps, NextPage } from "next";
import { group } from "@/utils/controlPage";
import RowUser from "@/components/rowUser";
import Link from "next/link";

const Page: NextPage<{ user: any; groups: getAllUser }> = ({
  user,
  groups,
}) => {
  console.log(user);
  return (
    <div className="overflow-scroll flex flex-col h-screen justify-start items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
      <div className="flex flex-col items-center justify-center h-32 sm:text-xl	md:text-4xl">
        <span className="">You score</span>
        <span className="">{user.id}</span>
      </div>
      <div className="grow w-max">
        <div className="grow overflow-scroll rounded-lg bg-slate-200 flex flex-col items-center justify-start sm:max-h-[32rem] md:max-h-[50rem]	m-3 max-w-max	">
          <div className="block w-full sm:text-xl	md:text-4xl" key='user_id'>
            <div className=" grid grid-cols-3 gap-2 justify-items-center">
              <div >ชื่อกลุ่ม</div>
              <div >คะแนน</div>
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
          {groups.data.map((eachGroup) => {
            return <RowUser groupUser={eachGroup} />;
          })}
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
      <div>
        <div className="content-center grid grid-cols-2 row-start gap-8 justify-items-center h-32">
          <Link href="/store">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-5 px-4 rounded h-auto sm:text-xl	md:text-4xl">
              ร้านค้า
            </button>
          </Link>
          <Link href="/myCard">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-5 px-4 rounded h-auto sm:text-xl	md:text-4xl">
              ใช้การ์ด
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const USER_URL = "https://jsonplaceholder.typicode.com/todos/1";
  let headersList = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  };

  let response = await fetch(USER_URL, {
    method: "GET",
    headers: headersList,
  });
  let dataJson: getUserByIdResponse = await response.json();
  console.log(`Get card status: ${dataJson}`);

  return {
    props: {
      user: dataJson,
      groups: group,
    },
  };
};
