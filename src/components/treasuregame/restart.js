import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Restart() {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token") == null) navigate('/login')
    }, [])
    useEffect(()=>{
        let token = localStorage.getItem("token")
        let username = localStorage.getItem("username")
        localStorage.clear()
        localStorage.setItem("token", token)
        localStorage.setItem("username", username)
    },[])
    const navigation = async() => {
        let userObj = {username : localStorage.getItem("username")}
        let res = await axios.post('/users/increase',userObj)
        navigate('/first')
    }
    
    return (
        <div>
            <div className='container'>
                <p className="lead display-1 mt-5 text-danger">Boom</p>
                <p className="lead display-5 mt-5">It looks like you are caught by the police</p>
                <p className="lead display-5 mt-5">If you wish to restart the game click the button below</p>
                <button className="btn btn-warning display-5 d-block m-3 mx-auto" onClick={navigation}>restart</button>
            </div>
        </div>
    )
}

export default Restart