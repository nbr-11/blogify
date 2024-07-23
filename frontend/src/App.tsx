import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import FormBody from "./components/FormBody";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App:React.FC = () =>{
  return (
    <div>
       <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="colored"/>
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