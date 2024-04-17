import React, { PureComponent } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
const CardsGigs = ({item}) => {
    return ( 
        <Card style={{flex: "1 0 20%", margin: "10px",  padding: "20px", width: "18rem"}}>
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                    {item.place}
                    <a href='{item.link}'>{item.link}</a>
                </Card.Text>
                <Button style={{marginRight: "10px"}} variant="light">Edit</Button>
                <Button style={{marginRight: "10px"}} variant="info">View</Button>
                <Button style={{marginRight: "10px"}} variant="danger">Delete</Button>
            </Card.Body>
        </Card>
     );
}
 
export default CardsGigs;