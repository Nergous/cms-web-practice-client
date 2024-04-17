import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardsMusic = ({item}) => {
    return (
        <Card style={{flex: "1 0 20%", margin: "10px",  padding: "20px", width: "18rem"}}>
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                    {item.duration}
                </Card.Text>
                <Button style={{marginRight: "10px"}} variant="light">Edit</Button>
                <Button style={{marginRight: "10px"}} variant="info">View</Button>
                <Button style={{marginRight: "10px"}} variant="danger">Delete</Button>
            </Card.Body>
        </Card>
    );
};
export default CardsMusic;
