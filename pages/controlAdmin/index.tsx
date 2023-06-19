import { useEffect, useState } from 'react';
import Swich from '@/pages/controlAdmin/switch';
import Board from '@/pages/controlAdmin/board'
import { group, updateBoard } from '@/pages/controlAdmin/controlPage'


function page() {
    
    useEffect(() => {
        // console.log("main page");
    },[])
    
    return (
        <div key="controlPage" className="p-3 h-screen justify-center items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
            
            <div className="flex w-full h-1/4 justify-center items-center bg-purple-200	">
                <Swich key={0} id2='BuyCardBtn' name='buy card' url='https://api.cscamp.net/api/settings/shops'/>
                <Swich key={1} id2='UseCardBtn' name='use card' url='https://api.cscamp.net/api/settings/plays'/>
            </div>
            <div className="flex w-full h-auto justify-center items-center bg-purple-100">
                <div id='boxControl' className="grid grid-cols-1 gap-4">
                    <Board />
                    
                </div>
            </div>
        </div>
    )
}

export default page;