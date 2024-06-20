import React, { useState, useEffect } from "react";
import cl from "./Gigs.module.css";
import Gig from "./GIg/Gig";
import Modal from "../../components/Modal/Modal";
import axios from "axios";

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
            {gigs.map((gig) => (
                <button
                    className={cl.gig__panel}
                    key={gig.id}
                    onClick={() => handleGigClick(gig)}
                >
                    {gig.title} -- {gig.place}
                </button>
            ))}
            <Modal visible={modal} setVisible={setModal}>
                <Gig gig={selectedGig} />
            </Modal>
        </div>
    );
};

export default Gigs;
