import { getUsersResponse } from "@/typings";

export async function getData(): Promise<getUsersResponse> {
  updateBoard();
  return group;
}

export let group: getUsersResponse = {
  code: "000",
  data: [
    {
      id: "nothing",
      point: 99999,
      admin: 0,
      card_count: 99999,
    },
  ],
};

export async function updateBoard() {
  const ALLUSER_URL = "https://api.cscamp.net/api/users/";
  let headersList = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  };

  let responseAllgroup = await fetch(ALLUSER_URL, {
    method: "GET",
    headers: headersList,
  });

  let dataJsonAllGroup: getUsersResponse = await responseAllgroup.json();
  group = dataJsonAllGroup;
}
