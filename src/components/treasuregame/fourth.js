import React, { useState , useEffect} from 'react'
import { Carousel } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import imageOne from './xmark.jpg'
import imageTwo from './house.webp'
import imageThree from './garden.jpg'
import { useForm } from 'react-hook-form'
import imageFour from './treasure.jpg'
import imageFive from './box.jpg'

function Fourth() {
    let navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("token") == null) navigate('/login')
    },[])
    const { register, handleSubmit, formState: { errors } } = useForm()
    let [garden, setGarden] = useState(false)
    const riddleChecker = (riddleObj) => {
        if (riddleObj.garden == "garden") {
            alert("correct answer")
            setGarden(true)
        }
        else {
            alert("Wrong answer!!!")
            setGarden(false)
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
        localStorage.setItem("fourth", formatTime(elapsedTime))
        navigate('/fifth')
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
                        src={imageTwo}
                        alt="First slide vh"

                    />
                    <Carousel.Caption>
                        <h3>Look for clues at the front door of the house</h3>
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
                        <h3>Looks like you found the x mark at the front door</h3>
                        <p>There may be treasure present inside</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                <h1 className='timer text-dark'>{formatTime(elapsedTime)}</h1>
                    <div className='container'>
                        <p className="lead display-3 mt-5">You need to dig it up to check if treasure present inside</p>
                        <p className="lead display-5 mt-5">Now to dig it up you need certain things</p>
                        {/* <img src={imageTwo} alt="shovel" className='d-block mx-auto' /> */}
                        <p className="lead display-5 mt-5">Answer the riddle for the next clue</p>
                        <p className="lead display-5 mt-5">I am a place where nature thrives,
                            Butterflies, bees and bugs arrive,
                            You'll find me in the backyard or the park,
                            A place to relax, or take a walk.

                            What am I?</p>
                        <br />
                        <p className="lead">Only one word answer</p>
                        <form onSubmit={handleSubmit(riddleChecker)}>
                            <input type="text" name='riddle' id='riddle' className="form-control w-50 d-block mx-auto" {...register("garden", { required: true })} />
                            {errors.garden && <p className='text-danger lead text-centre d-block mx-auto text-center'>*Required field</p>}
                            <button type="submit" className="btn btn-info mt-3 d-block mx-auto">Submit</button>
                        </form>
                        <br />
                        <br />
                        <br />
                    </div>
                </Carousel.Item>
                {
                    garden &&
                    <Carousel.Item>
                        <h1 className='timer'>{formatTime(elapsedTime)}</h1>
                        <img
                            className="d-block w-100 img"
                            src={imageThree}
                            alt="First slide vh"

                        />

                        <Carousel.Caption>
                            <h3>Looks like you found the shovel in the garden</h3>
                            <p>Use the shovel to dig that x mark</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                }
                {
                    garden &&
                    <Carousel.Item>
                        <h1 className='timer'>{formatTime(elapsedTime)}</h1>
                        <img
                            className="d-block w-100 img"
                            src={imageFour}
                            alt="First slide vh"

                        />

                        <Carousel.Caption>
                            <h3>Looks like you found the treasure</h3>
                            <p>Use the key to open the treasure box</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                }
                {
                    garden &&
                    <Carousel.Item>
                        <h1 className='timer'>{formatTime(elapsedTime)}</h1>
                        <img
                            className="d-block w-100 img"
                            src={imageFive}
                            alt="First slide vh"

                        />

                        <Carousel.Caption>
                            <h3>Hoooorayy.... you found the treasure</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                }
                {
                    garden &&
                    <Carousel.Item>
                        <h1 className='timer text-dark'>{formatTime(elapsedTime)}</h1>
                        <div className='container'>
                            <p className="lead display-3 mt-5">Now you got an important decision to make</p>
                            <p className="lead display-5 mt-5">make one choice from the below</p>

                            <button className="btn btn-warning display-5 d-block m-3 w-75 mx-auto" onClick={navigation}>Report the police about the treasure</button>
                            <button className="btn btn-warning display-5 d-block m-2 w-75 mx-auto" onClick={navigateToRestart}>do not Report the police about the treasure</button>
                            <br />
                            <p className="lead display-6 text-danger">*Note : If you report the police about the treasure you may lose everything</p>
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

export default Fourth