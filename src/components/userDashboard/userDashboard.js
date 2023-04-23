import React, { useEffect, useState } from 'react'
import imageOne from './treasure.webp'
import './userDashboard.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function UserDashboard() {
    let [played, setPlayed] = useState(false)
    let un = { username: localStorage.getItem("username") }
    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("token") == null) navigate('/login')
    },[])
    
    useEffect(() => {
        axios.post('/users/getuserscore', un)
            .then(res => {
                if (res.data !== '') {
                    setPlayed(true)
                }
                else {
                    setPlayed(false)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='container m-5'>
            <p className="display-1 text-center mb-5">tresure hunt</p>
            <div className="card d-block mx-auto" style={{ width: "25rem" , maxWidth: "100vw"}}>
                <img className="card-img-top" src={imageOne} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Find the Treasure</h5>
                    <p className="card-text">Reveal the treasure to win the prize</p>
                    {played == false && <button className="btn btn-primary" onClick={() => navigate('/first')}>Play Now</button>}
                    {played && <div className='d-flex justify-content-around'>
                        <button className="btn btn-primary">Already Played</button>
                        <button className="btn btn-primary" onClick={() => navigate('/leaderboard')}>Check Leaderboard</button>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserDashboard