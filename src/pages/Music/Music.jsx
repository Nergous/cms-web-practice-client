import React, { useState } from "react";
import cl from "./Music.module.css";
import Modal from "../../components/Modal/Modal";
import MusicPanel from "./MusicPanel/MusicPanel";

import axios from "axios";
import { useEffect } from "react";

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
            {musicList.map((music) => (
                <button
                    className={cl.music}
                    onClick={() => handleMusicClick(music)}
                    title={music.record_name}
                    key={music.id}
                >
                    {music.id} --- {music.record_name} --- {music.type_of_record}
                </button>
            ))}
            <Modal visible={modal} setVisible={setModal}>
                <MusicPanel music={selectedMusic} />
            </Modal>
        </div>
    );
};

export default Music;
