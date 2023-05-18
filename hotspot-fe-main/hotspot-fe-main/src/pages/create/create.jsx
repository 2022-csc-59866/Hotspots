import {GoSignIn} from 'react-icons/go';
import {MdAddTask} from 'react-icons/md';
import './create.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUpload } from 'react-icons/fa';

function Create() {
    const [eventInformation, setEventInformation] = useState({
        title: '',
        location: '',
        description: '',
        date: '',
        time: '',
        entry_fees: 0,
        image: ''
    });
    const [error, setError] = useState('');

    function handleImageUpload(event) {
        const element = event.target.files[0];
        let reader = new FileReader();
        reader.addEventListener('load', () => {
            // console.log(reader.result);
            setEventInformation({
                ...eventInformation,
                image: reader.result,
            });
        });
        reader.readAsDataURL(element);
    }

    useEffect(() => {
        if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {
            window.location.href = "/login";
        }
    });
    function submitHandler(event) {
        event.preventDefault();
        console.log(eventInformation);

        let data = JSON.stringify(eventInformation);
          
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: import.meta.env.VITE_APP_API_URL + ':' + import.meta.env.VITE_APP_API_PORT + '/create_event',
            headers: { 
              'Content-Type': 'application/json', 
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            data: data
        };
          
        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                if (response.data.msg == "Event created successfully") {
                    window.location.href = "/";
                } else if (response.data.msg == "Event already exists") {
                    setError("Event already exists");
                } else {
                    localStorage.removeItem('token');
                    window.location.href = "/login";
                }
            })
            .catch((error) => {
                console.log(error);
                if ( error.response.status === 422 ) {
                    window.location.href = "/login";
                }
            });
    }
    return (
        <div className="row justify-content-center mt-4">
            <div className="col-4">
                <div className="card text-center">
                <div className="card-body">
                    <h2 className="d-flex justify-content-center align-items-center card-title font-weight-set">
                        <MdAddTask size={42} style={{marginRight: '5px'}}></MdAddTask>Create Event
                    </h2>
                    <div className="mt-4 pt-4"></div>
                    <div className="form-floating mb-3">
                        <input 
                        type="text" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="Title"
                        onInput={(e) => {
                            setEventInformation({
                                ...eventInformation,
                                title: e.target.value,
                            });
                        }}/>
                        <label htmlFor="floatingInput">Title</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="Address"
                        onInput={(e) => {
                            setEventInformation({
                                ...eventInformation,
                                location: e.target.value,
                            });
                        }}/>
                        <label htmlFor="floatingInput">Location</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="Description"
                        onInput={(e) => {
                            setEventInformation({
                                ...eventInformation,
                                description: e.target.value,
                            });
                        }}/>
                        <label htmlFor="floatingInput">Description</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input 
                        type="date" 
                        className="form-control" 
                        id="floatingInput"
                        onInput={(e) => {
                            setEventInformation({
                                ...eventInformation,
                                date: e.target.value,
                            });
                        }}/>
                        <label htmlFor="floatingInput">Date</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input 
                        type="time" 
                        className="form-control" 
                        id="floatingInput"
                        onInput={(e) => {
                            setEventInformation({
                                ...eventInformation,
                                time: e.target.value,
                            });
                        }}/>
                        <label htmlFor="floatingInput">Start time</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input 
                        type="number" 
                        className="form-control" 
                        id="floatingInput"
                        placeholder='Entry fees'
                        onInput={(e) => {
                            setEventInformation({
                                ...eventInformation,
                                entry_fees: e.target.value,
                            });
                        }}/>
                        <label htmlFor="floatingInput">Entry fees(USD)</label>
                    </div>
                    <div className="text-center mb-3">
                        <label
                            htmlFor="event_image"
                            className="btn btn-primary justify-content-center d-flex gap-3"
                        >
                             <FaUpload size={24} />
                            Upload Image
                        </label>
                        <input
                            onChange={(e) => handleImageUpload(e)}
                            id="event_image"
                            type="file"
                            style={{ display: 'none' }}
                            placeholder="Select Image"
                            className="form-control "
                        />
                    </div>
                    {error !== '' && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary" onClick={submitHandler}>Create Event</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Create;