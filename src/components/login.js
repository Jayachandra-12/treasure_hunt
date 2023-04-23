import React from 'react'
import './login.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const onFormSubmit = async (userDetails) => {
        let response = await axios.post('/users/login', userDetails);

        if (response.data.message === "Wrong user name" || response.data.message === "incorrect password") {
            alert(response.data.message)
        }

        else {
            if (userDetails.account == "user") {
                localStorage.setItem("token", response.data)
                localStorage.setItem("username", userDetails.username)
                navigate("/userdashboard")
            }
            else {
                localStorage.setItem("token", response.data)
                localStorage.setItem("username", userDetails.username)
                navigate('/admindashboard')
            }
        }
    }

    return (
        <div>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleSubmit(onFormSubmit)}>
                                <select className='form-control w-50 mx-auto' name="account" id="cars" required {...register("account", { required: true })}>
                                    <option defaultChecked disabled>Select</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">username</label>
                                    <input type="text" id="form3Example3" className="form-control form-control-lg"
                                        placeholder="Enter a valid username" {...register("username", { required: true })} />
                                    {errors.text?.type === 'required' && <p className='text-danger lead'>*username Required</p>}
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                    <input type="password" id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Enter password" {...register("password", { required: true })} />
                                    {errors.password?.type === 'required' && <p className='text-danger lead'>*Password Required</p>}
                                    {/* {errors.password?.type === 'minLength' && <p className='text-danger lead'>*Password should be of minimum 6 characters</p>} */}
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#!" className="text-body">Forgot password?</a>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                                        className="link-danger" onClick={() => navigate('/signup')}>Register</a></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Login