import React from "react";
import cl from "./MusicPanel.module.css";
const MusicPanel = ({ music }) => {
    const tracks = [
        { id: 1, name: "Трек1", duration: "6:00" },
        { id: 2, name: "Трек1", duration: "6:00" },
        { id: 3, name: "Трек1", duration: "6:00" },
        { id: 4, name: "Трек1", duration: "6:00" },
        { id: 5, name: "Трек1", duration: "6:00" },
        { id: 6, name: "Трек1", duration: "6:00" },
        { id: 7, name: "Трек1", duration: "6:00" },
        { id: 8, name: "Трек1", duration: "6:00" },
        { id: 9, name: "Трек1", duration: "6:00" },
        { id: 10, name: "Трек1", duration: "6:00" },
        { id: 11, name: "Трек1", duration: "6:00" },
        { id: 12, name: "Трек1", duration: "6:00" },
    ];
    if (!music) {
        return <></>;
    }
    return (
        <div>
            <div className={cl.parent}>
                <div className={cl.div1}>{music.title}</div>
                <div className={cl.div2}>
                    <img className={cl.img} src="vinyl.jpg" alt="music"></img>
                </div>
                <div className={cl.div3}>
                    {tracks.map((track) => (
                        <div className={cl.tracks} key={track.id}>
                            {track.id} -- {track.name} -- {track.duration}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MusicPanel;
