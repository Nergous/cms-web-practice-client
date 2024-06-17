import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CForm, CCol, CFormInput, CButton } from "@coreui/react";
import axios from "axios";

import { AppSidebar, AppHeader, AppFooter } from "../../components";

// Компонент для редактирования члена команды
function EditMembers() {
    // Получаем идентификатор члена команды из параметров URL
    const { id } = useParams();
    // Состояния для хранения значений полей формы
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [description, setDescription] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState(null);
    const [img, setImg] = useState(null);
    const [validated, setValidated] = useState(false);

    // Эффект для получения данных члена команды при монтировании компонента
    useEffect(() => {
        const fetchMember = async () => {
            try {
                // Отправляем GET-запрос на сервер для получения данных члена команды по идентификатору
                const response = await axios.get(
                    `http://localhost:3001/members/${id}`
                );
                const member = response.data;
                // Заполняем состояния данными члена команды
                setName(member.name_of_member);
                setNickname(member.nickname);
                setDescription(member.description);
                setDateStart(member.date_start);
                if (member.date_end) {
                    setDateEnd(member.date_end);
                } else {
                    setDateEnd("");
                }

                setImg(member.path_to_photo);
                // Предполагается, что фотография уже загружена на сервер и в member.path_to_photo содержится путь к ней
                // Если фотография не загружена, то здесь нужно будет установить состояние img
            } catch (error) {
                console.error(error);
            }
        };
        fetchMember();
    }, [id]); // Зависимость от id, чтобы эффект выполнялся при изменении id

    // Обработчик отправки формы
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        // Валидация формы
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        const formData = new FormData();
        formData.append("name_of_member", name);
        console.log(name);
        formData.append("nickname", nickname);
        console.log(nickname);
        formData.append("description", description);
        console.log(description);
        formData.append("date_start", dateStart);
        console.log(dateStart);
        formData.append("date_end", dateEnd);
        console.log(dateEnd);
        formData.append("img", img);
        console.log(img);

        console.log(formData);

        try {
            // Отправляем PUT-запрос на сервер для обновления данных члена команды
            const response = await axios.put(
                `http://localhost:3001/members/${id}`,
                formData
            );
            console.log("Попал");
            console.log(response.data);
        } catch (error) {
            console.log("Не Попал");
            console.error(error);
        }
    };

    const handleDateEndChange = (e) => {
        console.log("Date end changed");
        const value = e.target.value;
        // Если значение пустая строка, устанавливаем null, иначе устанавливаем значение
        setDateEnd(value === "" ? "" : value);
    };

    // Рендер компонентов
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
                                feedbackValid="Looks good!"
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
                                feedbackValid="Looks good!"
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
                                feedbackValid="Looks good!"
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
                                feedbackValid="Looks good!"
                                id="date_end"
                                label="Дата окончания"
                                value={dateEnd || ""}
                                onChange={handleDateEndChange}
                            />
                        </CCol>

                        <CFormInput
                            type="file"
                            id="path_to_photo"
                            feedbackInvalid="Example invalid form file feedback"
                            aria-label="file example"
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

export default EditMembers;
