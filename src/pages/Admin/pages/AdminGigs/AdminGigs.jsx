import React, { PureComponent } from "react";
import { AppContent, AppSidebar, AppFooter, AppHeader } from "../../components";
import CardsGigs from "./CardsGigs";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminGigs = () => {
    const [items, setItems] = useState([]);
    const getItems = async () => {
        try {
            const response = await axios.get("http://localhost:3001/gigs");
            setItems(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <Link to="/admin/gigs/create">Создать выступление</Link>
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
                            <CardsGigs key={item.id} item={item}></CardsGigs>
                        ))}
                    </div>
                </div>
                <AppFooter />
            </div>
        </>
    );
};

export default AdminGigs;
