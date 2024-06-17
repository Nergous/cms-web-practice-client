import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import axios from "axios";

const CardsMembers = ({ item }) => {

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3001/members/${item.id}`);
            alert("Member deleted successfully");
        } catch (error) {
            console.error('Error deleting member:', error);
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
                <Card.Text>{item.description}</Card.Text>
                <Link to={`/admin/members/${item.id}/edit`}>
                    <Button style={{ marginRight: "10px" }} variant="dark">
                        Edit
                    </Button>
                </Link>
                {/* <Button style={{ marginRight: "10px" }} variant="info">
                    View
                </Button> */}
                <Button style={{ marginRight: "10px" }} variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
};
export default CardsMembers;
