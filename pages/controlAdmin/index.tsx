import { useEffect, useState } from 'react';
import Swich from '@/pages/controlAdmin/switch';
import Board from '@/pages/controlAdmin/board'
import { group } from '@/pages/controlAdmin/controlPage'
import Modal from "react-modal";

function page() {
    const [IsUpDate, setIsUpDate] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const popupStyle = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
            background: "#D9D9D9",
        },
    };
    useEffect(() => {
        const buycard = document.getElementById('BuyCardBtn',) as HTMLInputElement | null;
        const usecard = document.getElementById('UseCardBtn',) as HTMLInputElement | null;
        buycard?.addEventListener("click", buyYet)
        usecard?.addEventListener("click", useYet)
        function buyYet() {
            if (buycard != null) {
                if (buycard.checked) {
                    console.log("checked")
                }
                else if (buycard.checked) {
                    console.log("not yet check")
                }
            }
        }
        function useYet() {
            if (usecard != null) {
                if (usecard.checked) {
                    console.log("checked")
                }
                else if (usecard.checked) {
                    console.log("not yet check")
                }
            }
        }
        console.log("poup" + isOpen);
        return () => {
            buycard?.removeEventListener("click", buyYet)
            usecard?.removeEventListener("click", useYet)
            console.log("cleaned up")
        }
    },)
    function updateGroup() {
        group.push({
            name: 'C',
            score: 78,
            card: 777
        })
        group[1] = {
            name: 'B',
            score: 789999999,
            card: 777
        }
        openPopup()
        setIsUpDate(!IsUpDate);
        // setGroupS(groupTemp);
        console.log(group)
    }
    const openPopup = () => {
        setIsOpen(true);
        console.log("run")
    };

    const closePopup = () => {
        setIsOpen(false);
    };
    return (
        <div className="p-3 h-screen justify-center items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
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
                        <button className="bg-[#F90000] px-4 py-2 w-1/2 rounded-r-lg">submit</button>
                    </div>
                </div>
            </Modal>
            <div className="flex w-full h-1/4 justify-center items-center bg-purple-200	">
                <Swich id2='BuyCardBtn' name='buy card' />
                <Swich id2='UseCardBtn' name='use card' />
            </div>
            <button className="bg-red-200 p-4" onClick={
                updateGroup
            }>
                test
            </button>
            <div className="flex w-full h-auto justify-center items-center bg-purple-100	">

                <div id='boxControl' className="grid grid-cols-1 gap-4">
                    {/* {IsUpDate ? <Board group={groupS} /> : <Board group={groupS} />} */}
                    <Board />
                </div>
            </div>
        </div>
    )
}

export default page;