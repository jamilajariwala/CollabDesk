import React from "react";
import Home from "./pages/Home.jsx";
import { Routes,Route} from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ProtectedRoute from "./protectedRoute/ProtectedRoute.jsx";
import Settings from "./components/dashboard/settings/Settings.jsx";
import ChangePassword from "./components/dashboard/settings/ChangePassword.jsx";
import SettingsIndex from "./components/dashboard/settings/SettingsIndex.jsx";
import UpdateProfile from "./components/dashboard/settings/UpdateProfile.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import ProjectDetail from "./components/dashboard/dashboard/ProjectDetail.jsx";
import InviteClient from "./components/dashboard/dashboard/client/InviteClient.jsx";
import InvitationCard from "./components/dashboard/dashboard/client/InvitationCard.jsx";
import Milestone from "./components/dashboard/dashboard/milestone/Milestone.jsx";
import DeliverablesCard from "./components/dashboard/dashboard/deliverables/DeliverablesCard.jsx";
import Project from "./components/dashboard/dashboard/Project.jsx";
import Dashboard from "./components/dashboard/dashboard/DashBoard.jsx";
import About from "./components/landingpage/About.jsx";

const App = () => {
  return (
    <div className="min-h-screen bg-[#FFFFE3] z-0 font-sans overflow-x-hidden ">
     
      <div className="fixed   inset-0 z-10  h-screen w-screen bg-[radial-gradient(gray,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="relative z-20">
          
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>
            <Route path="/verifyOtp" element={<VerifyOtp/>}></Route>
            <Route path="/resetpassword" element={<ResetPassword/>}></Route>
            <Route path='/invite/:token' element={<InvitationCard/>}></Route>
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout/>
              </ProtectedRoute>
            }>
              <Route index element={<Project/>}></Route>
              <Route path='projects' element={<Dashboard/>}></Route>
              <Route path="project/:id" element={<ProjectDetail/>}>
                <Route path="client" element={<InviteClient/>}></Route>
                <Route path="milestone" element={<Milestone/>}></Route>
              </Route>
              <Route path="project/:projectId/milestone/:mileId/task/:taskId/deliverables" element={<DeliverablesCard/>}></Route>
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