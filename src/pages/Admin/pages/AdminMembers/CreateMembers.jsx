import React from "react";
import { useState } from "react";
import { CForm, CCol, CFormInput, CButton } from "@coreui/react";

import { AppSidebar, AppHeader, AppFooter } from "../../components";
import axios from "axios";
import { useEffect } from "react";

function CreateMembers() {
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [description, setDescription] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [img, setImg] = useState(null);

    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        const formData = new FormData();
        formData.append("name_of_member", name);
        formData.append("nickname", nickname);
        formData.append("description", description);
        formData.append("date_start", dateStart);
        formData.append("date_end", dateEnd);
        formData.append("img", img);

        try {
            const response = await axios.post(
                "http://localhost:3001/members",
                formData
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
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
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                feedbackValid="Looks good!"
                                id="name"
                                label="Имя"
                                placeholder="Имя"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </CCol>
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                placeholder="Прозвище"
                                feedbackValid="Looks good!"
                                id="nickname"
                                label="Сценическое прозвище (необязательно)"
                                onChange={(e) => setNickname(e.target.value)}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="text"
                                placeholder="Описание"
                                feedbackValid="Looks good!"
                                id="description"
                                label="Описание"
                                required
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </CCol>
                        <CCol md={4}>
                            <CFormInput
                                type="date"
                                placeholder="01.01.2001"
                                feedbackValid="Looks good!"
                                id="date_start"
                                label="Дата вступления"
                                required
                                onChange={(e) => setDateStart(e.target.value)}
                            />
                        </CCol>

                        <CCol md={4}>
                            <CFormInput
                                type="date"
                                placeholder="01.01.2001"
                                feedbackValid="Looks good!"
                                id="date_end"
                                label="Дата окончания"
                                onChange={(e) => setDateEnd(e.target.value)}
                            />
                        </CCol>

                        <CFormInput
                            type="file"
                            id="img"
                            feedbackInvalid="Example invalid form file feedback"
                            aria-label="file example"
                            required
                            onChange={(e) => setImg(e.target.files[0])}
                        />

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
}

export default CreateMembers;
