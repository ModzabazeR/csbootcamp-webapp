import { group, typeRow } from '@/pages/controlAdmin/controlPage'
import React from 'react';
export default function Board() {
    function handleChange( event:any, element : typeRow) {
        element.score = Number(event.target.value);
        console.log(element.score);
      }
    return (
        <>
            {
                group.map(e => {
                    return (
                        // {console.log(e)}
                        <div className="block w-full">
                            <div className=" grid grid-cols-3 gap-4 ">
                                <div className="border-2 border-r-black	">{e.name}</div>
                                <div className="border-2 border-r-black	">
                                    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div className="relative">
                                        <input type="text" defaultValue={e.score} id="score" className="block w-full p-4 pl-10 text-sm  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Score" 
                                        onChange = {event => handleChange(event,e)}></input>
                                        
                                    </div>
                                </div>
                                <div>{e.card}</div>
                            </div>
                        </div>
                    )

                })
            }
        </>
    )
}