import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardsMembers = ({ item }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3001/members/${item.id}`);
            alert("Member deleted successfully");
            window.location.reload(true);
        } catch (error) {
            console.error("Error deleting member:", error);
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
                <Card.Title>{item.name_of_member}</Card.Title>
                <hr />
                <Card.Text>{item.description}</Card.Text>
                <div style={{ marginTop: "30px" }}>
                    <Link to={`/admin/members/${item.id}/edit`}>
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
export default CardsMembers;
