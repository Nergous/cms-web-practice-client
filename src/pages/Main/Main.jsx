import React, { useState, useEffect } from "react";
import axios from "axios";
import CarouselMy from "../../components/Carousel/CarouselMy";

import cl from "./Main.module.css";

const Main = () => {
    const [hasImages, setHasImages] = useState(false);
    const [images, setImages] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/admin/images"
                );

                setHasImages(response.data.length > 0);
                setImages(response.data);
            } catch (error) {
                console.error("Ошибка при проверке наличия изображений", error);
                setHasImages(false);
            }
        };

        const fetchText = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/admin/load"
                );
                setText(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchImages();
        fetchText();
    }, []);

    return (
        <>
            <div>{hasImages && <CarouselMy imgs={images} />}</div>
            <div className={cl.text}>{text}</div>
        </>
    );
};

export default Main;
