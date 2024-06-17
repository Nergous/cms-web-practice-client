import React, { useState } from "react";
import { CForm, CCol, CFormInput, CButton } from "@coreui/react";
import axios from "axios";
import { AppSidebar, AppHeader, AppFooter } from "../../components";
import { useNavigate } from "react-router-dom";

function CreateRole() {
    const [roleName, setRoleName] = useState("");
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        const data = {
            role_name: roleName,
        };
        try {
            const response = await axios.post(
                "http://localhost:3001/music_roles",
                data
            );

            
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
                                id="roleName"
                                label="Роль"
                                placeholder="Название роли"
                                required
                                onChange={(e) => setRoleName(e.target.value)}
                            />
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
}

export default CreateRole;
