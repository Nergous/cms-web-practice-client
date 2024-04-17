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
                            {member.name}
                        </td>
                    </tr>
                    <tr>
                        <td className={cl.data_left}>
                            <img
                                className={cl.member__img}
                                src={member.img}
                            ></img>
                        </td>
                        <td className={cl.data_right}>
                            <p>{member.text}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Member;
