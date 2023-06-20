import { group } from "@/utils/controlPage";
import { useEffect, useState } from "react";
import { typeRow } from "../utils/controlPage";
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
    <div className="block w-full" key={groupUser.user_id}>
      <div className=" grid grid-cols-3 gap-4 ">
        <div className="border-r-2	 border-r-black	">{groupUser.user_id}</div>
        <div className="border-r-2	pr-3 border-r-black	">
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <input
              value={defaultValue}
              type="text"
              id="score"
              className="block w-full p-4 pl-10 text-sm  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Score"
              onChange={(event) => handleChange(event, groupUser)}
            ></input>
          </div>
        </div>
        <div>{groupUser.card}</div>
      </div>
    </div>
  );
}

export default Row