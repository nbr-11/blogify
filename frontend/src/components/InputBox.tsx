import React from "react";

const InputBox:React.FC<{label:string, name:string, placeholder:string, type?:string, onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void}> = ({label, name, placeholder, type, onChange}) => {
    return <div className="flex flex-col gap-2">
        <label className='font-semibold' htmlFor={label}>{name}</label>
        <input onChange={onChange} type={type || "text"} className="p-2 border-2 rounded-lg"  id={label} placeholder={placeholder}/>
    </div>
}

export default InputBox;