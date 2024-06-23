import React, { useEffect, useState } from "react";
import axios from "axios";
import CloseButton from "react-bootstrap/CloseButton";
import cl from "./MusicPanel.module.css";

const MusicPanel = ({ music }) => {
    const [tracksList, setTracksList] = useState([]);
    const [members, setMembers] = useState([]);
    const [associationList, setAssociationList] = useState([]);
    const [tracksForRecord, setTracksForRecord] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [trackModalIsOpen, setTrackModalIsOpen] = useState(false);
    const [musicAuthors, setMusicAuthors] = useState([]);
    const [trackAuthors, setTrackAuthors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    trackResponse,
                    associationResponse,
                    memberResponse,
                    musicAuthorsResponse,
                ] = await Promise.all([
                    axios.get("http://localhost:3001/tracks"),
                    axios.get("http://localhost:3001/tracks_in_record"),
                    axios.get("http://localhost:3001/members"),
                    axios.get("http://localhost:3001/music_authors"),
                ]);
                setTracksList(trackResponse.data);
                setAssociationList(associationResponse.data);
                setMembers(memberResponse.data);
                setMusicAuthors(musicAuthorsResponse.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
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

    useEffect(() => {
        if (selectedTrack && musicAuthors.length > 0) {
            const musicAuthor = getAuthorsForTrack(selectedTrack, musicAuthors);
            setTrackAuthors(musicAuthor);
        }
    }, [selectedTrack, musicAuthors]);

    function getAuthorsForTrack(track, authors) {
        const trackAuthor = authors
            .filter((author) => author.id_track === track.id)
            .map(
                (author) =>
                    members.find((m) => m.id === author.id_member)
                        .name_of_member
            );
        return trackAuthor;
    }

    function getTracksForRecord(record, tracks, tracksInRecord) {
        const recordIdList = associationList.filter(
            (association) => association.id_record === music.id
        );
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
        setTrackModalIsOpen(false);
        setTimeout(() => {
            setSelectedTrack(null);
        }, 300); // Продолжительность совпадает с временем анимации
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                trackModalIsOpen &&
                event.target.closest(`.${cl.modalContent}`) === null
            ) {
                closeTrackModal();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [trackModalIsOpen]);

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
            {(trackModalIsOpen || selectedTrack !== null) && (
                <div
                    className={`${cl.modal} ${
                        trackModalIsOpen ? cl.active : cl.closing
                    }`}
                >
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
                        {trackAuthors.length > 0 && (
                            <p>Авторы музыки: {trackAuthors.join(", ")}</p>
                        )}
                        <audio className={cl.audio} controls>
                            <source
                                src={selectedTrack?.path_to_file}
                                type="audio/mpeg"
                            ></source>
                        </audio>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MusicPanel;
