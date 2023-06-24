import {  } from "@/utils/boardLeader";
import { useEffect, useState } from "react";
import { typeRowGrup } from "@/typings";

const Row: React.FC<{groupUser: typeRowGrup}> = ({ groupUser }) => {
  const [defaultValue, setDefaultValue] = useState(groupUser.point);

  useEffect(() => {
    setDefaultValue(groupUser.point);
    console.log("row Re");
  }, [groupUser]);

  const handleChange = (event: any, groupUser: typeRowGrup) => {
    setDefaultValue(event.target.value);
    groupUser.point = Number(event.target.value);
    console.log(groupUser.point);
    console.log("change");
  }

  return (
    <div className="block w-full" key={groupUser.id}>
      <div className=" grid grid-cols-3 gap-4 ">
        <div className="pl-5 text-center">{groupUser.id}</div>
        <div className="border-x-2	px-5 border-x-black	">
          <div className="relative ">
            <input
              name="score"
              value={defaultValue}
              type="text"
              id="score"
              className="block w-full p-4 pl-10 text-center dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Score"
              onChange={(event) => handleChange(event, groupUser)}
            ></input>
          </div>
        </div>
        <div>{groupUser.card_count}</div>
      </div>
    </div>
  );
}

export default Row