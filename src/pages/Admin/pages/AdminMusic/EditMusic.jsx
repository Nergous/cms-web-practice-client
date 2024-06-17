import React, { useEffect, useState } from "react";
import { CForm, CFormInput, CCol, CButton, CFormSelect } from "@coreui/react";
import { AppSidebar, AppHeader, AppFooter } from "../../components";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditMusic = () => {
    const [recordName, setRecordName] = useState("");
    const [recordType, setRecordType] = useState("");
    const [cover, setCover] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const [members, setMembers] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [validated, setValidated] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchMembers = async () => {
        try {
            const response = await axios.get("http://localhost:3001/members");
            setMembers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchRecordDetails = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3001/record/${id}`
            );
            const recordData = response.data;
            setRecordName(recordData.record_name || "");
            setRecordType(recordData.type_of_record || "");
            setReleaseYear(recordData.year_of_publish || "");
            setTracks(recordData.tracks || "");
            setCover(recordData.path_to_cover || "");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMembers();
        fetchRecordDetails();
    }, [id]);

    const handleRecordNameChange = (e) => setRecordName(e.target.value);

    const handleTrackChange = (index, field, value) => {
        const newTracks = [...tracks];
        newTracks[index][field] = value;
        setTracks(newTracks);
    };

    const handleCoverChange = (e) => setCover(e.target.files[0]);

    const handleReleaseYearChange = (e) => setReleaseYear(e.target.value);

    const addTrack = () => {
        if (recordType === "single" && tracks.length >= 1) return;

        setTracks([
            ...tracks,
            {
                track_name: "",
                path_to_file: null,
                lyrics_author: "",
                members: [],
                selectedParticipant: "",
            },
        ]);
    };

    const addParticipant = (index) => {
        const newTracks = [...tracks];
        const { selectedParticipant } = newTracks[index];
        if (
            selectedParticipant &&
            !newTracks[index].members.some(
                (mem) => mem.id === selectedParticipant
            )
        ) {
            const participant = members.find(
                (member) => member.id == selectedParticipant
            );

            newTracks[index].members.push(participant);
            console.log(newTracks[index].members);
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
        const selectedMembers = tracks[trackIndex].members;
        return members.filter(
            (member) =>
                !selectedMembers.some(
                    (selectedPerson) => selectedPerson.id === member.id
                )
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
                    track_name: "",
                    path_to_file: null,
                    lyrics_author: "",
                    members: [],
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

        const formData = new FormData();
        formData.append("recordName", recordName);
        formData.append("recordType", recordType);
        formData.append("cover", cover);
        formData.append("releaseYear", releaseYear);

        formData.append("tracks", JSON.stringify(tracks));

        tracks.forEach((track, index) => {
            if (track.file) {
                formData.append(`trackFiles`, track.file);
            }
        });

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const response = await axios.put(
                `http://localhost:3001/record/${id}`,
                formData
            );
            console.log("Response:", response.data);
            navigate("/admin/music");
        } catch (error) {
            console.error("Error updating the form", error);
            alert("Error updating the form");
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
                                value={recordName}
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
                                value={releaseYear}
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
                                        value={track.track_name}
                                        onChange={(e) =>
                                            handleTrackChange(
                                                trackIndex,
                                                "track_name",
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
                                    />
                                </CCol>
                                <CCol md={4}>
                                    <CFormSelect
                                        feedbackValid="Looks good!"
                                        value={track.lyrics_author || ""}
                                        onChange={(e) =>
                                            handleTrackChange(
                                                trackIndex,
                                                "lyrics_author",
                                                e.target.value
                                            )
                                        }
                                        required
                                    >
                                        {members.map((member) => (
                                            <option
                                                key={member.id}
                                                value={member.id}
                                            >
                                                {member.name_of_member}
                                            </option>
                                        ))}
                                    </CFormSelect>
                                </CCol>
                                {track.members.length > 0 && (
                                    <CCol md={12}>
                                        <CFormSelect
                                            feedbackValid="Looks good!"
                                            readOnly
                                            multiple
                                        >
                                            {track.members.map(
                                                (member, index) => (
                                                    <option key={index}>
                                                        {member.name_of_member}
                                                    </option>
                                                )
                                            )}
                                        </CFormSelect>
                                    </CCol>
                                )}
                                {getAvailableMembers(trackIndex).length > 0 && (
                                    <CCol xs={12}>
                                        <CCol md={4}>
                                            <CFormSelect
                                                feedbackValid="Looks good!"
                                                value={
                                                    track.selectedParticipant ||
                                                    ""
                                                }
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
                                                        value={member.id}
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
                                )}
                            </div>
                        ))}
                        <CCol xs={12}>
                            <CButton color="primary" type="submit">
                                Update form
                            </CButton>
                        </CCol>
                    </CForm>
                </div>
                <AppFooter />
            </div>
        </>
    );
};

export default EditMusic;
