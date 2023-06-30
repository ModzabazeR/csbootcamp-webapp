import { useEffect, useState } from "react";

interface tSwitch {
  id2: string;
  name: string;
  url: string;
}

const Switch: React.FC<tSwitch> = ({ id2, name, url }) => {
  const [isChecked, setisChecked] = useState(false);

  const pushState = async (isOpen: boolean) => {
    const tokenString = localStorage.getItem("token") as string;
    console.log("push " + isOpen + " " + id2);
    const requestOptions = {
      method: "POST",
      headers: {
        authorization: tokenString,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: isOpen,
      }),
    };

    await fetch(url, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        if (response.code !== "000") {
          alert("Error: " + response.message);
        } else {
          alert("Success");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const headersGetList = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    };

    fetch(url, {
      method: "GET",
      headers: headersGetList,
    })
      .then((res) => res.json())
      .then((data) => {
        setisChecked(JSON.parse(data.data[0].open));
      })
      .catch((error) => console.error(error));
  }, []);

  const changeState = async () => {
    let isCheckedNew = !isChecked;
    setisChecked(isCheckedNew);
    await pushState(isCheckedNew);
  };

  return (
    <div className="m-3" id={url} key={url}>
      <div className="text-xl m-3 flex justify-center items-center">
        <span>Session</span>
      </div>
      <div className="flex justify-center items-center">
        <div className="relative inline-block w-20 mr-2 align-middle select-none transition duration-200 ease-in">
          <input
            checked={isChecked}
            type="checkbox"
            name={id2}
            id={id2}
            className="switch-checkbox absolute block w-10 h-10 rounded-full bg-white border-4 appearance-none cursor-pointer"
            onChange={changeState}
          />
          <label
            htmlFor={id2}
            className="switch-label block overflow-hidden h-10 rounded-full bg-gray-300 cursor-pointer"
          ></label>
        </div>
        <label htmlFor={id2} className="text-lg text-gray-700">
          {name}
        </label>
      </div>
      <style jsx>{`
        /* CHECKBOX switch SWITCH */
        /* @apply rules for documentation, these do not work as inline style */
        .switch-checkbox:checked {
          @apply: right-0 border-green-400;
          right: 0;
          border-color: #68d391;
        }
        .switch-checkbox:checked + .switch-label {
          @apply: bg-green-400;
          background-color: #68d391;
        }
      `}</style>
    </div>
  );
};

export default Switch;
