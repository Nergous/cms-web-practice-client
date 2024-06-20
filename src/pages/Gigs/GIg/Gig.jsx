import React, { useEffect, useState } from "react";

const Gig = ({ gig }) => {
    const [status, setStatus] = useState("");

    if (!gig) {
        return <></>;
    }
    return (
        <div style={{ color: "black" }}>
            <h1>{gig.title}</h1>
            <h2>{gig.place}</h2>
            <p>{gig.date_of_gig}</p>
            {gig.gig_status === "soon" && <p style={{ color: "blue" }}>Уже скоро</p>}
            {gig.gig_status === "completed" && <p style={{ color: "green" }}>Завершен</p>}
            {gig.gig_status === "canceled" && <p style={{ color: "red" }}>Отменен</p>}
            <p>
                <a href={gig.link_to_social}>Ссылка на соц. сети</a>
            </p>
        </div>
    );
};

export default Gig;
