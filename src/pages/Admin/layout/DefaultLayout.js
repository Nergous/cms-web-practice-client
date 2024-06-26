import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AppSidebar, AppFooter, AppHeader } from "../components/index";
import { useNavigate } from "react-router-dom";

import { CForm, CFormInput, CButton, CImage } from "@coreui/react";

const DefaultLayout = () => {
    const [text, setText] = useState("");
    const [files, setFiles] = useState(null);
    const [images, setImages] = useState([]);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const textAreaRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadText = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/admin/load"
                );
                setText(response.data.trimRight());
            } catch (error) {
                console.log(error);
            }
        };
        const loadImages = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/admin/images"
                );
                setImages(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        loadText();
        loadImages();
    }, []);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [text]);

    const handleSave = async (event) => {
        try {
            await axios.post("http://localhost:3001/admin/save", { text });
            alert("Текст успешно сохранен");
        } catch (error) {
            alert("Произошла ошибка при сохранении текста");
        }
    };

    const handleFileChange = (event) => {
        setFiles(event.target.files);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        try {
            await axios.post(
                "http://localhost:3001/admin/upload_files",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            alert("Файлы успешно загружены");
            const response = await axios.get(
                "http://localhost:3001/admin/images"
            );
            setImages(response.data);
        } catch (error) {
            alert("Произошла ошибка при загрузке файлов");
        }
    };

    const handleDeleteImage = async (filename) => {
        try {
            await axios.delete(
                `http://localhost:3001/admin/images/${filename}`
            );
            alert("Файл успешно удален");
            // Обновляем список изображений
            const response = await axios.get(
                "http://localhost:3001/admin/images"
            );
            setImages(response.data);
        } catch (error) {
            alert("Произошла ошибка при удалении файла");
        }
    };

    const handleUpdateCredentials = async () => {
        try {
            await axios.post("http://localhost:3001/admin/update_credentials", {
                login,
                password,
            });
            alert("Логин и пароль успешно обновлены");
            navigate("/admin");
        } catch (error) {
            alert("Произошла ошибка при обновлении логина и пароля");
        }
    };

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1" style={{ margin: "30px" }}>
                    Текст на главной странице
                    <CForm style={{ margin: "30px 0" }}>
                        <textarea
                            ref={textAreaRef}
                            id="exampleFormControlTextarea1"
                            style={{
                                resize: "none",
                                overflow: "hidden",
                                width: "100%",
                            }}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </CForm>
                    <CButton color="primary" onClick={handleSave}>
                        Сохранить
                    </CButton>
                    <CForm style={{ margin: "30px 0" }}>
                        <CFormInput
                            type="file"
                            multiple
                            onChange={handleFileChange}
                        />
                    </CForm>
                    <CButton color="primary" onClick={handleUpload}>
                        Загрузить файлы
                    </CButton>
                    <div style={{ margin: "30px 0" }}>
                        {images.map((image, index) => (
                            <div
                                key={index}
                                style={{
                                    position: "relative",
                                    display: "inline-block",
                                    margin: "10px",
                                }}
                            >
                                <CImage
                                    src={`/uploads/carousel/${image}`}
                                    alt={image}
                                    style={{ maxWidth: "200px" }}
                                />
                                <CButton
                                    color="danger"
                                    size="sm"
                                    style={{
                                        position: "absolute",
                                        top: "5px",
                                        right: "5px",
                                    }}
                                    onClick={() => handleDeleteImage(image)}
                                >
                                    Удалить
                                </CButton>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h3>Изменить логин и пароль</h3>
                        <CForm style={{ margin: "30px 0" }}>
                            <CFormInput
                                type="text"
                                placeholder="Новый логин"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                            <CFormInput
                                type="password"
                                placeholder="Новый пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </CForm>
                        <CButton
                            color="primary"
                            onClick={handleUpdateCredentials}
                        >
                            Обновить логин и пароль
                        </CButton>
                    </div>
                </div>
                <AppFooter />
            </div>
        </div>
    );
};

export default DefaultLayout;
