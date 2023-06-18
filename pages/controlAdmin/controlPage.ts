import Row from '@/pages/controlAdmin/board'
import { ReactElement } from 'react';
import * as ReactDOM from 'react-dom/client'; 



export let group: typeRow[] = [
    {
        name: 'A',
        score: 10,
        card: 3
    },
    {
        name: 'B',
        score: 11,
        card: 5
    }
]
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
    group = [
        {
            name: 'A',
            score: 10,
            card: 3
        },
        {
            name: 'B',
            score: 11,
            card: 5
        },
        {
            name: 'C',
            score: 78,
            card: 777
        }
    ]
}


// function getRowHtml() {
//     return (
//         // Row()
//     )
// }