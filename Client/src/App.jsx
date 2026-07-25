import React from "react";
import Home from "./pages/Home.jsx";
import { Routes,Route} from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./protectedRoute/ProtectedRoute.jsx";
import Settings from "./components/dashboard/settings/Settings.jsx";
import ChangePassword from "./components/dashboard/settings/ChangePassword.jsx";
import SettingsIndex from "./components/dashboard/settings/SettingsIndex.jsx";
import UpdateProfile from "./components/dashboard/settings/UpdateProfile.jsx";

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
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            }>
              <Route path="profile" element={<UpdateProfile/>}></Route>
              <Route path="settings" element={<Settings/>}>
                <Route index element={<SettingsIndex/>}/>
                <Route path="updateprofile" element={<UpdateProfile/>}/>
                <Route path="changepassword" element={<ChangePassword/>}/>
                </Route>
              </Route>
          </Routes>
        </div>
    </div>
  );
};

export default App;