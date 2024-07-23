import React from "react";
import Heading from "../components/Heading";
import Button from "../components/Button";
import InputBox from "../components/InputBox";

const Signup:React.FC = () => {

    return <div className="w-full h-full flex justify-center items-center">
    <div className="w-[24rem]  rounded-lg  shadow-lg p-4 mt-[10rem] md:mt-[0rem]">
           <Heading heading="Create Your Account" text="Already have an Account? " label="login" route="/signin"></Heading>
            <div className="mt-4 flex flex-col gap-3">
                   <InputBox label="firstName" name="First Name" placeholder="John"></InputBox>
                   <InputBox label="lastName" name="Last Name" placeholder="Doe"></InputBox>
                   <InputBox label="email" name="Email" placeholder="johndoe@example.com"></InputBox>
                   <InputBox label="password" name="Password" placeholder="password"></InputBox>
            </div>
            <div className="mt-4">
               <Button name="SignUp"></Button>
            </div>
    </div>
</div>
}

export default Signup;