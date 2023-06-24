import { group, updateBoard } from "@/utils/boardLeader";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Row from "./row";
import { GetServerSideProps } from "next";
import { getAllUser, upDatePointAll, groupPoint } from "@/typings";

let arrayPoint: groupPoint[] = []
let dataPoint: upDatePointAll = {
  admin: 'string',
  points: [
    {
      user_id: 'None',
      update_point: 5
    }
  ]
}

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
    updateBoard();
  }, [])
  useEffect(() => {
    console.log("board Re");
  }, [isUpdate]);
  // getGroup()
  const updateGroup = () => {
    arrayPoint = [];
    for (var val of group.data) {
      let arr: groupPoint = {
        user_id: val.id,
        update_point: val.point
      }
      arrayPoint.push(arr);
      console.log(arrayPoint);
    }
    openPopup();
    // setIsUpdate(!isUpdate);
    // setGroupS(groupTemp);
    console.log(group);
  }
  const refresh = async () => {
    await updateBoard();
    setIsUpdate(!isUpdate);
  }

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
    const urlPush: string = "https://api.cscamp.net/api/users/points";
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' ,
      'authentication': 'string' },
      body: JSON.stringify({
        'admin': 'mek',
        'points': arrayPoint
      })
    };
    await fetch(urlPush, requestOptions)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        alert("code : " + response.code);
      });


    getGroup()
  }

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div >
      <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        contentLabel="Test Modal"
        closeTimeoutMS={200}
        style={popupStyle}
      >
        <div className="flex flex-col items-center text-center h-full w-full justify-center">
          {arrayPoint.map((e) => {
            return (
              <div className=" min-w-[50%] grid grid-cols-3 gap-4 ">
                <div>{e.user_id}</div>
                <div>{e.update_point}</div>
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
        <button className="bg-red-200 m-2 p-4 object-center rounded-lg	" onClick={updateGroup}>
          send
        </button>
        <button className="bg-red-200 m-2 p-4 object-center rounded-lg	" onClick={refresh}>
          refresh
        </button>
      </div>
      <div className="sm:text-xl	md:text-4xl" >
        {group.data.map((user) => {
          return <Row groupUser={user} />;
        })}
      </div>

    </div>
  );
};

export default Board;
