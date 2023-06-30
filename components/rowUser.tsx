import { useEffect, useState } from "react";

import { IUser } from "@/typings";
import { getGroupName } from "@/utils/userUtils";

const Row: React.FC<{groupUser: IUser, isFromAdmin: boolean}> = ({ groupUser, isFromAdmin }) => {
  const [defaultValue, setDefaultValue] = useState(groupUser.point);

  useEffect(() => {
    setDefaultValue(groupUser.point);
  }, []);

  return (
    <div className="block w-full" key={groupUser.id}>
      <div className="grid grid-cols-3 gap-2 items-center sm:text-xl md:text-4xl text-center	p-4">
        <div>{`${getGroupName(groupUser.id) + (isFromAdmin ? ` (${groupUser.id})` : "")}`}</div>
        <div>{groupUser.point}</div>
        <div>{groupUser.card_count}</div>
      </div>
    </div>
  );
}

export default Row