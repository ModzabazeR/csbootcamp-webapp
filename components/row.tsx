import { useEffect, useState } from "react";
import { typeRowGrup } from "@/typings";
import { getGroupName } from "@/utils/userUtils";

const Row: React.FC<{ groupUser: typeRowGrup }> = ({ groupUser }) => {
  const [defaultValue, setDefaultValue] = useState(groupUser.point);
  const [initialPoint, setInitialPoint] = useState(groupUser.point);

  useEffect(() => {
    setDefaultValue(groupUser.point);
    setInitialPoint(groupUser.point); // Set initialPoint only once when component mounts
    console.log("row Re");
  }, [groupUser]);

  const handleChange = (event: any, groupUser: typeRowGrup) => {
    setDefaultValue(event.target.value);
    groupUser.point = Number(event.target.value);
  };

  return (
    <div className="block w-full text-center " key={groupUser.id}>
      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="pl-5">{`${getGroupName(groupUser.id)} (${groupUser.id})`}</div>
        <div className="border-x-2 px-5 border-x-black">
          <div className="relative grid grid-cols-2 gap-4 items-center">
            <div className="text-left	" >from {initialPoint}</div>
            <input
              name="score"
              value={defaultValue}
              type="text"
              id="score"
              className="my-2 block w-full p-4 pl-10 text-center dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg"
              placeholder="Score"
              onChange={(event) => handleChange(event, groupUser)}
            ></input>
          </div>
        </div>
        <div>{groupUser.card_count}</div>
      </div>
    </div>
  );
};

export default Row;