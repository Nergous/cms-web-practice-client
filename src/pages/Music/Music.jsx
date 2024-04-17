import React, { useState } from "react";
import cl from "./Music.module.css";
import Modal from "../../components/Modal/Modal";
import MusicPanel from "./MusicPanel/MusicPanel";

const Music = () => {
    let musicTotal = [
        { id: 1, title: "Альбом1", type: "album" },
        { id: 2, title: "Альбом2", type: "album" },
        { id: 3, title: "EP1", type: "ep" },
        { id: 4, title: "Сингл1", type: "single" },
    ];

    const [selectedMusic, setSelectedMusic] = useState(null);
    const [modal, setModal] = useState(false);

    const handleMusicClick = (music) => {
        setSelectedMusic(music);
        setModal(true);
    };
    return (
        <div className={cl.music__container} style={{ height: "100vh" }}>
            {musicTotal.map((music) => (
                <button
                    className={cl.music}
                    onClick={() => handleMusicClick(music)}
                    title={music.title}
                    key={music.id}
                >
                    {music.id} --- {music.title} --- {music.type}
                </button>
            ))}
            <Modal visible={modal} setVisible={setModal}>
                <MusicPanel music={selectedMusic} />
            </Modal>
        </div>
    );
};

export default Music;
