import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    CForm,
    CCol,
    CFormInput,
    CButton,
    CFormSelect,
    CListGroup,
    CListGroupItem,
    CFormCheck,
} from "@coreui/react";
import { AppSidebar, AppHeader, AppFooter } from "../../components";

function CreateMembers() {
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
    const [isNotMember, setIsNotMember] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/music_roles"
                );
                setRoles(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRoles();
    }, []);

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
            if (isNotMember) {
                const data = {
                    name_of_member: name,
                    nickname: "no nickname",
                    description: description,
                    date_start: "1999-01-01",
                    date_end: "1999-01-02",
                    img: "no img",
                    is_member: 0,
                };

                try {
                    await axios.post("http://localhost:3001/members", data);
                    alert("Участник успешно добавлен");
                    navigate("/admin/members");
                } catch (error) {
                    alert("Произошла ошибка при добавлении участника");
                }
            } else {
                const formData = new FormData();
                formData.append("name_of_member", name);
                formData.append("nickname", nickname);
                formData.append("description", description);
                formData.append("date_start", dateStart);
                formData.append("date_end", dateEnd);
                formData.append("is_member", 1);
                formData.append("img", img);

                selectedRoles.forEach((role) => {
                    formData.append("roles[]", role);
                });

                try {
                    await axios.post("http://localhost:3001/members", formData);
                    alert("Участник успешно добавлен");
                    navigate("/admin/members");
                } catch (error) {
                    alert("Произошла ошибка при добавлении участника");
                }
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
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                feedbackValid="Всё в порядке!"
                                id="name"
                                label="Имя"
                                placeholder="Имя"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </CCol>
                        {isNotMember && (
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    placeholder="Ссылка на человека (группу)"
                                    feedbackValid="Всё в порядке!"
                                    id="description"
                                    label="Ссылка на человека (группу)"
                                    required
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </CCol>
                        )}
                        {!isNotMember && (
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    placeholder="Описание"
                                    feedbackValid="Всё в порядке!"
                                    id="description"
                                    label="Описание"
                                    required
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </CCol>
                        )}

                        <CCol md={4}>
                            <CFormCheck
                                type="checkbox"
                                id="isNotMember"
                                label="Не является участником"
                                checked={isNotMember}
                                onChange={(e) =>
                                    setIsNotMember(e.target.checked)
                                }
                            />
                        </CCol>
                        {!isNotMember && (
                            <>
                                <CCol md={4}>
                                    <CFormInput
                                        type="text"
                                        placeholder="Прозвище"
                                        feedbackValid="Всё в порядке!"
                                        id="nickname"
                                        label="Сценическое прозвище (необязательно)"
                                        onChange={(e) =>
                                            setNickname(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                            setDateStart(e.target.value)
                                        }
                                    />
                                </CCol>
                                <CCol md={4}>
                                    <CFormInput
                                        type="date"
                                        placeholder="01.01.2001"
                                        feedbackValid="Всё в порядке!"
                                        id="date_end"
                                        label="Дата окончания (необязательно)"
                                        onChange={(e) =>
                                            setDateEnd(e.target.value)
                                        }
                                    />
                                </CCol>
                                {availableRoles.length > 0 && (
                                    <>
                                        <CCol md={4}>
                                            <CFormSelect
                                                id="role"
                                                label="Роль"
                                                required={
                                                    selectedRoles.length === 0
                                                }
                                                value={selectedRole}
                                                onChange={(e) =>
                                                    setSelectedRole(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Выберите роль
                                                </option>
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
                                                    (r) =>
                                                        r.id.toString() ===
                                                        roleId
                                                );
                                                return (
                                                    <CListGroupItem
                                                        key={roleId}
                                                    >
                                                        {role?.role_name}
                                                        <CButton
                                                            color="danger"
                                                            size="sm"
                                                            className="float-end"
                                                            onClick={() =>
                                                                handleRemoveRole(
                                                                    roleId
                                                                )
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
                                        id="img"
                                        feedbackInvalid="Неверный формат файла"
                                        aria-label="file example"
                                        required
                                        onChange={(e) =>
                                            setImg(e.target.files[0])
                                        }
                                    />
                                </CCol>
                            </>
                        )}

                        {((selectedRoles.length > 0) || (isNotMember === true)) && (
                            <CCol xs={12}>
                                <CButton color="primary" type="submit">
                                    Сохранить
                                </CButton>
                            </CCol>
                        )}
                        {availableRoles.length === 0 && selectedRoles.length === 0 && (
                            <CCol xs={12}>
                                <p className="text-danger">
                                    Нет доступных ролей
                                </p>
                            </CCol>
                        )}
                    </CForm>
                </div>
                <AppFooter />
            </div>
        </>
    );
}

export default CreateMembers;
