import React, { useState } from "react";
import cl from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={cl.navbar__main}>
            <div
                className={`${cl.navbar__toggle} ${isOpen ? cl.change : ""}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className={`${cl.bar} ${isOpen ? cl.bar1 : ""}`}></div>
                <div className={`${cl.bar} ${isOpen ? cl.bar2 : ""}`}></div>
                <div className={`${cl.bar} ${isOpen ? cl.bar3 : ""}`}></div>
            </div>
            <div className={`${cl.navbar__items} ${isOpen ? cl.active : ""}`}>
                <Link
                    className={cl.navbar__item__main}
                    to={"/"}
                    onClick={() => setIsOpen(false)}
                >
                    Главная
                </Link>
                <Link
                    className={cl.navbar__item__main}
                    to={"/members"}
                    onClick={() => setIsOpen(false)}
                >
                    Участники
                </Link>
                <Link
                    className={cl.navbar__item__main}
                    to={"/music"}
                    onClick={() => setIsOpen(false)}
                >
                    Музыка
                </Link>
                <Link
                    className={cl.navbar__item__main}
                    to={"/gigs"}
                    onClick={() => setIsOpen(false)}
                >
                    Выступления
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
