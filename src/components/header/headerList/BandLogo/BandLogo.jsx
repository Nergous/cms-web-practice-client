import React from "react";
import cl from "./BandLogo.module.css";

const BandLogo = () => {
    return (
        <div className={cl.logo__outer__main}>
            <img className={cl.logo__main} src="2b.jpg" alt="Лого" />
        </div>
    );
};

export default BandLogo;
