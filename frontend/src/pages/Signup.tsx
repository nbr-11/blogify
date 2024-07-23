import React from "react";
import Heading from "../components/Heading";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { SignUpType } from "@nbr11/blogify-common";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const Signup:React.FC = () => {

    const [userDetials, setUserDetails] = useState<SignUpType>({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    });

    return <div className="w-full h-full flex justify-center items-center">
    <div className="w-[24rem]  rounded-lg  h-fit shadow-lg p-4  md:mt-[2rem]">
           <Heading heading="Create Your Account" text="Already have an Account? " label="login" route="/signin"></Heading>
            <div className="mt-4 flex flex-col gap-3">

                   <InputBox value={userDetials} label="firstName" name="First Name" placeholder="John" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                        setUserDetails((prev)=>{
                            return {
                                ...prev,
                                firstName:e.target.value
                            }
                        })
                   }}></InputBox>

                   <InputBox value={userDetials} label="lastName" name="Last Name" placeholder="Doe" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                        setUserDetails((prev)=>{
                            return {
                                ...prev,
                                lastName:e.target.value || ""
                            }
                        })
                   }}></InputBox>
                   <InputBox value={userDetials} label="email" name="Email" placeholder="johndoe@example.com" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                        setUserDetails((prev)=>{
                            return {
                                ...prev,
                                email:e.target.value
                            }
                        })
                   }}></InputBox>
                   <InputBox value={userDetials} label="password" name="Password" placeholder="password" type="password" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                        setUserDetails((prev)=>{
                            return {
                                ...prev,
                                password:e.target.value
                            }
                        })
                   }}></InputBox>
            </div>
            <div className="mt-4">
               <Button name="SignUp" onClick={async (e:React.MouseEvent<HTMLButtonElement>)=>{
                try{
                    const response = await axios.post(`http://127.0.0.1:8787/api/v1/user/signup`,userDetials);
                    
                    if(response.status == 200){
                         toast.success('User Signed up', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                            theme: "colored"
                            });
                    } 

                    setUserDetails({
                        firstName:"",
                        lastName:"",
                        email:"",
                        password:""
                    });

                } catch(e:AxiosError| any){
                    toast.error(e.response.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored"
                        });
                        setUserDetails({
                            firstName:"",
                            lastName:"",
                            email:"",
                            password:""
                        });
                }
               }}></Button>
            </div>
    </div>
</div>
}

export default Signup;