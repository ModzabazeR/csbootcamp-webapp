import { group, updateBoard } from "@/utils/boardLeader";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Row from "./row";
import { GetServerSideProps } from "next";
import {
  getAllUser,
  upDatePointAll,
  groupPoint,
  arrayUser,
  scoreSummary,
} from "@/typings";

let arrayPoint: groupPoint[] = [];
let groupCopy: arrayUser[] = [...group.data];
let sumPoint: scoreSummary[] = [];

const Board: React.FC = () => {
  const popupStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    content: {
      background: "#D9D9D9",
    },
  };

  const [isUpdate, setIsUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // getGroup();
  }, []);
  useEffect(() => {
    console.log("board Re");
  }, [isUpdate]);
  // getGroup()
  const updateGroup = () => {
    sumPoint = [];
    arrayPoint = [];
    for (var i = 0; i < groupCopy.length; i++) {
      let addPointV = group.data[i].point - groupCopy[i].point;
      let arr: groupPoint = {
        user_id: group.data[i].id,
        update_point: addPointV,
      };
      let arrSum: scoreSummary = {
        id: group.data[i].id,
        point: groupCopy[i].point,
        addPoint: addPointV,
      };
      sumPoint.push(arrSum);
      arrayPoint.push(arr);
      console.log(arrayPoint);
    }
    openPopup();
    // setIsUpdate(!isUpdate);
    // setGroupS(groupTemp);
    console.log(group);
  };

  const copyData = async () => {
    groupCopy = [];
    for (var item of group.data) {
      let arr: arrayUser = {
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

  async function getGroup() {
    // window.location.reload();
    await updateBoard();
    console.log("updatedBoard");
    setIsUpdate(!isUpdate);
    console.log("isUpdate");
    closePopup();
    console.log(group);
  }

  async function pushData() {
    const tokenString = localStorage.getItem("token") as string;
    console.log(arrayPoint);
    const urlPush: string = "https://api.cscamp.net/api/users/points";
    //authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiYWRtaW4iOnRydWUsImlhdCI6MTY4Nzc5NDU3NywiZXhwIjoxNjg4Mzk5Mzc3fQ.f5H5s5v0Whe5VAFmEuFbDvMzGjkQVlzJViNnKahbs7Q'
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
        console.log(response);
        alert("code : " + response.code);
      });

    getGroup();
  }

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
        contentLabel="Test Modal"
        closeTimeoutMS={200}
        style={popupStyle}
      >
        <div className="flex flex-col items-center text-center h-full w-full justify-center">
          {sumPoint.map((e) => {
            return (
              <div
                key={e.id + "preview"}
                className=" min-w-[50%] grid grid-cols-3 gap-4 "
              >
                <div>{e.id}</div>
                <div>
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

      <div className="flex items-center justify-center ">
        <button
          className="bg-pink-400 m-2 p-4 object-center rounded-lg	"
          onClick={updateGroup}
        >
          send
        </button>
        <button
          className="bg-green-400 m-2 p-4 object-center rounded-lg	"
          onClick={refresh}
        >
          refresh
        </button>
      </div>
      <div className="sm:text-xl	md:text-4xl">
        <div className="block w-full text-center">
          <div className=" grid grid-cols-3 gap-4 ">
            <div className="pl-5">{`ชื่อกลุ่ม`}</div>
            <div className="border-x-2	px-5 border-x-black	">
              <div className="relative ">คะแนน</div>
            </div>
            <div>จำนวนการ์ดที่มี </div>
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
