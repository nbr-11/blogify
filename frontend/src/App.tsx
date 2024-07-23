import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import FormBody from "./components/FormBody";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const App:React.FC = () =>{
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<FormBody children={<Signin/>}/>}/>
          <Route path="/signup" element={<FormBody children={<Signup/>}/>}/>
        </Routes>
      
      </BrowserRouter>
    
    </div>
  )
}

export default App;