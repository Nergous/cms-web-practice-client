import React from "react";
import cl from "./Member.module.css";

const Member = ({ member }) => {
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
                            <p>Вступил в: {member.date_start}</p>
                            {member.date_end && (
                                <p>Закончил: {member.date_end}</p>
                            )}
                            {!member.date_end && (<p>Является участником по сей день</p>)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Member;
