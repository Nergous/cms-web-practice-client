import React from "react";
import { CForm, CCol, CFormInput, CButton, CFormSelect } from "@coreui/react";
import { AppSidebar, AppHeader, AppFooter } from "../../components";
import { useState } from "react";
import { Link } from "react-router-dom";

const CreateGigs = () => {
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState("");
    const [socialLink, setSocialLink] = useState("");
    const [venue, setVenue] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("soon");
    const [participants, setParticipants] = useState([]);
    const [availableParticipants, setAvailableParticipants] = useState([
        "Participant1",
        "Participant2",
        "Participant3",
    ]);
    const [showParticipantSelect, setShowParticipantSelect] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState("");

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const addParticipant = () => {
        if (selectedParticipant) {
            setParticipants([...participants, selectedParticipant]);
            setAvailableParticipants(
                availableParticipants.filter((p) => p !== selectedParticipant)
            );
            setSelectedParticipant("");
            setShowParticipantSelect(false);
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
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <CCol md={6}>
                            <CFormInput
                                type="text"
                                feedbackValid="Looks good!"
                                id="title"
                                label="Название выступления"
                                placeholder="Название выступления"
                                required
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="url"
                                feedbackValid="Looks good!"
                                id="socialLink"
                                label="Ссылка на соц сети"
                                placeholder="Ссылка на соц сети"
                                required
                                onChange={(e) => setSocialLink(e.target.value)}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="text"
                                feedbackValid="Looks good!"
                                id="venue"
                                label="Место проведения"
                                placeholder="Место проведения"
                                required
                                onChange={(e) => setVenue(e.target.value)}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="date"
                                feedbackValid="Looks good!"
                                id="date"
                                label="Дата проведения"
                                placeholder="01.01.2001"
                                required
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormSelect
                                feedbackValid="Looks good!"
                                id="status"
                                label="Статус"
                                required
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="soon">Soon</option>
                                <option value="completed">Completed</option>
                                <option value="canceled">Canceled</option>
                            </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                            <CButton
                                color="primary"
                                onClick={() => setShowParticipantSelect(true)}
                                disabled={availableParticipants.length === 0}
                            >
                                Добавить участника
                            </CButton>
                            {showParticipantSelect && (
                                <CFormSelect
                                    feedbackValid="Looks good!"
                                    id="participantSelect"
                                    label="Выберите участника"
                                    value={selectedParticipant}
                                    onChange={(e) =>
                                        setSelectedParticipant(e.target.value)
                                    }
                                >
                                    <option value="">Выберите участника</option>
                                    {availableParticipants.map(
                                        (participant, index) => (
                                            <option
                                                key={index}
                                                value={participant}
                                            >
                                                {participant}
                                            </option>
                                        )
                                    )}
                                </CFormSelect>
                            )}
                            {showParticipantSelect && (
                                <CButton
                                    color="success"
                                    onClick={addParticipant}
                                >
                                    Добавить
                                </CButton>
                            )}
                            <CFormSelect
                                feedbackValid="Looks good!"
                                id="participants"
                                label="Участники"
                                multiple
                                value={participants}
                                readOnly
                            >
                                {participants.map((participant, index) => (
                                    <option key={index} value={participant}>
                                        {participant}
                                    </option>
                                ))}
                            </CFormSelect>
                        </CCol>
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

export default CreateGigs;
