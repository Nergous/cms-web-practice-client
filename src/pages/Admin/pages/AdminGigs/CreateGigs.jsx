import React, { useEffect } from "react";
import {
    CForm,
    CCol,
    CFormInput,
    CButton,
    CFormSelect,
    CListGroup,
    CListGroupItem,
} from "@coreui/react";
import { AppSidebar, AppHeader, AppFooter } from "../../components";
import { useState } from "react";
import axios from "axios";

const CreateGigs = () => {
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState("");
    const [socialLink, setSocialLink] = useState("");
    const [venue, setVenue] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("soon");
    const [participants, setParticipants] = useState([]);
    const [selectedParticipantId, setSelectedParticipantId] = useState("");
    const [availableParticipants, setAvailableParticipants] = useState([]);

    const getMembers = () => {
        axios
            .get("http://localhost:3001/members")
            .then((response) => {
                setAvailableParticipants(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getMembers();
    }, []);

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
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        const data = {
            title: title,
            social_link: socialLink,
            venue: venue,
            date: date,
            status: status,
            participants: participants,
        };

        axios
            .post("http://localhost:3001/gigs", data)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        setValidated(true);
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
                            <CFormSelect
                                value={selectedParticipantId}
                                onChange={(e) =>
                                    setSelectedParticipantId(e.target.value)
                                }
                                label="Select Participant"
                            >
                                <option value="">Choose...</option>
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
                        <CCol md={6}>
                            <CButton
                                color="primary"
                                onClick={handleAddParticipant}
                                disabled={!availableParticipants.length}
                            >
                                Add Participant
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
