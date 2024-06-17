import React, { useState, useEffect } from "react";
import { CForm, CCol, CFormInput, CButton } from "@coreui/react";
import axios from "axios";
import { AppSidebar, AppHeader, AppFooter } from "../../components";
import { useNavigate, useParams } from "react-router-dom";

function EditRole(itemId) {
    const [roleName, setRoleName] = useState("");
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/music_roles/${id}`
                );
                setRoleName(response.data.role_name);
                console.log(response.data.role_name);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

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
            const response = await axios.put(
                `http://localhost:3001/music_roles/${id}`,
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
                                value={roleName}
                                placeholder="Название роли"
                                required
                                onChange={(e) => setRoleName(e.target.value)}
                            />
                        </CCol>
                        <CCol xs={12}>
                            <CButton color="primary" type="submit">
                                Update
                            </CButton>
                        </CCol>
                    </CForm>
                </div>
                <AppFooter />
            </div>
        </>
    );
}

export default EditRole;
