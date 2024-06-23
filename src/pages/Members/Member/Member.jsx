import React, { useEffect, useState } from "react";
import axios from "axios";
import cl from "./Member.module.css";

const Member = ({ member }) => {
    const [role, setRole] = useState([]);

    const formatDate = (dateString) => {
        const months = [
            "января",
            "февраля",
            "марта",
            "апреля",
            "мая",
            "июня",
            "июля",
            "августа",
            "сентября",
            "октября",
            "ноября",
            "декабря",
        ];
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const responseRoles = await axios.get(
                    "http://localhost:3001/music_roles"
                );
                const responseMemberRoles = await axios.get(
                    `http://localhost:3001/member_roles`
                );
                if (responseRoles.data && responseMemberRoles.data && member) {
                    const memberRole = responseMemberRoles.data.filter(
                        (rol) => rol.id_member === member.id
                    );
                    const memberRolesId = memberRole.map(role => role.id_role)
                    const filteredRoles = responseRoles.data.filter(role => memberRolesId.includes(role.id));
                    setRole(filteredRoles)
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchRoles();
    }, [member]);

    if (!member) {
        return <></>;
    }
    return (
        <div className={cl.member__page}>
            <table>
                <tbody>
                    <tr>
                        <td colSpan={2} className={cl.title}>
                            {member.name_of_member}
                        </td>
                    </tr>
                    <tr>
                        <td className={cl.data_left}>
                            <img
                                className={cl.member__img}
                                src={member.path_to_photo}
                            ></img>
                        </td>
                        <td className={cl.data_right}>
                            <p>{member.description}</p>
                            <hr />
                            <p>
                                Участник группы с{" "}
                                {formatDate(member.date_start)}
                            </p>
                            <p>Роль в группе: {role.map((r) => r.role_name).join(', ')}</p>
                            {member.date_end && (
                                <p>Закончил: {formatDate(member.date_end)}</p>
                            )}
                            {!member.date_end && (
                                <p>Является участником по сей день</p>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Member;
