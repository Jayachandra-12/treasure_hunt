import React, { useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import imageOne from './house.webp'
import { useNavigate } from 'react-router-dom'

function Second() {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token") == null) navigate('/login')
    }, [])
    const [startTime, setStartTime] = useState(
        localStorage.getItem('startTime') || Date.now()
    );
    const [elapsedTime, setElapsedTime] = useState(Date.now() - startTime);

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
        localStorage.setItem("second", formatTime(elapsedTime))
        navigate('/third')
    }
    const navigateToRestart = () => {
        localStorage.removeItem('startTime')
        navigate('/restart')
    }

    return (
        <div>
            <Carousel interval={"10000"}>
                <Carousel.Item>
                    <h1 className='timer'>{formatTime(elapsedTime)}</h1>
                    <img
                        className="d-block w-100 img"
                        src={imageOne}
                        alt="First slide vh"

                    />
                    <Carousel.Caption>
                        <h3>Looks like you made it the location</h3>
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
                        <h3>I know you might be Wondering why the location leaded to a house</h3>
                        <p>There is treasure inside the house</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <h1 className='timer text-dark'>{formatTime(elapsedTime)}</h1>
                    <div className='container'>
                        <p className="lead display-3 mt-5"> Now answer the question for the next clue</p>
                        <p className="lead display-5 mt-5">Now you have two choices to make. Choose one from below?</p>
                        <button className="btn btn-warning display-5 d-block m-3 w-75 mx-auto" onClick={navigation}>Ask the permission of owner to search the house</button>
                        <button className="btn btn-warning display-5 d-block m-2 w-75 mx-auto" onClick={navigateToRestart}>Don't ask the permission of owner to search the house</button>
                        <br />
                        <p className="lead display-6 text-danger">*Note : If you ask the permission of owner she will also want to have part of the treasure</p>
                        <br />
                        <br />
                    </div>
                </Carousel.Item>

            </Carousel>
        </div>
    )
}

export default Second