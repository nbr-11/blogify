import React from "react";
import Quote from "./Quote";

interface FormBodyType {
    children:React.ReactNode
}

const FormBody:React.FC<FormBodyType> = ({children}) => {
    return <div className="w-screen min-h-screen grid grid-cols-1 grid-rows-3 md:grid-cols-2 md:grid-rows-1 overflow-auto">
        <Quote/>
        <div className="row-span-2 p-4">
            {children}
        </div>
    </div>
}

export default FormBody;