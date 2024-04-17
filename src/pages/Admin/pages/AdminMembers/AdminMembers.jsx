import React, { PureComponent } from "react";
import { AppSidebar, AppFooter, AppHeader } from "../../components";
import CardsMembers from "../AdminMembers/CardsMembers";

const AdminMembers = () => {
    const items = [
        {
            id: 1,
            name: "Ярик",
            text: "Какой то текст от Ярика",
            img: "iam.jpg",
        },
        {
            id: 2,
            name: "Даша",
            text: "Какой то текст от Даши",
            img: "dasha.jpg",
        },
        {
            id: 3,
            name: "Лена",
            text: "Какой то текст от Лены",
            img: "lena.jpg",
        },
        {
            id: 4,
            name: "Олег",
            text: "Какой то текст от Олега",
            img: "oleg.jpg",
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
                            <CardsMembers
                                key={item.id}
                                item={item}
                            ></CardsMembers>
                        ))}
                    </div>
                </div>
                <AppFooter />
            </div>
        </>
    );
};

export default AdminMembers;
