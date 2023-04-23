import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Aos from 'aos'
import image from './treasuregame/treasureimage.jpg'
import 'aos/dist/aos.css'
import Footer from './footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function Homepage() {
    const [name, setName] = useState()
    const [message, setMessage] = useState()
    const [email, setEmail] = useState()
    Aos.init()
    const navigate = useNavigate()
    const formSubmit = async() => {
        let userReview = {
            name : name,
            email : email,
            message : message
        }
        let res = await axios.post('/users/review', userReview)
        if(res.data.message == "review send") {
            alert("review sent")
        }
        else {
            alert(res.send.message)
        }
    }
    return (
        <div>
            <div style={{ backgroundColor: "#B7CEEC" }}>
                <div className="container">
                    <div className="row container" data-aos="fade-right">
                        <div
                            className="col-lg-6 d-flex justify-content-center align-items-center flex-column"
                            style={{ height: "91.5vh" }}
                        >
                            <h1 className='display-1'>Treasure Hunt</h1>
                            <Button variant="primary" onClick={() => navigate('/login')}>GetStarted</Button>
                        </div>
                        <div className="img-fluid Home_img col-lg-6 d-flex justify-content-center  flex-column ">
                            <img src={image} alt="/"></img>
                        </div>
                    </div>
                    <div className="container mb-5" data-aos="fade-left">
                        <h1>About</h1>
                        <p>
                            A treasure hunt is a game or activity where participants search for
                            hidden items or clues to find a prize or treasure. The game typically
                            involves a series of clues that lead the participants from one
                            location to another until they reach the final destination where the
                            treasure is hidden. The clues can be in the form of riddles, puzzles,
                            maps, or other types of hints that require the players to use their
                            problem-solving skills and creativity to decipher. Treasure hunts can
                            be played both indoors and outdoors and can be tailored to different
                            age groups and interests. They are often used as a fun activity for
                            parties, team building events, or educational purposes.
                        </p>
                    </div>

                    <div data-aos="fade-right" className="row container mt-5">

                        <div className="col-lg-6 d-flex justify-content-center  flex-column">
                            <h6 className="section-heading "> Contact Form 📨📬</h6>
                            <p>
                                If there is something you want to suggest or may be just a hello
                                do reach out.
                            </p>
                        </div>
                        <div className="col-lg-6 d-flex justify-content-center  flex-column">
                            <Form>
                                <Form.Label>Name :</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address :</Form.Label>
                                    <Form.Control
                                        type="email"
                                        size="lg"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Message :</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        as="textarea"
                                        rows={6}
                                        value={message}
                                        onChange={(e) => {
                                            setMessage(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                                <Button className="my-3 d-block mx-auto" variant="primary" onClick={formSubmit}>
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Homepage