import React from "react";

const InputBox:React.FC<{label:string, name:string, placeholder:string}> = ({label, name, placeholder}) => {
    return <div className="flex flex-col gap-2">
        <label className='font-semibold' htmlFor={label}>{name}</label>
        <input className="p-2 border-2 rounded-lg" type="text" id={label} placeholder={placeholder}/>
    </div>
}

export default InputBox;