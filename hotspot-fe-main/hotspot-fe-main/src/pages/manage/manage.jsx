import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import './manage.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

function Manage() {
    const [events, setEvents] = useState(undefined);

    function deleteEvent(event) {
        event.preventDefault();
        // Get the user email from local storage
        let email = localStorage.getItem('email');
        let data = JSON.stringify({
            "title": event.target.value,
            "email": email
        });

        console.log(data);
          
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: import.meta.env.VITE_APP_API_URL + ':' + import.meta.env.VITE_APP_API_PORT + '/delete_event',
            headers: { 
              'Content-Type': 'application/json', 
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            data : data
        };
          
        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            if (response.data.msg == "Event deleted successfully") {
                fetchEvents();
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }


    function fetchEvents() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: import.meta.env.VITE_APP_API_URL + ':' + import.meta.env.VITE_APP_API_PORT + '/get_event_user',
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('token'),
            },
        };
          
        axios.request(config)
        .then((response) => {
            setEvents(response.data);
        })
        .catch((error) => {
            console.log(error);
            if ( error.response.status === 422 ) {
                window.location.href = "/login";
            }
        });
    }
    
    useEffect(()=> {
        fetchEvents();
    }, []);
    return (
        
        <Container>
            {events !== undefined && events.length === 0 && (
                <div className="col-auto text-dark fs-5 text-center mt-4">
                    No events created
                </div>
            )}
            <Row>
            {events !== undefined && events.length !== 0 && events.map((event, index) => (
            <Col md={6} className='mt-4' key={index}>
                <Card className='w-100'>
                    <Card.Img variant="top" src={event.image} />
                    <Card.Body>
                        <Card.Title className='text-center'>{event.title}</Card.Title>
                        <Card.Text className='text-dark'>
                        {event.description}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item><b>Location:</b> &nbsp; {event.location}</ListGroup.Item>
                        <ListGroup.Item><b>Date:</b> &nbsp; {event.date}</ListGroup.Item>
                        <ListGroup.Item><b>Time:</b> &nbsp; {event.time}</ListGroup.Item>
                        <ListGroup.Item><b>Entry fees:</b> &nbsp; {event.entry_fees}</ListGroup.Item>
                        <ListGroup.Item><b>Interested:</b> &nbsp; {event.interested.length}</ListGroup.Item>
                    </ListGroup>
                    {/* Put the Logic here to disable interesting or uninteresting for this specific user */}
                    <Card.Body className='d-flex justify-content-center'>
                    <Button variant="primary" className='bg-danger' onClick={deleteEvent} value={event.title}>Delete event</Button>
                    </Card.Body>
                </Card>
            </Col>
            ))}
            </Row>
        </Container>
    );
}

export default Manage;