import React, { useState } from 'react'
import axios from 'axios'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

export default function Signuppage(props) {
  const [toastMessage, setToastMessage] = useState('');
  const [show, setShow] = useState(false);


  const [userInfo, setUserInfo] = useState({})

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:' + (props.user === 'doctor' ? '8082' : '8081') + '/reg', 
    userInfo) 
            .then((Responce) => {
                console.log(Responce.data)
                setToastMessage('Succesfully SignedUp')
                setShow(true)
            })
            .catch((err) => {
                console.log(err)
                console.log(err.Responce)
                setToastMessage('Please Try again')
                setShow(true)
            })
  }

    return (
      <div style={{
        background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://img.freepik.com/free-vector/pharmaceutical-medicine-healthcare-template-vector-presentation_53876-117796.jpg?size=626&ext=jpg&ga=GA1.2.1367449210.1652113855')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: 'calc(100vh - 110px)',
        paddingBottom: '7vh',
        }}>
        <h1 className='text-white' style={{
                textShadow: '2px 2px 6px rgba(0,0,0,0.65)',
            }}>Sign Up Form</h1>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-6'>
              <div className='card shadow bg-light'>
                <div className='card-body'>
                  <button className='btn btn-primary btn-block'
                  onClick={() => {
                    setUserInfo({})
                    props.user === 'doctor' ? props.setUser('admin') : props.setUser('doctor') ;
                  }} >{props.user}</button>
                  
                  <form onSubmit={handleSubmit}>
                    <div class="form-group text-left">
                      <label for="name">name</label>
                      <input type='adminname' class="form-control" value={
                        userInfo.adminname || userInfo.doctorname || ''
                      } name={props.user === 'doctor' ? 'doctorname' : 'adminname'} placeholder={ props.user === 'doctor' ? 'Enter Doctor name' : 'Enter Admin name' } required onChange={handleChange} />

                    </div>
                    <div class="form-group text-left">
                      <label for="Password">Password</label>
                      <input type='password' class="form-control" value={
                        userInfo.password === undefined ? '' : userInfo.password
                      } name='password' placeholder='password' required onChange={handleChange} />
                    </div>
                    <div class="form-group text-left">
                      <label for="emailid">emailid</label>
                      <input type='emailid' class="form-control" value={
                        userInfo.emailid === undefined ? '' : userInfo.emailid
                      } name='emailid' placeholder='emailid' required onChange={handleChange} />
                    </div>
                    <div class="form-group text-left">
                      <label for="contactno">contactno</label>
                      <input type='contactno' class="form-control" value={
                        userInfo.contactno === undefined ? '' : userInfo.contactno
                      } name='contactno' placeholder='contactno' required onChange={handleChange} />
                    </div>
                    <button class="btn btn-primary" onSubmit={handleSubmit}>SignUp</button>
                  </form>
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
