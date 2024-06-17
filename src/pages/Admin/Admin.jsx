import React, { Suspense, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import "./scss/style.scss";
import AdminMusic from "./pages/AdminMusic/AdminMusic";
import AdminMembers from "./pages/AdminMembers/AdminMembers";
import AdminGigs from "./pages/AdminGigs/AdminGigs";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

import CreateMembers from "./pages/AdminMembers/CreateMembers";
import EditMembers from "./pages/AdminMembers/EditMembers";

import CreateMusic from "./pages/AdminMusic/CreateMusic";
import EditMusic from "./pages/AdminMusic/EditMusic";

import CreateGigs from "./pages/AdminGigs/CreateGigs";
import EditGigs from "./pages/AdminGigs/EditGigs";

import AdminRoles from "./pages/AdminRoles/AdminRoles";
import EditRoles from "./pages/AdminRoles/EditRoles";
import CreateRoles from "./pages/AdminRoles/CreateRoles";

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

const Admin = () => {
    return (
        <>
            <Routes>
                <Route path="/music" element={<AdminMusic />} />
                <Route path="/music/*" element={<AdminMusic />} />
                <Route path="/music/create" element={<CreateMusic />} />
                <Route path="/music/:id/edit" element={<EditMusic />} />

                <Route path="/members/*" element={<AdminMembers />} />
                <Route path="/members/create" element={<CreateMembers />} />
                <Route path="/members/:id/edit" element={<EditMembers />} />

                <Route path="/gigs/*" element={<AdminGigs />} />
                <Route path="/gigs/create" element={<CreateGigs />} />
                {/* <Route path="/gigs/:id/edit" element={<EditGigs />} /> */}

                <Route path="/roles/*" element={<AdminRoles />} />
                <Route path="/roles/:id/edit" element={<EditRoles />} />
                <Route path="/roles/create" element={<CreateRoles />} />

                <Route path="/" element={<AdminDashboard />} />
            </Routes>
        </>
    );
};

export default Admin;
