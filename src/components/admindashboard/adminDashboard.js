import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { Outlet, useNavigate } from 'react-router-dom';
import Graphs from './graphs';
import Table from './table';
import graphImg from '../treasuregame/graph.webp'
import tableImg from '../treasuregame/table1.webp'
function AdminDashboard() {
    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("token") == null) navigate('/login')
    },[])
    
    return (
        <div>
            <div className='d-flex justify-content-around row'>
                <div className="card col-12 col-sm-11 col-md-6 m-3" style={{ width: "18rem" }}>
                    <img className="card-img-top" src={tableImg} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Tabular Representation</h5>
                        <p className="card-text">Represented in tabular format. Sort the fields according to the requirement</p>
                        <a  className="btn btn-primary" onClick={()=>navigate('/table')}>Click</a>
                    </div>
                </div>

                <div className="card col-12 col-sm-11 col-md-6 m-3" style={{ width: "18rem" }}>
                    <img className="card-img-top" src={graphImg} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Graphical Representation</h5>
                        <p className="card-text">Represented in graph format. can analyze the data easily</p>
                        <a className="btn btn-primary" onClick={()=>navigate('/graphs')}>Click</a>
                    </div>
                </div>

                <div className="card col-12 col-sm-11 col-md-6 m-3" style={{ width: "18rem" }}>
                    <img className="card-img-top" src={tableImg} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Leaderboard</h5>
                        <p className="card-text">Represented in table format. displays ranks of the user</p>
                        <a className="btn btn-primary" onClick={()=>navigate('/leaderboard')}>Click</a>
                    </div>
                </div>

                <div className="card col-12 col-sm-11 col-md-6 m-3" style={{ width: "18rem" }}>
                    <img className="card-img-top" src={tableImg} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Reviews</h5>
                        <p className="card-text">Represented in table format. can check the responses of users</p>
                        <a className="btn btn-primary" onClick={()=>navigate('/review')}>Click</a>
                    </div>
                </div>
            </div>
            <div className="container">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminDashboard