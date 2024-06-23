import React, { useEffect, useState } from "react";
import axios from "axios";

const Gig = ({ gig }) => {
    const [members, setMembers] = useState([]);
    const [gigMembers, setGigMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const responseMembers = await axios.get(
                    "http://localhost:3001/members"
                );
                const responseGigMembers = await axios.get(
                    `http://localhost:3001/gig_members?id_gig=${gig.id}`
                );
                setMembers(responseMembers.data);
                setGigMembers(responseGigMembers.data);
            } catch (error) {
                console.error(error);
            }
        };
        if (gig) {
            fetchMembers();
        }
    }, [gig]);

    if (!gig) {
        return <></>;
    }

    return (
        <div style={{ color: "black" }}>
            <h1>{gig.title}</h1>
            <h2>{gig.place}</h2>
            <p>{gig.date_of_gig}</p>
            {gig.gig_status === "soon" && (
                <h2 style={{ color: "blue" }}>Уже скоро</h2>
            )}
            {gig.gig_status === "completed" && (
                <h2 style={{ color: "green" }}>Завершен</h2>
            )}
            {gig.gig_status === "canceled" && (
                <h2 style={{ color: "red" }}>Отменен</h2>
            )}
            <p>
                <a href={gig.link_to_social}>Ссылка на соц. сети</a>
            </p>
            {gigMembers && (
                <>
                    <h3>Участники</h3>
                    <ul>
                        {/* filter members where id in gigMembers */}
                        {gigMembers.map((gm) => {
                            const member = members.find(
                                (m) => m.id === gm.id_member
                            );
                            return (
                                <li key={gm.id_member}>
                                    {member.name_of_member}
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Gig;
