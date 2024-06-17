import React, { useEffect, useState } from "react";
import { AppSidebar, AppFooter, AppHeader } from "../../components";
import CardsMembers from "../AdminMembers/CardsMembers";

import { Link, Route, Routes } from "react-router-dom";
import EditMembers from "../AdminMembers/EditMembers";
import axios from "axios";


const AdminMembers = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/members").then((response) => {
            setItems(response.data);
        });
    }, []);

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <Link to="/admin/members/create"> Создать </Link>
                <div className="body flex-grow-1">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            // margin: "20px",
                            flexWrap: "wrap",
                            // padding: "20px",
                        }}
                    >
                        {items.map((item) => (
                            <CardsMembers
                                key={item.id}
                                item={item}
                            ></CardsMembers>
                        ))}
                    </div>
                </div>
                <AppFooter />
            </div>
            <Routes>
                <Route
                    path=":id/edit"
                    element={<EditMembers />}
                />
            </Routes>
        </>
    );
};

export default AdminMembers;
