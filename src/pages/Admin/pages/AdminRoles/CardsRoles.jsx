import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link } from "react-router-dom";

const CardsRoles = ({ item }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3001/music_roles/${item.id}`);
            alert("Role deleted successfully");
            window.location.reload(true);
        } catch (error) {
            console.error("Error deleting role:", error);
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
                <Card.Title>{item.role_name}</Card.Title>
                <hr />
                <div style={{ marginTop: "30px" }}>
                    <Link to={`/admin/roles/${item.id}/edit`}>
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
export default CardsRoles;
