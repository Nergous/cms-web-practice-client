import React, { useEffect, useState } from "react";
import { CForm, CFormInput, CCol, CButton, CFormSelect } from "@coreui/react";
import { AppSidebar, AppHeader, AppFooter } from "../../components";
import axios from "axios";

const CreateMusic = () => {
    const [recordName, setRecordName] = useState("");
    const [recordType, setRecordType] = useState("");
    const [cover, setCover] = useState(null);
    const [releaseYear, setReleaseYear] = useState("");
    const [members, setMembers] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [validated, setValidated] = useState(false);

    const fetchMembers = async () => {
        try {
            const response = await axios.get("http://localhost:3001/members");
            setMembers(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleRecordNameChange = (e) => {
        setRecordName(e.target.value);
    };

    const handleTrackChange = (index, field, value) => {
        const newTracks = [...tracks];
        newTracks[index][field] = value;
        setTracks(newTracks);
    };

    const handleCoverChange = (e) => {
        setCover(e.target.files[0]);
    };

    const handleReleaseYearChange = (e) => {
        setReleaseYear(e.target.value);
    };

    const addTrack = () => {
        if (recordType === "single" && tracks.length >= 1) return;

        setTracks([
            ...tracks,
            {
                name: "",
                file: null,
                author: "",
                participants: [],
                selectedParticipant: "",
            },
        ]);
    };

    const addParticipant = (index) => {
        const newTracks = [...tracks];
        const { selectedParticipant } = newTracks[index];
        if (
            selectedParticipant &&
            !newTracks[index].participants.includes(selectedParticipant)
        ) {
            newTracks[index].participants.push(selectedParticipant);
            newTracks[index].selectedParticipant = "";
            setTracks(newTracks);
        }
    };

    const handleParticipantChange = (trackIndex, value) => {
        const newTracks = [...tracks];
        newTracks[trackIndex].selectedParticipant = value;
        setTracks(newTracks);
    };

    const getAvailableMembers = (trackIndex) => {
        const selectedMembers = tracks[trackIndex].participants.filter(Boolean);
        return members.filter(
            (member) => !selectedMembers.includes(member.name_of_member)
        );
    };

    const isAddParticipantButtonDisabled = (trackIndex) => {
        return getAvailableMembers(trackIndex).length === 0;
    };

    const handleRecordTypeChange = (e) => {
        const newRecordType = e.target.value;
        setRecordType(newRecordType);

        if (newRecordType === "single") {
            setTracks([
                {
                    name: "",
                    file: null,
                    author: "",
                    participants: [],
                    selectedParticipant: "",
                },
            ]);
        } else {
            setTracks([]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append("recordName", recordName);
        formData.append("recordType", recordType);
        formData.append("cover", cover);
        formData.append("releaseYear", releaseYear);
        // Convert tracks to include member IDs and author ID
        const tracksWithIds = tracks.map((track) => {
            return {
                ...track,
                participants: track.participants.map((participantName) => {
                    const member = members.find(
                        (member) => member.name_of_member === participantName
                    );
                    return member ? member.id : null;
                }),
                author:
                    members.find(
                        (member) => member.name_of_member === track.author
                    )?.id || null,
                file: track.file,
            };
        });
        formData.append("tracks", JSON.stringify(tracksWithIds));

        tracksWithIds.forEach((track, index) => {
            if (track.file) {
                formData.append(`trackFiles`, track.file);
            }
        });


        try {
            const response = await axios.post(
                "http://localhost:3001/record",
                formData
            );
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error submitting the form", error);
        }
    };

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <CForm
                        className="row g-3 needs-validation"
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                feedbackValid="Looks good!"
                                id="record_name"
                                label="Название альбома"
                                placeholder="Альбом"
                                required
                                onChange={handleRecordNameChange}
                            />
                        </CCol>
                        <CCol md={4}>
                            <CFormSelect
                                feedbackValid="Looks good!"
                                id="record_type"
                                label="Тип записи"
                                value={recordType}
                                onChange={handleRecordTypeChange}
                                required
                            >
                                <option value="">Выберите тип записи</option>
                                <option value="EP">EP</option>
                                <option value="single">single</option>
                                <option value="album">album</option>
                            </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="file"
                                feedbackInvalid="Invalid file type."
                                id="cover"
                                label="Обложка"
                                required
                                onChange={handleCoverChange}
                            />
                        </CCol>
                        <CCol md={4}>
                            <CFormInput
                                type="date"
                                placeholder="01.01.2001"
                                feedbackValid="Looks good!"
                                id="release_year"
                                label="Год выпуска"
                                required
                                onChange={handleReleaseYearChange}
                            />
                        </CCol>
                        <CCol xs={12}>
                            {(recordType !== "single" ||
                                tracks.length === 0) && (
                                <CButton
                                    color="primary"
                                    type="button"
                                    onClick={addTrack}
                                >
                                    Добавить трек
                                </CButton>
                            )}
                        </CCol>
                        {tracks.map((track, trackIndex) => (
                            <div key={trackIndex} className="row g-3">
                                <CCol md={4}>
                                    <CFormInput
                                        type="text"
                                        placeholder="Название трека"
                                        feedbackValid="Looks good!"
                                        value={track.name}
                                        onChange={(e) =>
                                            handleTrackChange(
                                                trackIndex,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </CCol>
                                <CCol md={4}>
                                    <CFormInput
                                        type="file"
                                        feedbackInvalid="Invalid file type."
                                        onChange={(e) =>
                                            handleTrackChange(
                                                trackIndex,
                                                "file",
                                                e.target.files[0]
                                            )
                                        }
                                        required
                                    />
                                </CCol>
                                <CCol md={4}>
                                    <CFormSelect
                                        feedbackValid="Looks good!"
                                        value={track.author}
                                        onChange={(e) =>
                                            handleTrackChange(
                                                trackIndex,
                                                "author",
                                                e.target.value
                                            )
                                        }
                                        required
                                    >
                                        <option value="">
                                            Выберите автора слов
                                        </option>
                                        {members.map((member) => (
                                            <option
                                                key={member.id}
                                                value={member.name_of_member}
                                            >
                                                {member.name_of_member}
                                            </option>
                                        ))}
                                    </CFormSelect>
                                </CCol>
                                {track.participants.length > 0 && (
                                    <CCol md={12}>
                                        <CFormSelect
                                            feedbackValid="Looks good!"
                                            value={
                                                Array.isArray(
                                                    track.participants
                                                )
                                                    ? track.participants
                                                    : [track.participants]
                                            }
                                            readOnly
                                            multiple
                                        >
                                            {track.participants.map(
                                                (participant, index) => (
                                                    <option key={index}>
                                                        {participant}
                                                    </option>
                                                )
                                            )}
                                        </CFormSelect>
                                    </CCol>
                                )}
                                <CCol xs={12}>
                                    <CCol md={4}>
                                        <CFormSelect
                                            feedbackValid="Looks good!"
                                            value={track.selectedParticipant}
                                            onChange={(e) =>
                                                handleParticipantChange(
                                                    trackIndex,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Выберите участника
                                            </option>
                                            {getAvailableMembers(
                                                trackIndex
                                            ).map((member) => (
                                                <option
                                                    key={member.id}
                                                    value={
                                                        member.name_of_member
                                                    }
                                                >
                                                    {member.name_of_member}
                                                </option>
                                            ))}
                                        </CFormSelect>
                                    </CCol>
                                    <CButton
                                        color="success"
                                        type="button"
                                        onClick={() =>
                                            addParticipant(trackIndex)
                                        }
                                        disabled={isAddParticipantButtonDisabled(
                                            trackIndex
                                        )}
                                    >
                                        Добавить участника записи
                                    </CButton>
                                </CCol>
                            </div>
                        ))}
                        <CCol xs={12}>
                            <CButton color="primary" type="submit">
                                Submit form
                            </CButton>
                        </CCol>
                    </CForm>
                </div>
                <AppFooter />
            </div>
        </>
    );
};

export default CreateMusic;
