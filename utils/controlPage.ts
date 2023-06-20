import Row from '@/components/board'
import { ReactElement } from 'react';
import * as ReactDOM from 'react-dom/client'; 
import { getAllUser, typeRowGrup } from "@/typings";

export let group: getAllUser = {
    code: "000",
    data: [
    {
        user_id: 'A',
        point: 10,
        card: 4
    },
    {
        user_id: 'B',
        point: 11,
        card: 5
    },
    {
        user_id: 'C',
        point: 78,
        card: 77777
    }]
}
export interface typeRow {
    name: string;
    score: number;
    card: number;
}

export function testF() {
    console.log("run");
}
export function fechSwitch() {
    
}
export function updateBoard() {
    group.data = [
        {
            user_id: 'A',
            point: 37,
            card: 3
        },
        {
            user_id: 'C',
            point: 78,
            card: 777
        },
        {
            user_id: 'B',
            point: 22,
            card: 5
        }
    ]
    alert("done")
}


// function getRowHtml() {
//     return (
//         // Row()
//     )
// }