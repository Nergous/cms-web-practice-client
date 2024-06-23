import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/esm/CardBody";
import CardImg from "react-bootstrap/esm/CardImg";
import axios from "axios";
import { Link } from "react-router-dom";

const CardsMusic = ({ item }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3001/record/${item.id}`);
            alert("Music deleted successfully");
            window.location.reload(true);
        } catch (error) {
            console.error("Error deleting music:", error);
        }
    };

    return (
        <Card
            style={{
                flex: "1 0 20%",
                margin: "10px",
                padding: "20px",
                width: "18rem",
            }}
        >
            <Card.Body>
                <Card.Title>{item.record_name}</Card.Title>
                <hr />
                <CardBody>Дата выпуска: {item.year_of_publish}</CardBody>
                <CardBody>Тип релиза: {item.type_of_record}</CardBody>
                <CardImg
                    src={item.path_to_cover}
                    alt="Card image cap"
                    style={{ width: "250px" }}
                />
                <div style={{marginTop: "30px"}}>
                    <Link to={`/admin/music/${item.id}/edit`}>
                        <Button style={{ marginRight: "10px" }} variant="dark">
                            Редактировать
                        </Button>
                    </Link>
                    <Button
                        style={{ marginRight: "10px" }}
                        variant="danger"
                        onClick={handleDelete}
                    >
                        Удалить
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};
export default CardsMusic;
