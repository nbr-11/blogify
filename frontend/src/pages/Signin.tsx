import React from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";

const Signin:React.FC = () =>{

    return <div className="w-full h-full flex justify-center items-center">
         <div className="w-[24rem]  rounded-lg  shadow-lg p-4">
                <Heading heading="Sign in" text="Don't have an Account? " label="SignUp" route="/signup"></Heading>
                 <div className="mt-4 flex flex-col gap-3">
                        <InputBox label="email" name="Email" placeholder="johndoe@example.com"></InputBox>
                        <InputBox label="password" name="Password" placeholder="password"></InputBox>
                 </div>
                 <div className="mt-4">
                    <Button name="Signin"></Button>
                 </div>
         </div>
    </div>
}

export default Signin;