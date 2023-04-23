import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Review() {
    let [review, setReview] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token") == null) navigate('/login')
    }, [])
    useEffect(()=>{
        axios.get('http://localhost:4000/users/getreview')
        .then(res => setReview(res.data.payload))
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <p className="lead display-1 text-center">User Reviews</p>
            <table className="table w-75 mx-auto mt-5">
                <thead className="thead">
                    <tr>
                        <th>
                            name
                        </th>
                        <th>
                            email
                        </th>
                        <th>
                            review
                        </th>
                    </tr>
                </thead>

                <tbody className="tbody">
                    {
                        review.map((element,index) => <tr key={index}>
                            <td>{element.name}</td>
                            <td>{element.email}</td>
                            <td>{element.message}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Review