import React, { PureComponent } from "react";
import { AppSidebar, AppFooter, AppHeader } from "../../components";
import CardsMusic from "./CardsMusic";

const AdminMusic = () => {
    const items = [
        { id: 1, name: "Трек1", duration: "6:00" },
        { id: 2, name: "Трек2", duration: "6:00" },
        { id: 3, name: "Трек3", duration: "6:00" },
        { id: 4, name: "Трек4", duration: "6:00" },
        { id: 5, name: "Трек5", duration: "6:00" },
        { id: 6, name: "Трек6", duration: "6:00" },
    ];

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
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
