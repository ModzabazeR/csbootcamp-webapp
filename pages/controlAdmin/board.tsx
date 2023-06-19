import { group, typeRow, updateBoard } from '@/pages/controlAdmin/controlPage'
import React, { useEffect, useState } from 'react';
import Modal from "react-modal";
import Row from './row';

export default function Board() {
    const popupStyle = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
            background: "#D9D9D9",
        },
    };
    const [IsUpDate, setIsUpDate] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        console.log("board Re")
    },[IsUpDate,isOpen])
    function updateGroup() {
        openPopup()
        setIsUpDate(!IsUpDate);
        // setGroupS(groupTemp);
        console.log(group)
    }
    function getGroup() {
        // window.location.reload();
        updateBoard()
        console.log("updatedBoard")
        setIsUpDate(!IsUpDate)
        console.log("IsUpDate")
        closePopup()
        console.log(group)
    }
    const openPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={closePopup}
                contentLabel="Test Modal"
                closeTimeoutMS={200}
                style={popupStyle}
            >
                <div className="flex flex-col items-center text-center h-full w-full justify-center">
                    {
                        group.map(e => {
                            return (
                                // {console.log(e)}
                                <div className=" min-w-[50%] grid grid-cols-3 gap-4 ">
                                    <div >{e.name}</div>
                                    <div >{e.score}</div>
                                    <div>{e.card}</div>
                                </div>
                            )
                        })
                    }
                    <div className="flex w-full justify-between mt-2">
                        <button className="bg-[#ACACAC] px-4 py-2 w-1/2 rounded-l-lg" onClick={closePopup}>close</button>
                        <button className="bg-[#F90000] px-4 py-2 w-1/2 rounded-r-lg"
                            onClick={getGroup}
                        >submit</button>
                    </div>
                </div>
            </Modal>
            <button className="bg-red-200 p-4" onClick={
                updateGroup
            }>
                test
            </button>
            {
                
                group.map(e => {
                    return (
                        <Row element = {e}/>
                    )

                })
            }
        </>
    )
}