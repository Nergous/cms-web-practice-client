import React from "react";
import cl from "./MusicPanel.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const MusicPanel = ({ music }) => {
    const [tracksList, setTracksList] = useState([]);
    const [associationList, setAssociationList] = useState([]);
    const [tracksForRecord, setTracksForRecord] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/tracks").then((response) => {
            setTracksList(response.data);
        });
        axios.get("http://localhost:3001/tracks_in_record").then((response) => {
            setAssociationList(response.data);
        });
    }, []);

    useEffect(() => {
        if (music && tracksList.length > 0 && associationList.length > 0) {
            const tracksForGivenRecord = getTracksForRecord(
                music,
                tracksList,
                associationList
            );
            setTracksForRecord(tracksForGivenRecord);
        }
    }, [music, tracksList, associationList]);

    function getTracksForRecord(record, tracks, tracksInRecord) {
        const recordIdList = associationList.filter(
            (association) => association.id_record === music.id
        );
        console.log(recordIdList);
        const tracksForRecord = recordIdList.map((recordId) => {
            return tracks.find((track) => track.id === recordId.id_track);
        });
        return tracksForRecord;
    }

    if (!music) {
        return <></>;
    }
    return (
        <div>
            <div className={cl.parent}>
                <div className={cl.div1}>{music.record_name}</div>
                <div className={cl.div2}>
                    <img className={cl.img} src="vinyl.jpg" alt="music"></img>
                </div>
                <div className={cl.div3}>
                    {tracksForRecord.map((track) => (
                        <div className={cl.tracks} key={track.id}>
                            {track.id} -- {track.track_name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MusicPanel;
