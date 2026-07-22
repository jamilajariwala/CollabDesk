import React from "react";
import Home from "./pages/Home.jsx";
import { Routes,Route} from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const App = () => {
  return (
    <div className="min-h-screen bg-[#FFFFE3] z-0 font-sans overflow-x-hidden ">
     
      <div className="fixed   inset-0 z-10  h-screen w-screen bg-[radial-gradient(gray,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="relative z-20">
          
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>
            <Route path="/verifyOtp" element={<VerifyOtp/>}></Route>
            <Route path="/resetpassword" element={<ResetPassword/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
          </Routes>
        </div>
    </div>
  );
};

export default App;