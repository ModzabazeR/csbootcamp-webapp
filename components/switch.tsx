import { url } from "inspector";
import { useEffect, useState, useRef } from "react";

interface tSwitch {
    id2: string;
    name: string;
    url: string;
}

const Switch: React.FC<tSwitch> = ({ id2, name, url }) => {
    const getstatus = async () => {
        const res = await fetch(url).then()
        const data = await res.json();
        console.log(data.data[0].open + " " + url);
    }

    const pushState = (isOpen: boolean) => {
        console.log("push "+isOpen+" " + id2)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiYWRtaW4iOnRydWUsImlhdCI6MTY4Nzc5NDU3NywiZXhwIjoxNjg4Mzk5Mzc3fQ.f5H5s5v0Whe5VAFmEuFbDvMzGjkQVlzJViNnKahbs7Q'
         },
            body: JSON.stringify({
                'status': isOpen
            })
        };
        // console.log(requestOptions.body)
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(response => alert( "code : "+response.code));
    }

    // const effenRan = useRef(false);
    const [isChecked, setisChecked] = useState(false);

    useEffect(
        
        () => {
            const headersGetList = {
                Accept: "application/json",
                "Content-Type": "application/json",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiYWRtaW4iOnRydWUsImlhdCI6MTY4Nzc5NDU3NywiZXhwIjoxNjg4Mzk5Mzc3fQ.f5H5s5v0Whe5VAFmEuFbDvMzGjkQVlzJViNnKahbs7Q'
              };
            fetch(url, {
                method: "GET",
                headers: headersGetList,
              })
            .then(res => res.json())
            .then(data => {console.log(data);
                setisChecked(JSON.parse(data.data[0].open))}
                
                )
            
        },[url]
    )

    const changeState = () => {
        let isCheckedNew : boolean = !isChecked;
        setisChecked(isCheckedNew);
        console.log("check "+isCheckedNew);
        pushState(isCheckedNew);
    }

    return (
        <div className='m-3' id={url} key = {url}>
            <div className="flex justify-center items-center">
                <span>Session</span>
            </div>
            <div className="flex justify-center items-center">
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input checked={isChecked} type="checkbox" name={id2} id={id2} className="switch-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        onChange={changeState}
                    />
                    <label htmlFor={id2} className="switch-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
                <label htmlFor={id2} className="text-xs text-gray-700">{name}</label>
            </div>
            <style jsx>{`
       /* CHECKBOX switch SWITCH */
       /* @apply rules for documentation, these do not work as inline style */
       .switch-checkbox:checked {
         @apply: right-0 border-green-400;
         right: 0;
         border-color: #68D391;
       }
       .switch-checkbox:checked + .switch-label {
         @apply: bg-green-400;
         background-color: #68D391;
       }
      `}</style>
        </div>
    )
}

export default Switch