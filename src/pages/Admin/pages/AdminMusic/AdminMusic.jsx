import React, { useState, useEffect } from "react";
import { AppSidebar, AppFooter, AppHeader } from "../../components";
import CardsMusic from "./CardsMusic";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminMusic = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/record").then((response) => {
            setItems(response.data);
        });
    }, []);

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <Link to="/admin/music/create">Создать альбом</Link>
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
                            <CardsMusic key={item.id} item={item}></CardsMusic>
                        ))}
                    </div>
                </div>
                <AppFooter />
            </div>
        </>
    );
};

export default AdminMusic;
