import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import './events.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

function Events() {
    const [events, setEvents] = useState(undefined);

    function requestInterested(event) {
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
            url: import.meta.env.VITE_APP_API_URL + ':' + import.meta.env.VITE_APP_API_PORT + '/interested',
            headers: { 
              'Content-Type': 'application/json', 
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            data : data
        };
          
        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            if (response.data.msg == "Interested updated successfully") {
                fetchEvents();
            }
        })
        .catch((error) => {
            console.log(error);
            if ( error.response.status === 422 ) {
                window.location.href = "/login";
            }
        });
    }

    function requestNotInterested(event) {
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
            url: import.meta.env.VITE_APP_API_URL + ':' + import.meta.env.VITE_APP_API_PORT + '/not_interested',
            headers: { 
              'Content-Type': 'application/json', 
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            data : data
        };
          
        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            if (response.data.msg == "Interested updated successfully") {
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
            url: import.meta.env.VITE_APP_API_URL + ':' + import.meta.env.VITE_APP_API_PORT + '/get_event',
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
        });
    }
    
    useEffect(()=> {
        fetchEvents();
    }, []);
    return (
        
        <Container>
            {events !== undefined && events.length === 0 && (
                <div className="col-auto text-dark fs-5 text-center mt-4">
                    No events at the moment
                </div>
            )}
            <Row className='justify-content-center'>
            {events !== undefined && events.length !== 0 && events.map((event, index) => (
            <Col xs={11} sm={10} md={6} xl={4} className='mt-4' key={index}>
                <Card>
                    <Card.Img variant="top" src={event.image} />
                    <Card.Body className='h-100'>
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
                        {event.interested.length !== 0 && event.interested.indexOf(localStorage.getItem('email')) !== -1 && <Button variant="primary" className='bg-green' disabled value={event.title}>Interested</Button>}
                        {event.interested.indexOf(localStorage.getItem('email')) === -1 && <Button variant="primary" className='bg-green' onClick={requestInterested} value={event.title}>Interested</Button>}
                    </Card.Body>
                </Card>
            </Col>
            ))}
            </Row>
        </Container>
    );
}

export default Events;