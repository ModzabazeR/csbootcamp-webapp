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
    <div className="flex flex-col h-screen justify-start items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
      <div className="flex flex-col items-center justify-center h-32">
        <span className="text-2xl">You score</span>
        <span className="text-3xl">{user.id}</span>
      </div>
      <div className="grow w-max">
        <div className="grow overflow-scroll rounded-lg bg-slate-200 flex flex-col items-center justify-start max-h-[32rem]	">
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
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-14">
              ร้านค้า
            </button>
          </Link>
          <Link href="/myCard">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-14">
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
