import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
    CForm,
    CCol,
    CFormInput,
    CButton,
    CFormSelect,
    CListGroup,
    CListGroupItem,
    CFormLabel,
} from "@coreui/react";
import { AppSidebar, AppHeader, AppFooter } from "../../components";

const EditGigs = () => {
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState("");
    const [socialLink, setSocialLink] = useState("");
    const [venue, setVenue] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("soon");
    const [participants, setParticipants] = useState([]);
    const [selectedParticipantId, setSelectedParticipantId] = useState("");
    const [availableParticipants, setAvailableParticipants] = useState([]);
    const [poster, setPoster] = useState(null);
    const navigate = useNavigate();

    const { id } = useParams();

    const getMembers = async () => {
        try {
            const response = await axios.get("http://localhost:3001/members");
            const data = response.data;

            setAvailableParticipants(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (availableParticipants.length > 0 && participants.length > 0) {
            const filteredMembers = availableParticipants.filter(
                (member) => !participants.some((p) => p.id == member.id)
            );
            setAvailableParticipants(filteredMembers);
        }
    }, [participants, availableParticipants]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/gig_members"
                );
                const participantsAll = response.data;
                const participants = participantsAll.filter(
                    (p) => p.id_gig == id
                );
                const participant_data = await Promise.all(
                    participants.map(async (p) => {
                        const response = await axios.get(
                            `http://localhost:3001/members/${p.id_member}`
                        );
                        return response.data;
                    })
                );
                setParticipants(participant_data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchGig = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/gigs/${id}`
                );
                const gig = response.data;
                setTitle(gig.title);
                setSocialLink(gig.link_to_social);
                setVenue(gig.place);
                setDate(gig.date_of_gig);
                setStatus(gig.gig_status);
                setPoster(gig.path_to_poster);

                await fetchMembers();
                await getMembers();
            } catch (error) {
                console.error(error);
            }
        };

        fetchGig();
    }, [id]);

    const handleAddParticipant = () => {
        const selectedParticipant = availableParticipants.find(
            (p) => p.id == selectedParticipantId
        );
        if (selectedParticipant) {
            setParticipants([...participants, selectedParticipant]);
            setAvailableParticipants(
                availableParticipants.filter(
                    (p) => p.id != selectedParticipantId
                )
            );
            setSelectedParticipantId("");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);

        if (form.checkValidity() !== false) {
            const formData = new FormData();

            formData.append("title", title);
            formData.append("social_link", socialLink);
            formData.append("venue", venue);
            formData.append("date", date);
            formData.append("status", status);
            participants.forEach((participant, index) => {
                formData.append(`participants[${index}][id]`, participant.id);
            });
            formData.append("poster", poster);

            axios
                .put("http://localhost:3001/gigs/" + id + "", formData)
                .then((response) => {
                    alert("Выступление успешно обновлено");
                    navigate("/admin/gigs");
                })
                .catch((error) => {
                    alert("Произошла ошибка при обновлении выступления");
                });
        }
    };

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1" style={{ margin: "30px" }}>
                    <CForm
                        className="row g-3 needs-validation"
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                feedbackValid="Всё хорошо!"
                                id="title"
                                label="Название выступления"
                                placeholder="Название выступления"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </CCol>
                        <CCol md={4}>
                            <CFormInput
                                type="url"
                                feedbackValid="Всё хорошо!"
                                id="socialLink"
                                label="Ссылка на соц сети"
                                placeholder="Ссылка на соц сети"
                                value={socialLink}
                                required
                                onChange={(e) => setSocialLink(e.target.value)}
                            />
                        </CCol>
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                feedbackValid="Всё хорошо!"
                                id="venue"
                                label="Место проведения"
                                placeholder="Место проведения"
                                value={venue}
                                required
                                onChange={(e) => setVenue(e.target.value)}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="date"
                                feedbackValid="Всё хорошо!"
                                id="date"
                                label="Дата проведения"
                                placeholder="01.01.2001"
                                value={date}
                                required
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormSelect
                                feedbackValid="Всё хорошо!"
                                id="status"
                                label="Статус"
                                required
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="soon">Скоро</option>
                                <option value="completed">Завершен</option>
                                <option value="canceled">Отменен</option>
                            </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                            <CFormSelect
                                value={selectedParticipantId}
                                onChange={(e) =>
                                    setSelectedParticipantId(e.target.value)
                                }
                                label="Добавить участника выступления"
                            >
                                <option value="">Выбрать участника</option>
                                {availableParticipants.map((participant) => (
                                    <option
                                        key={participant.id}
                                        value={participant.id}
                                    >
                                        {participant.name_of_member}
                                    </option>
                                ))}
                            </CFormSelect>
                        </CCol>
                        <CCol md={12}>
                            <CButton
                                color="primary"
                                onClick={handleAddParticipant}
                                disabled={!availableParticipants.length}
                            >
                                Добавить участника
                            </CButton>
                        </CCol>
                        <CCol md={12}>
                            <CListGroup>
                                {participants.map((participant) => (
                                    <CListGroupItem key={participant.id}>
                                        {participant.name_of_member}
                                    </CListGroupItem>
                                ))}
                            </CListGroup>
                        </CCol>
                        <CCol md={12}>
                            <CFormLabel htmlFor="poster">Афиша</CFormLabel>
                            <CFormInput
                                type="file"
                                feedbackValid="Всё хорошо!"
                                id="poster"
                                required
                                onChange={(e) => setPoster(e.target.files[0])}
                            />
                        </CCol>

                        <CCol xs={12}>
                            <CButton color="primary" type="submit">
                                Обновить
                            </CButton>
                        </CCol>
                    </CForm>
                </div>
                <AppFooter />
            </div>
        </>
    );
};

export default EditGigs;
