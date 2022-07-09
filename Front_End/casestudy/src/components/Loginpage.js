import React, { useState } from 'react'
import axios from 'axios'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import './Loginpage.css'
import img from './images/login.png'

const LoginFormComponent = (props) => {

    const [toastMessage, setToastMessage] = useState('');
    const [show, setShow] = useState(false);
    

    const [name, setname] = useState('')
    const [password, setPassword] = useState('')

    const handlename = (e) => {
        console.log(e.target.value)
        setname(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submitted form ")
        let url = props.user === 'doctor' ? 'http://localhost:8082/auth' : 'http://localhost:8081/auth'
        let data = {}
        props.user === 'doctor' ?
            data = {
                doctorname: name,
                password: password
            } :
            data = {
                adminname: name,
                password: password
            }
        console.log(data);
        axios.post(url, data)
            .then((Responce) => {
                console.log(Responce.data.response)
                if (Responce.data.response.includes('Error')) {
                    setToastMessage('Invalid Credentials')
                    setShow(true)
                    // alert("username or password is incorrect")
                } else {
                    localStorage.setItem("jwt", Responce.data.response)
                    localStorage.setItem("user", props.user)
                    if (Responce.data.response.includes('Error')) {
                        setToastMessage('Please Try again')
                    } else {
                        setToastMessage('Succesfully LoggedIn')
                    }
                    setShow(true)
                    // set props.user to doctor or admin after redirecting to dashboard
                    window.location.href = '/dashboard'
                }

            })
            .catch((err) => {
                console.log(err)
                console.log(err.Responce)
                setToastMessage('Please Try again')
                setShow(true)
            })
    }

    return (
        <div className='what' style={{
            background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://www.kindpng.com/picc/m/278-2784400_intern-hospital-vector-hd-png-download.png')",
            backgroundRepeat: "repeat-x",
            // backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: 'calc(100vh - 110px)',

            }}>
                <div style={{
                width: '32vw',
                height: 'calc(100vh - 110px)',
                marginLeft: 'auto',
                background: '#26404f',
                display: 'flex',
                flexDirection: 'column',
            justifyContent:'space-evenly'
            }}>


            {
                localStorage.getItem("jwt") ?
                    window.location.href = '/dashboard' : null 
            }
            <h1 className='#7399b8'style={{
                textShadow: '1px 1px 10px rgba(107, 191, 197, 0.75)',
            }}>Login as {props.user} </h1>

                 <br/>
              <img className='logimage' src={img} alt=""/>
            <div class="container">
                <div className='row justify-content-center'>
                    <div className='col-md-9'>
                        <div className='card shadow bg-light'>
                            <div className='card-body'>
                                <form className='' onSubmit={handleSubmit}>
                                    <div className='form-group text-left'>
                                        <lable>{props.user} name</lable>

                                        <input type="text" class="form-control" value={name} onChange={handlename} required placeholder={"Enter" + " " + props.user + " " + "Name"} name='Name' /><br />

                                    </div>
                                    <div className='form-group text-left'>
                                        <lable>Password</lable>

                                        <input type="password" className='form-control' value={password} onChange={handlePassword} required name='password' placeholder='Enter password' /><br />

                                    </div>
                                    <div className='form-group text-center'>

                                        <input className='btn btn-primary' type="submit" value="Login" />

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
        <ToastContainer style={{
            right: '50%',
            bottom: '83.4%',
        }} className="p-3" position={'bottom-end'}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Alert</strong>
            <small>1 Second ago</small>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
        </ToastContainer>
        </div>



    )
}
export default LoginFormComponent;

