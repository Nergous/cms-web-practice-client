import React from "react";
import cl from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className={cl.navbar__main}>
            <Link className={cl.navbar__item__main} to={"/"}>
                Главная
            </Link>
            <Link className={cl.navbar__item__main} to={"/members"}>
                Участники
            </Link>
            <Link className={cl.navbar__item__main} to={"/music"}>
                Музыка
            </Link>
            <Link className={cl.navbar__item__main} to={"/gigs"}>
                Выступления
            </Link>
        </div>
    );
};

export default Navbar;
