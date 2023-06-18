interface tSwitch {
    id2 : string;
    name : string;
}
export default function Swich({ id2, name }: tSwitch) {

    return (
        <div className='m-3'>
            <div className="flex justify-center items-center">
                <span>Session</span>
            </div>
            <div className="flex justify-center items-center">
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name={id2} id={id2} className="switch-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
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