import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import Member from "./Member/Member";
import LazyLoad from "react-lazyload";
import cl from "./Members.module.css";

const Members = () => {
    const [modal, setModal] = useState(false);

    const [members, setMembers] = useState([]);

    const fetchMembers = async () => {
        const response = await fetch("http://localhost:3001/members");
        const data = await response.json();
        const filteredData = data.filter(item => item.is_member !== false);
        console.log(filteredData)
        setMembers(filteredData);
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const [selectedMember, setSelectedMember] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);

    const handleMemberClick = (member) => {
        setSelectedMember(member);
        setModal(true);
    };

    const handleMouseEnter = (id) => {
        setHoveredId(id);
    };

    const handleMouseLeave = () => {
        setHoveredId(null);
    };

    return (
        <div>
            <h1 className={cl.title}>Ето мы</h1>
            <div className={cl.main}>
                {members.length === 0 && (
                    <h1
                        className={cl.title}
                        style={{ textAlign: "center", margin: "0 auto" }}
                    >
                        Похоже здесь нет участников
                    </h1>
                )}
                {members.length > 0 && (
                    <>
                        {members.map((member) => (
                            <LazyLoad key={member.id} height={250} once>
                                <button
                                    onClick={() => handleMemberClick(member)}
                                    onMouseEnter={() =>
                                        handleMouseEnter(member.id)
                                    }
                                    onMouseLeave={handleMouseLeave}
                                    name={member.name_of_member}
                                    key={member.id}
                                    style={{
                                        height: "350px",
                                        width: "250px",
                                        margin: "50px",
                                        color:
                                            hoveredId === member.id
                                                ? "white"
                                                : "transparent",
                                        backgroundImage: `url(${member.path_to_photo})`,
                                        backgroundColor:
                                            hoveredId === member.id
                                                ? "rgba(0, 0, 0, 0.5)"
                                                : "transparent",
                                        backgroundBlendMode:
                                            hoveredId === member.id
                                                ? "overlay"
                                                : "normal",
                                        backgroundSize: "cover",
                                        transition:
                                            "background-color 0.5s ease-in-out, color 0.5s ease-in-out",
                                        border: "none",
                                        cursor: "pointer",
                                        overflow: "hidden",
                                    }}
                                >
                                    {member.name_of_member}
                                </button>
                            </LazyLoad>
                        ))}
                        <Modal visible={modal} setVisible={setModal}>
                            <Member member={selectedMember} />
                        </Modal>
                    </>
                )}
            </div>
        </div>
    );
};

export default Members;
