import React from "react";
import cl from "./MusicPanel.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import CloseButton from "react-bootstrap/CloseButton";

const MusicPanel = ({ music }) => {
    const [tracksList, setTracksList] = useState([]);
    const [members, setMembers] = useState([]);
    const [associationList, setAssociationList] = useState([]);
    const [tracksForRecord, setTracksForRecord] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [trackModalIsOpen, setTrackModalIsOpen] = useState(false);
    const [musicAuthors, setMusicAuthors] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/tracks").then((response) => {
            setTracksList(response.data);
        });
        axios.get("http://localhost:3001/tracks_in_record").then((response) => {
            setAssociationList(response.data);
        });
        axios.get("http://localhost:3001/members").then((response) => {
            setMembers(response.data);
        });
        axios.get("http://localhost:3001/music_authors").then((response) => {
            setMusicAuthors(response.data);
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

    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };
    const openTrackModal = (track) => {
        setSelectedTrack(track);
        setTrackModalIsOpen(true);
    };

    const closeTrackModal = () => {
        setSelectedTrack(null);
        setTrackModalIsOpen(false);
    };

    const audioPlayer = document.getElementById("audioPlayer");
    const playAudio = () => {
        audioPlayer.play();
    };
    const pauseAudio = () => {
        audioPlayer.pause();
    };

    if (!music) {
        return <></>;
    }
    return (
        <div>
            <div className={cl.parent}>
                <div className={cl.div1}>{music.record_name}</div>
                <div className={cl.div2}>
                    <img
                        className={cl.img}
                        src={music.path_to_cover}
                        alt="music"
                    ></img>
                </div>
                <div className={cl.div3}>
                    {tracksForRecord.map((track) => (
                        <div
                            className={cl.tracks}
                            key={track.id}
                            onClick={() => openTrackModal(track)}
                        >
                            <p>{track.track_name}</p>
                        </div>
                    ))}
                </div>
            </div>
            {trackModalIsOpen && (
                <div className={cl.modal}>
                    <div className={cl.modalContent}>
                        <CloseButton onClick={closeTrackModal} />
                        <h2>{selectedTrack.track_name}</h2>
                        {selectedTrack.lyrics_author && (
                            <p>
                                Автор слов:{" "}
                                {
                                    members.find(
                                        (m) =>
                                            m.id === selectedTrack.lyrics_author
                                    ).name_of_member
                                }
                            </p>
                        )}
                        {musicAuthors.filter((author) => author.id_track === selectedTrack.id) > 0 && (
                            <p>
                                Авторы музыки: {""}
                                {musicAuthors
                                    .filter(
                                        (author) =>
                                            author.id_track === selectedTrack.id
                                    )
                                    .map(
                                        (author) =>
                                            members.find(
                                                (m) => m.id === author.id_member
                                            )?.name_of_member
                                    )
                                    .join(", ")}
                            </p>
                        )}

                        <audio className={cl.audio} controls>
                            <source
                                src={selectedTrack.path_to_file}
                                type="audio/mpeg"
                            ></source>
                        </audio>
                        {/* Добавьте другие детали трека по необходимости */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MusicPanel;
