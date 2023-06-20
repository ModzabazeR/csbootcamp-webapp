import { group } from "@/utils/controlPage";
import { useEffect, useState } from "react";
import { typeRowGrup } from "@/typings";


const Row: React.FC<{groupUser: typeRowGrup}> = ({ groupUser }) => {
  const [defaultValue, setDefaultValue] = useState(groupUser.point);

  useEffect(() => {
    setDefaultValue(groupUser.point);
    console.log("row Re");
  }, [groupUser]);

  return (
    <div className="block w-full text-3xl	" key={groupUser.user_id}>
      <div className=" grid grid-cols-3 gap-8 justify-items-center">
        <div className=" ">{groupUser.user_id}</div>
        <div className="	">{groupUser.point}</div>
        <div>{groupUser.card}</div>
      </div>
    </div>
  );
}

export default Row