import React, { PureComponent } from "react";
import { AppContent, AppSidebar, AppFooter, AppHeader } from "../../components";
import CardsGigs from "./CardsGigs";

const AdminGigs = () => {
    const items = [
        {
            id: 1,
            title: "Выпускной 2022",
            place: "СЛИ",
            link: "https://google.com",
        },
        {
            id: 2,
            title: "Концерт Паратех - tu:bi:",
            place: "бар Маяковский",
            link: "https://google.com",
        },
        {
            id: 3,
            title: "Ночь в музее",
            place: "Национальная галерея",
            link: "https://google.com",
        },
        {
            id: 4,
            title: "Квартирник",
            place: "Кофейня Арабико",
            link: "https://google.com",
        },
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
                            <CardsGigs
                                key={item.id}
                                item={item}
                            ></CardsGigs>
                        ))}
                    </div>
                </div>
                <AppFooter />
            </div>
        </>
    );
};

export default AdminGigs;
