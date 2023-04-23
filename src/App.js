import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './components/login';
import Signup from './components/signup';

import { NavDropdown, Table } from "react-bootstrap";
import { CgProfile } from 'react-icons/cg'
import UserDashboard from '../src/components/userDashboard/userDashboard'
import First from './components/treasuregame/first';
import Second from './components/treasuregame/second';
import Restart from './components/treasuregame/restart';
import Third from './components/treasuregame/third';
import Fourth from './components/treasuregame/fourth';
import Fifth from './components/treasuregame/fifth';
import AdminDashboard from './components/admindashboard/adminDashboard';
import Homepage from './components/homepage';
import TableComp from './components/admindashboard/table';
import Graphs from './components/admindashboard/graphs';
import Leaderboard from './components/leaderboard';
import treasure from './components/treasuregame/treasure.jpg'
import Review from './components/review';
function App() {
    let navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="btn-dark btn" ><img src={treasure} className='icon' style={{scale:"1.8"}} alt="logo" /></button>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                {
                    localStorage.getItem("token") == null &&
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="">Home</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="login">Login</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="signup">Signup</Link>
                            </li>
                        </ul>
                    </div>
                }

                {localStorage.getItem("token") !== null &&
                    <NavDropdown
                        title={<>
                            <CgProfile scale={"5"} className='d-inline' />
                            <p className="lead d-inline">{localStorage.getItem("username")}</p>
                        </>}
                        id="collasible-nav-dropdown"
                        className="drop-down ms-auto"
                    >
                        <NavDropdown.Item>Change password</NavDropdown.Item>

                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                }
            </nav>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/userdashboard' element={<UserDashboard />} />
                <Route path='/first' element={<First />} />
                <Route path='/second' element={<Second />} />
                <Route path='/third' element={<Third />} />
                <Route path='/fourth' element={<Fourth />} />
                <Route path='/fifth' element={<Fifth />} />
                <Route path='/restart' element={<Restart />} />
                <Route path='/admindashboard' element={<AdminDashboard />} />
                <Route path='/leaderboard' element={<Leaderboard />} />
                <Route path='/table' element={<TableComp />} />
                <Route path='/review' element={<Review />} />
                <Route path='/graphs' element={<Graphs />} />
            </Routes>
        </div>
    );
}

export default App;