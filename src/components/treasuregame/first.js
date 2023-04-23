import React, { useState, useEffect } from 'react'
import imageOne from '../userDashboard/map.jpg'
import { Carousel } from 'react-bootstrap'
import './first.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function First() {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token") == null) navigate('/login')
    }, [])
    
    let userObj = {
        username: localStorage.getItem("username"),
        attempt: 1,
        first: 0,
        second: 0,
        third: 0,
        fourth: 0,
        total: 0
    }
    const [startTime, setStartTime] = useState(
        localStorage.getItem('startTime') || Date.now()
    );
    const [elapsedTime, setElapsedTime] = useState(Date.now() - startTime);

    useEffect(() => {
        axios.post('/users/attempt', userObj)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        localStorage.setItem('startTime', startTime);
        const interval = setInterval(() => {
            setElapsedTime(Date.now() - startTime);
        }, 1000);
        return () => clearInterval(interval);
    }, [startTime]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 1000 / 60);
        const seconds = Math.floor((time / 1000) % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    const navigation = () => {
        localStorage.removeItem('startTime')
        localStorage.setItem("first", formatTime(elapsedTime))
        navigate('/second')
    }

    return (
        <div>

            <Carousel>
                {/* <h1 className='timer'>{formatTime(elapsedTime)}</h1> */}
                <Carousel.Item>
                    <h1 className='timer'>{formatTime(elapsedTime)}</h1>
                    <img
                        className="d-block w-100 img"
                        src={imageOne}
                        alt="First slide vh"

                    />
                    <Carousel.Caption>
                        <h3>Hi welcome to treasure hunt</h3>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <h1 className='timer'>{formatTime(elapsedTime)}</h1>
                    <img
                        className="d-block w-100 img"
                        src={imageOne}
                        alt="First slide vh"

                    />

                    <Carousel.Caption>
                        <h3>Now take the map and go to the location</h3>
                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <h1 className='timer'>{formatTime(elapsedTime)}</h1>
                    <img
                        className="d-block w-100 img"
                        src={imageOne}
                        alt="First slide vh"

                    />

                    <Carousel.Caption>
                        <h3>You might wondering where the map is </h3>
                        <p>
                            You are looking right at it
                        </p>
                        <button className='btn btn-info' onClick={navigation}>Get Started</button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default First