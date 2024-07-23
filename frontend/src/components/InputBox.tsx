import React from "react";
import { SignInType } from "@nbr11/blogify-common";
import { SignUpType } from "@nbr11/blogify-common";


interface InputBoxType{
    label:keyof SignInType | keyof SignUpType, 
    name:string, 
    placeholder:string, 
    type?:string, 
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
    value: Partial<Pick<SignUpType, "email" | "firstName" | "lastName" | "password">>
}

const InputBox:React.FC<InputBoxType> = ({label, name, placeholder, type, onChange, value}) => {
    return <div className="flex flex-col gap-2">
        <label className='font-semibold' htmlFor={label}>{name}</label>
        <input value={value[label]} onChange={onChange} type={type || "text"} className="p-2 border-2 rounded-lg"  id={label} placeholder={placeholder}/>
    </div>
}

export default InputBox;