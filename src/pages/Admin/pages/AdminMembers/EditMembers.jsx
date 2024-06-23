import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

function EditMembers() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [description, setDescription] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [img, setImg] = useState(null);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/members/${id}`
                );
                const member = response.data;
                setName(member.name_of_member);
                setNickname(member.nickname);
                setDescription(member.description);
                setDateStart(member.date_start);
                setDateEnd(member.date_end || "");
                setImg(member.path_to_photo);

                const rolesResponse = await axios.get(`http://localhost:3001/member_roles`);
                const memberRoles = rolesResponse.data
                    .filter((role) => role.id_member === parseInt(id))
                    .map((role) => role.id_role.toString());
                setSelectedRoles(memberRoles);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchRoles = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/music_roles"
                );
                setRoles(response.data);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };

        fetchMember();
        fetchRoles();
    }, [id]);

    const handleAddRole = () => {
        if (selectedRole && !selectedRoles.includes(selectedRole)) {
            setSelectedRoles([...selectedRoles, selectedRole]);
            setSelectedRole("");
        }
    };

    const handleRemoveRole = (roleToRemove) => {
        setSelectedRoles(selectedRoles.filter((role) => role !== roleToRemove));
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        if (form.checkValidity() !== false) {
            const formData = new FormData();
            formData.append("name_of_member", name);
            formData.append("nickname", nickname);
            formData.append("description", description);
            formData.append("date_start", dateStart);
            formData.append("date_end", dateEnd);
            formData.append("img", img);

            selectedRoles.forEach((role) => {
                formData.append("roles[]", role);
            });


            try {
                await axios.put(
                    `http://localhost:3001/members/${id}`,
                    formData
                );
                alert("Член команды успешно обновлен");
                navigate("/admin/members");
            } catch (error) {
                alert("Произошла ошибка при обновлении члена команды");
            }
        }
    };

    const availableRoles = roles.filter(
        (role) => !selectedRoles.includes(role.id.toString())
    );

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1" style={{ margin: "30px" }}>
                    <CForm
                        className="row g-3 needs-validation"
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                feedbackValid="Всё в порядке!"
                                id="name_of_member"
                                label="Имя"
                                placeholder="Имя"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </CCol>
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                placeholder="Прозвище"
                                feedbackValid="Всё в порядке!"
                                id="nickname"
                                label="Сценическое прозвище (необязательно)"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="text"
                                placeholder="Описание"
                                feedbackValid="Всё в порядке!"
                                id="description"
                                label="Описание"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </CCol>
                        <CCol md={4}>
                            <CFormInput
                                type="date"
                                placeholder="01.01.2001"
                                feedbackValid="Всё в порядке!"
                                id="date_start"
                                label="Дата вступления"
                                required
                                value={dateStart}
                                onChange={(e) => setDateStart(e.target.value)}
                            />
                        </CCol>

                        <CCol md={4}>
                            <CFormInput
                                type="date"
                                placeholder="01.01.2001"
                                feedbackValid="Всё в порядке!"
                                id="date_end"
                                label="Дата окончания (необязательно)"
                                value={dateEnd}
                                onChange={(e) => setDateEnd(e.target.value)}
                            />
                        </CCol>

                        {availableRoles.length > 0 && (
                            <>
                                <CCol md={4}>
                                    <CFormSelect
                                        id="role"
                                        label="Роль"
                                        value={selectedRole}
                                        onChange={(e) =>
                                            setSelectedRole(e.target.value)
                                        }
                                    >
                                        <option value="">Выберите роль</option>
                                        {availableRoles.map((role) => (
                                            <option
                                                key={role.id}
                                                value={role.id}
                                            >
                                                {role.role_name}
                                            </option>
                                        ))}
                                    </CFormSelect>
                                </CCol>
                                <CCol md={4}>
                                    <CButton
                                        color="primary"
                                        onClick={handleAddRole}
                                        disabled={!selectedRole}
                                    >
                                        Добавить роль
                                    </CButton>
                                </CCol>
                            </>
                        )}

                        {selectedRoles.length > 0 && (
                            <CCol md={12}>
                                <CListGroup>
                                    {selectedRoles.map((roleId) => {
                                        const role = roles.find(
                                            (r) => r.id.toString() === roleId
                                        );
                                        return (
                                            <CListGroupItem key={roleId}>
                                                {role?.role_name}
                                                <CButton
                                                    color="danger"
                                                    size="sm"
                                                    className="float-end"
                                                    onClick={() =>
                                                        handleRemoveRole(roleId)
                                                    }
                                                >
                                                    Удалить
                                                </CButton>
                                            </CListGroupItem>
                                        );
                                    })}
                                </CListGroup>
                            </CCol>
                        )}

                        <CCol md={4}>
                            <CFormInput
                                type="file"
                                id="path_to_photo"
                                feedbackInvalid="Неверный формат файла"
                                aria-label="file example"
                                onChange={(e) => setImg(e.target.files[0])}
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
}

export default EditMembers;
