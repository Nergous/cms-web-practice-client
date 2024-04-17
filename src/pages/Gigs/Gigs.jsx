import React, {useState} from "react";
import cl from "./Gigs.module.css";
import Gig from "./GIg/Gig";
import Modal from "../../components/Modal/Modal";


const Gigs = () => {
    const gigs = [
        {
            id: 1,
            title: "Выпускной 2022",
            place: "СЛИ",
            link: "https://google.com",
        },
        {
            id: 2,
            title: "Концерт Паратех - tu:bi:",
            place: "бар Маяковский",
            link: "https://google.com",
        },
        {
            id: 3,
            title: "Ночь в музее",
            place: "Национальная галерея",
            link: "https://google.com",
        },
        {
            id: 4,
            title: "Квартирник",
            place: "Кофейня Арабико",
            link: "https://google.com",
        },
    ];

    const [selectedGig, setSelectedGig] = useState(null);
    const [modal, setModal] = useState(false);

    const handleGigClick = (gig) => {
        setSelectedGig(gig);
        setModal(true);
    };

    return (
        <div className={cl.gig__outer}>
            {gigs.map((gig) => (
                <button className={cl.gig__panel} key={gig.id} onClick={() => handleGigClick(gig)}>
                    {gig.id} -- {gig.title} -- {gig.place}
                </button>
            ))}
            <Modal visible={modal} setVisible={setModal}>
                <Gig gig={selectedGig} />
            </Modal>
        </div>
        
    );
};

export default Gigs;
