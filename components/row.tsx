import { group } from "@/utils/controlPage";
import { useEffect, useState } from "react";
import { typeRow } from "../utils/controlPage";

interface typeRowI {
  element: typeRow;
}

const Row: React.FC<typeRowI> = ({ element }) => {
  const [defaultValue, setDefaultValue] = useState(element.score);

  useEffect(() => {
    setDefaultValue(element.score);
    console.log("row Re");
  }, [element]);

  const handleChange = (event: any, element: typeRow) => {
    setDefaultValue(event.target.value);
    element.score = Number(event.target.value);
    console.log(element.score);
    console.log("change");
  }

  return (
    <div className="block w-full" key={element.name}>
      <div className=" grid grid-cols-3 gap-4 ">
        <div className="border-2 border-r-black	">{element.name}</div>
        <div className="border-2 border-r-black	">
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
              onChange={(event) => handleChange(event, element)}
            ></input>
          </div>
        </div>
        <div>{element.card}</div>
      </div>
    </div>
  );
}

export default Row