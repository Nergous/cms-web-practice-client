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
            {musicList.length > 0 && (
                <>
                    {musicList.map((music) => (
                        <button
                            className={cl.music}
                            onClick={() => handleMusicClick(music)}
                            title={music.record_name}
                            key={music.id}
                        >
                            {music.record_name}
                        </button>
                    ))}
                    <Modal visible={modal} setVisible={setModal}>
                        <MusicPanel music={selectedMusic} />
                    </Modal>
                </>
            )}
            {musicList.length === 0 && (
                <h2 className={cl.music__title}>Пока что здесь ничего нет</h2>
            )}
        </div>
    );
};

export default Music;
