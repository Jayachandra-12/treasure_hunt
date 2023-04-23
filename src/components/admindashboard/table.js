import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Table() {
    let [usersScore, setUsersScore] = useState([{}])
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token") == null) navigate('/login')
    }, [])
    useEffect(() => {
        axios.get('http://localhost:4000/users/getallusersscore')
            .then(res => {
                setUsersScore(res.data.payload)
            })
            .catch(err => console.log(err))
    }, [])

    const sortByTime = (key) => {
        if (key == "attempt") {
            setUsersScore([...usersScore.sort((a, b) => a[key] - b[key])]);
        }
        else
            setUsersScore([...usersScore.sort((a, b) => a[key].localeCompare(b[key]))]);
    };

    return (
        <div>
            <p className="lead display-1">Table</p>
            <table className="table w-75 mx-auto mt-5">
                <thead className="thead">
                    <tr>
                        <th>
                            username
                        </th>
                        <th>
                            attempt
                        </th>
                        <th>
                            Finding map
                        </th>
                        <th>
                            Finding house
                        </th>
                        <th>
                            Finding key
                        </th>
                        <th>
                            Finding treasure
                        </th>
                        <th>
                            Total time Taken
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <button className="btn btn-info" onClick={() => sortByTime("username")}>sort</button>
                        </th>
                        <th>
                            <button className="btn btn-info" onClick={() => sortByTime("attempt")}>sort</button>
                        </th>
                        <th>
                            <button className="btn btn-info" onClick={() => sortByTime("first")}>sort</button>
                        </th>
                        <th>
                            <button className="btn btn-info" onClick={() => sortByTime("second")}>sort</button>
                        </th>
                        <th>
                            <button className="btn btn-info" onClick={() => sortByTime("third")}>sort</button>
                        </th>
                        <th>
                            <button className="btn btn-info" onClick={() => sortByTime("fourth")}>sort</button>
                        </th>
                        <th>
                            <button className="btn btn-info" onClick={() => sortByTime("total")}>sort</button>
                        </th>
                    </tr>
                </thead>

                <tbody className="tbody">
                    {
                        usersScore.map(element => <tr key={element.username}>
                            <td>{element.username}</td>
                            <td>{element.attempt}</td>
                            <td>{element.first}</td>
                            <td>{element.second}</td>
                            <td>{element.third}</td>
                            <td>{element.fourth}</td>
                            <td>{element.total}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table