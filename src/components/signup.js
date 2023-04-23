import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onFormSubmit = async(userDetails) => {
        console.log(userDetails)
        let newUserEntry = await axios.post('/users/createuser', userDetails)
        if(newUserEntry.data.message == "Username already exists") {
            alert(newUserEntry.data.message)
        }
        else {
            alert(newUserEntry.data.message)
            navigate('/login')
        }
    }
    return (
        <div>
            <section className="vh-100" style={{ backgroundColor: '#eee' }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: '25px' }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit(onFormSubmit)}>
                                                <select className='form-control w-50 mx-auto' name="account" id="cars" required {...register("account", { required: true })}>
                                                    <option defaultChecked disabled>Select</option>
                                                    <option value="admin" disabled>Admin</option>
                                                    <option value="user">User</option>
                                                </select>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                        <input type="text" id="form3Example1c" className="form-control" {...register("username", { required: true })} />
                                                        {errors.name?.type === 'required' && <p className='text-danger lead'>*name Required</p>}
                                                    </div>
                                                </div>
                                                
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                        <input type="email" id="form3Example3c" className="form-control" {...register("email", { required: true })} />
                                                        {errors.email?.type === 'required' && <p className='text-danger lead'>*email Required</p>}
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="form3Example4c">Password</label>
                                                        <input type="password" id="form3Example4c" className="form-control" {...register("password", { required: true, minLength: 6 })} />
                                                        {errors.password?.type === 'required' && <p className='text-danger lead'>*password Required</p>}
                                                        {errors.password?.type === 'minLength' && <p className='text-danger lead'>*Password should be of minimum 6 characters</p>}
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                                </div>

                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid" alt="Sample image" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup