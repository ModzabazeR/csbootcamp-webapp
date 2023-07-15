import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useCookies } from "react-cookie";
import Modal from "react-modal";

import { IGroupPointUpdate, IUser, IScoreSummary } from "@/typings";
import { group, updateBoard } from "@/utils/boardLeader";

import Row from "./row";

let arrayPoint: IGroupPointUpdate[] = [];
let groupCopy: IUser[] = [...group.data];
let sumPoint: IScoreSummary[] = [];

const Board: React.FC = () => {
  const popupStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    content: {
      background: "#D9D9D9",
    },
  };

  const router = useRouter();
  const [cookies] = useCookies();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("Board Re");
  }, [isUpdate]);

  const updateGroup = () => {
    sumPoint = [];
    arrayPoint = [];

    for (let i = 0; i < groupCopy.length; i++) {
      let addPointV = group.data[i].point - groupCopy[i].point;

      let arr: IGroupPointUpdate = {
        user_id: group.data[i].id,
        update_point: addPointV,
      };

      let arrSum: IScoreSummary = {
        id: group.data[i].id,
        point: groupCopy[i].point,
        addPoint: addPointV,
      };

      sumPoint.push(arrSum);
      arrayPoint.push(arr);
    }

    openPopup();
  };

  const copyData = async () => {
    groupCopy = [];
    for (let item of group.data) {
      let arr: IUser = {
        id: item.id,
        point: item.point,
        admin: item.admin,
        card_count: item.card_count,
      };
      groupCopy.push(arr);
    }
  };

  const refresh = async () => {
    await updateBoard();
    copyData();
    setIsUpdate(!isUpdate);
  };

  const getGroup = async () => {
    await updateBoard();
    console.log("Updated Board");

    setIsUpdate(!isUpdate);
    closePopup();
  };

  const pushData = async () => {
    const tokenString = cookies["token"];

    const urlPush: string = "https://api.cscamp.net/api/users/points";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: tokenString,
      },
      body: JSON.stringify({
        admin: "mek",
        points: arrayPoint,
      }),
    };

    await fetch(urlPush, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        if (response.code !== "000") {
          alert(response.message);
        } else {
          alert("success");
        }
      });

    getGroup();
    router.reload();
  };

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        contentLabel="Update Point"
        closeTimeoutMS={200}
        style={popupStyle}
      >
        <div className="flex flex-col items-center text-center h-full w-full justify-center">
          {sumPoint.map((e) => {
            return (
              <div
                key={e.id + "preview"}
                className="min-w-[50%] grid grid-cols-3 gap-4"
              >
                <div>{e.id}</div>
                <div className="text-left">
                  from {e.point} + {e.addPoint} = {e.point + e.addPoint}
                </div>
              </div>
            );
          })}
          <div className="flex w-full justify-between mt-2">
            <button
              className="bg-[#ACACAC] px-4 py-2 w-1/2 rounded-l-lg"
              onClick={closePopup}
            >
              close
            </button>
            <button
              className="bg-[#F90000] px-4 py-2 w-1/2 rounded-r-lg"
              onClick={pushData}
            >
              submit
            </button>
          </div>
        </div>
      </Modal>

      <div className="flex items-center justify-center">
        <button
          className="bg-pink-400 m-2 p-4 object-center rounded-lg"
          onClick={updateGroup}
        >
          send
        </button>
        <button
          className="bg-green-400 m-2 p-4 object-center rounded-lg"
          onClick={refresh}
        >
          refresh
        </button>
      </div>
      <div className="sm:text-xl md:text-4xl">
        <div className="block w-full text-center">
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-center pr-10 pl-5">ชื่อกลุ่ม</div>
            <div className="border-x-2 px-5 border-x-black">
              <div className="text-center">คะแนน</div>
            </div>
            <div>จำนวนการ์ดที่มี</div>
          </div>
        </div>
        {group.data.map((user) => {
          return <Row key={user.id + " idUser"} groupUser={user} />;
        })}
      </div>
    </div>
  );
};

export default Board;
