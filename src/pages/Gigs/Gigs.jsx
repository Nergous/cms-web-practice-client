import React, { useState, useEffect } from "react";
import axios from "axios";
import Gig from "./GIg/Gig";
import Modal from "../../components/Modal/Modal";

import cl from "./Gigs.module.css";

const Gigs = () => {
    const [gigs, setGigs] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/gigs").then((response) => {
            setGigs(response.data);
        });
    }, []);

    const [selectedGig, setSelectedGig] = useState(null);
    const [modal, setModal] = useState(false);

    const handleGigClick = (gig) => {
        setSelectedGig(gig);
        setModal(true);
    };

    return (
        <div className={cl.gig__outer}>
            <h1 className={cl.gig__title}>Выступления</h1>
            {gigs && (
                <>
                    {gigs.map((gig) => (
                        <button
                            className={cl.gig__panel}
                            key={gig.id}
                            onClick={() => handleGigClick(gig)}
                        >
                            {gig.title}
                        </button>
                    ))}
                    <Modal visible={modal} setVisible={setModal}>
                        <Gig gig={selectedGig} />
                    </Modal>
                </>
            )}
            {!gigs.length && (
                <h1 className={cl.gig__title}>Пока что нет выступлений</h1>
            )}
        </div>
    );
};

export default Gigs;
