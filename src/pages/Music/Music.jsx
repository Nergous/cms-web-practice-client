import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import MusicPanel from "./MusicPanel/MusicPanel";

import cl from "./Music.module.css";

const Music = () => {
    const [musicList, setMusicList] = useState([]);
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3001/record").then((response) => {
            setMusicList(response.data);
        });
    }, []);

    const handleMusicClick = (music) => {
        setSelectedMusic(music);
        setModal(true);
    };
    return (
        <div className={cl.music__container}>
            <h1 className={cl.music__title}>Музыка</h1>
            {musicList.map((music) => (
                <button
                    className={cl.music}
                    onClick={() => handleMusicClick(music)}
                    title={music.record_name}
                    key={music.id}
                >
                    {music.record_name} --- {music.type_of_record}
                </button>
            ))}
            <Modal visible={modal} setVisible={setModal}>
                <MusicPanel music={selectedMusic} />
            </Modal>
        </div>
    );
};

export default Music;
