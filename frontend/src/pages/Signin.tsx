import React, { useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import {
       SignInType
} from "@nbr11/blogify-common"

const Signin:React.FC = () =>{
    const [userDetails, setUserDetails] = useState<SignInType>({
       email:"",
       password:""
    })
    return <div className="w-full h-full flex justify-center items-center">
         <div className="w-[24rem]  rounded-lg  shadow-lg p-4">
                <Heading heading="Sign in" text="Don't have an Account? " label="SignUp" route="/signup"></Heading>
                 <div className="mt-4 flex flex-col gap-3">
                        <InputBox label="email" name="Email" placeholder="johndoe@example.com" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                            setUserDetails((prev)=>{
                                   return {
                                          ...prev,
                                          email:e.target.value
                                   }
                            })
                        }}></InputBox>
                        <InputBox label="password" name="Password" placeholder="password" type="password" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                            setUserDetails((prev)=>{
                                   return {
                                          ...prev,
                                          password:e.target.value
                                   }
                            })
                        }}></InputBox>
                 </div>
                 <div className="mt-4">
                    <Button name="Signin" onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
                            
                    }}></Button>
                 </div>
         </div>
    </div>
}

export default Signin;