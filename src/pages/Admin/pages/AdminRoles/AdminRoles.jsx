import React, { PureComponent } from "react";
import { AppSidebar, AppFooter, AppHeader } from "../../components";
import CardsRoles from "./CardsRoles";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminRoles = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/music_roles").then((response) => {
            setItems(response.data);
        });
    }, []);

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <Link to="/admin/roles/create">Создать роль</Link>
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
                            <CardsRoles key={item.id} item={item}></CardsRoles>
                        ))}
                    </div>
                </div>
                <AppFooter />
            </div>
        </>
    );
};

export default AdminRoles;
