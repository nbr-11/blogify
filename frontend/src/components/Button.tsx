import React from "react";

const Button:React.FC<{name:string, onClick:(e:React.MouseEvent<HTMLButtonElement>)=>void}> = ({name,onClick}) => {
    return <button onClick={onClick} className="text-center w-full text-white bg-slate-800 p-2 rounded-lg text-xl font-bold">{name}</button>
}

export default Button;