import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Leaderboard() {
    let [usersScore, setUsersScore] = useState([{}])
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token") == null) navigate('/login')
    }, [])
    useEffect(() => {
        axios.get('http://localhost:4000/users/getallusersscore')
            .then(res => {
                // setUsersScore(res.data.payload)
                setUsersScore([...res.data.payload.sort((a, b) => {
                    const [minute1,seconds1] = a['total'].split(":").map(Number);
                    const [minute2, seconds2] = b['total'].split(":").map(Number);
                    const time1 = minute1 * 60 + seconds1 + a['attempt']*100;
                    const time2 = minute2 *60 + seconds2 + b['attempt']*100;
                    return time1-time2;
                })]);
            })
            .catch(err => console.log(err))
    }, [])
    

    return (
        <div>
            <p className="lead display-1 text-center">Leaderboard</p>
            <table className="table w-75 mx-auto mt-5">
                <thead className="thead">
                    <tr>
                        <th>
                            rank
                        </th>
                        <th>
                            username
                        </th>
                        <th>
                            attempt
                        </th>
                        <th>
                            Total time Taken
                        </th>
                    </tr>
                </thead>

                <tbody className="tbody">
                    {
                        usersScore.map((element,index) => <tr key={element.username}>
                            <td>{index+1}</td>
                            <td>{element.username}</td>
                            <td>{element.attempt}</td>
                            <td>{element.total}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboard