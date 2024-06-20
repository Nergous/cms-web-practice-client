import React, { PureComponent } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

const CardsGigs = ({ item }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3001/gigs/${item.id}`);
            alert("Gig deleted successfully");
            window.location.reload();
        } catch (error) {
            console.error(error);
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
                <Card.Title>{item.title}</Card.Title>
                <hr></hr>
                <Card.Text>
                    <p>{item.place}</p>

                    <a href={item.link_to_social}>{item.link_to_social}</a>
                </Card.Text>
                <Link to={`/admin/gigs/${item.id}/edit`}>
                    <Button style={{ marginRight: "10px" }} variant="light">
                        Edit
                    </Button>
                </Link>
                <Button style={{ marginRight: "10px" }} variant="info">
                    View
                </Button>
                <Button style={{ marginRight: "10px" }} variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
};

export default CardsGigs;
