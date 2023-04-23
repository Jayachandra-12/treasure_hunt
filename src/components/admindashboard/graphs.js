import React from 'react'
import { useState, useEffect } from 'react'
import Chart from "react-apexcharts";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Graphs({ }) {
    let [usersScore, setUsersScore] = useState([{}])
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token") == null) navigate('/login')
    }, [])
    let [graph, setGraph] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: []
            }
        },
        series: [
            {
                name: "series-1",
                data: []
            }
        ]
    })

    useEffect(() => {
        axios.get('/users/getallusersscore')
            .then(res => {
                setUsersScore(res.data.payload)
                let username = []
                let total = []
                res.data.payload.map(element => {
                    const [minutes, seconds] = element['total'].split(":").map(Number);
                    const newTotalSeconds = minutes * 60 + seconds;
                    username.push(element['username'])
                    total.push(newTotalSeconds)
                })
                const data = {
                    options: {
                        chart: {
                            id: "basic-bar"
                        },
                        xaxis: {
                            categories: username
                        }
                    },
                    series: [
                        {
                            name: "series-1",
                            data: total
                        }
                    ]
                };
                setGraph(data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <p className="lead display-1">Graphs based on total time taken</p>
            <div className="d-flex justify-content-around row">
                <div className="mixed-chart col col-sm-11 col-md-6 col-lg-4 m-3">
                    <p className="display-3 lead">Bar</p>
                    <Chart
                        options={graph.options}
                        series={graph.series}
                        type="bar"
                        width="500"
                    />
                </div>
                <div className="mixed-chart col col-sm-11 col-md-6 col-lg-4 m-3">
                    <p className="display-3 lead">Line</p>
                    <Chart
                        options={graph.options}
                        series={graph.series}
                        type="line"
                        width="500"
                    />
                </div>

                <div className="mixed-chart col col-sm-11 col-md-6 col-lg-4 m-3">
                    <p className="display-3 lead">area</p>
                    <Chart
                        options={graph.options}
                        series={graph.series}
                        type="area"
                        width="500"
                    />
                </div>

                <div className="mixed-chart col col-sm-11 col-md-6 col-lg-4 m-3">
                    <p className="display-3 lead">radar</p>
                    <Chart
                        options={graph.options}
                        series={graph.series}
                        type="radar"
                        width="500"
                    />
                </div>

                <div className="mixed-chart col col-sm-11 col-md-6 col-lg-4 m-3">
                    <p className="display-3 lead">scatter</p>
                    <Chart
                        options={graph.options}
                        series={graph.series}
                        type="scatter"
                        width="500"
                    />
                </div>

                <div className="mixed-chart col col-sm-11 col-md-6 col-lg-4 m-3">
                    <p className="display-3 lead">heatmap</p>
                    <Chart
                        options={graph.options}
                        series={graph.series}
                        type="heatmap"
                        width="500"
                    />
                </div>

            </div>
        </div>
    )
}

export default Graphs