import React from 'react'
import { Carousel } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import imageOne from './house.webp'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import imageTwo from './key.jpg'
import Fourth from './fourth'

function Third() {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token") == null) navigate('/login')
    }, [])
    let { register, handleSubmit, formState: { errors } } = useForm()
    let [table, setTable] = useState(false)
    const riddleChecker = (riddleObj) => {
        if (riddleObj.door == undefined) {
            if (riddleObj.ans.toLowerCase() == "table") {
                alert("correct answer")
                setTable(true)
            }
            else {
                alert("wrong answer!!!")
            }
        }
        else {
            if (riddleObj.door != undefined && riddleObj.door.toLowerCase() == "front door") {
                alert("correct answer")
                navigation()
            }
            else if (riddleObj.door != undefined) {
                alert("wrong answer!!!")
            }
        }
    }
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
        localStorage.setItem("third", formatTime(elapsedTime))
        navigate('/fourth')
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
                        <h3>Looks like you made the right choice</h3>
                        <p className="lead display-6">You have the owners permission and she wants 20% of the treasure</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                <h1 className='timer text-dark'>{formatTime(elapsedTime)}</h1>
                    <div className='container'>
                        <p className="lead display-3 mt-5">Now solve the quick riddle to get the clue</p>
                        <p className="lead display-2 mt-5">I have four legs, but I don't have any feet. You use me when it's time to eat. What am I?</p>
                        <br />
                        <p className="lead">Only one word answer</p>
                        <form onSubmit={handleSubmit(riddleChecker)}>

                            <input type="text" name='riddle' id='riddle' className="form-control w-50 d-block mx-auto" {...register("ans", { required: true })} />
                            {errors.ans && <p className='text-danger lead text-centre d-block mx-auto text-center'>*Required field</p>}
                            <button type="submit" className="btn btn-info mt-3 d-block mx-auto">Submit</button>
                        </form>
                        <br />
                        <br />
                        <br />
                    </div>
                </Carousel.Item>

                {
                    table &&
                    <Carousel.Item>
                        <h1 className='timer'>{formatTime(elapsedTime)}</h1>
                        <img
                            className="d-block w-100 img"
                            src={imageTwo}
                            alt="First slide vh"

                        />

                        <Carousel.Caption>
                            <h3>Oooo..... looks like you found the key to the treasure</h3>
                            <p>
                                You Know the key but you don't know the location of the treasure.
                            </p>
                            <br />
                            <p>Keep searching the house for the treasure</p>

                        </Carousel.Caption>
                    </Carousel.Item>
                }

                {
                    table &&
                    <Carousel.Item>
                        <h1 className='timer text-dark'>{formatTime(elapsedTime)}</h1>
                        <div className='container'>
                            <p className="lead display-3 mt-5">Now solve the quick riddle to get the clue</p>
                            <p className="lead display-2 mt-5">Tall and solid, all homes have me. To get me open, you'll need a key. what am i?</p>
                            <br />
                            <p className="lead">Only two word answer</p>
                            <form onSubmit={handleSubmit(riddleChecker)}>
                                <input type="text" name='riddle' id='riddle' className="form-control w-50 d-block mx-auto" {...register("door", { required: true })} />
                                {errors.ans && <p className='text-danger lead text-centre d-block mx-auto text-center'>*Required field</p>}
                                <button type="submit" className="btn btn-info mt-3 d-block mx-auto">Submit</button>
                            </form>
                            <br />
                            <br />
                            <br />
                        </div>
                    </Carousel.Item>
                }

            </Carousel>
        </div>
    )
}

export default Third