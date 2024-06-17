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
                <CardBody>{item.year_of_publish}</CardBody>
                <CardBody>{item.type_of_record}</CardBody>
                <CardImg
                    src={item.path_to_cover}
                    alt="Card image cap"
                    style={{ width: "250px" }}
                />
                <Link to={`/admin/music/${item.id}/edit`}>
                    <Button style={{ marginRight: "10px" }} variant="dark">
                        Edit
                    </Button>
                </Link>
                <Button
                    style={{ marginRight: "10px" }}
                    variant="danger"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
};
export default CardsMusic;
