import React, { Suspense, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import "./scss/style.scss";
import AdminMusic from "./pages/AdminMusic/AdminMusic";
import AdminMembers from "./pages/AdminMembers/AdminMembers";
import AdminGigs from "./pages/AdminGigs/AdminGigs";
import AdminMain from "./pages/AdminMain/AdminMain";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import { AppContent } from "./components";

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const Admin = () => {
    return (
        <>
            <Routes>
                <Route path="/music" element={<AdminMusic />} />
                <Route path="/members" element={<AdminMembers />} />
                <Route path="/gigs" element={<AdminGigs />} />
                <Route path="/main" element={<AdminMain />} />
                <Route path="/" element={<AdminDashboard />} />
            </Routes> 
        </>

        // // <HashRouter>
        //      <Routes>
        //        {/* <Route exact path="/login" name="Login Page" element={<Login />} />
        //        <Route exact path="/register" name="Register Page" element={<Register />} />
        //        <Route exact path="/404" name="Page 404" element={<Page404 />} />
        //        <Route exact path="/500" name="Page 500" element={<Page500 />} />  */}
        //        <Route path="*" name="Home" element={<DefaultLayout />} />
        //      </Routes>
        // // </HashRouter>
    );
};

export default Admin;
