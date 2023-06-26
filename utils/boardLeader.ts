import { getAllUser } from "@/typings";

const url = 'https://api.cscamp.net/api/users/'
let headersList = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiYWRtaW4iOnRydWUsImlhdCI6MTY4Nzc5NDU3NywiZXhwIjoxNjg4Mzk5Mzc3fQ.f5H5s5v0Whe5VAFmEuFbDvMzGjkQVlzJViNnKahbs7Q'
};

export async function  getData(): Promise<getAllUser> {
    updateBoard()
    return group;
  }

function sortUsers(){
    group.data.sort((a, b) =>{return b.point-a.point})
}
export let group: getAllUser = {
    code: "000",
    data: [
        {
            id: 'nothing',
            point: 99999,
            admin: 0,
            card_count: 99999
        }]
}

export async function updateBoard() {
    const ALLUESR_URL = 'https://api.cscamp.net/api/users/'
    let responseAllgroup = await fetch(ALLUESR_URL, {
        method: "GET",
        headers: headersList,
    });
    let dataJsonAllGroup: getAllUser = await responseAllgroup.json();
    console.log(dataJsonAllGroup)
    group = dataJsonAllGroup;
    sortUsers()
}


// function getRowHtml() {
//     return (
//         // Row()
//     )
// }