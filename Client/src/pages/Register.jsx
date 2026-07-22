import React from "react";
import AuthLayout from "../components/authentication/AuthLayout";
import AuthCard from "../components/authentication/AuthCard";

const Register=()=>{
    return(
        <div className="w-full max-w-7xl mx-auto p4">
            <AuthLayout>
                <AuthCard/>
            </AuthLayout>
        </div>
    )
}

export default Register