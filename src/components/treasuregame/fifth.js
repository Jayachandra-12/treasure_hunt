import React, { useEffect } from 'react'
import imageOne from './celebration.jpg'
import { Carousel } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function Fifth() {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token") == null) navigate('/login')
    }, [])

    function addTimes(times) {
        let totalHours = 0;
        let totalMinutes = 0;
        
        times.forEach(time => {
            const [hours, minutes] = time.split(':').map(Number);
            totalMinutes += minutes;
            totalHours += hours;
        });

        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes %= 60;

        return `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}`;
    }

    const times = [localStorage.getItem("first"), localStorage.getItem("second"), localStorage.getItem("third"), localStorage.getItem("fourth")];

    const result = addTimes(times);

    let userObj = {
        username: localStorage.getItem("username"),
        first: localStorage.getItem("first"),
        second: localStorage.getItem("second"),
        third: localStorage.getItem("third"),
        fourth: localStorage.getItem("fourth"),
        total: result
    }


    useEffect(() => {
        axios.post('/users/updatearray', userObj)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100 img"
                        src={imageOne}
                        alt="First slide vh"
                    />
                    <Carousel.Caption className='text-warning bg-white'>
                        <h3>As compensation you and the owner got to keep the 50% of the treasure</h3>
                        <h3>As agreed owner took 20% of treasure and you got the remaining 80%</h3>
                        <p className="display-2 lead">Congrats!!!!!!!!</p>
                        <button className="btn btn-info" onClick={() => navigate('/userdashboard')}>Return to Dashboard</button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Fifth
