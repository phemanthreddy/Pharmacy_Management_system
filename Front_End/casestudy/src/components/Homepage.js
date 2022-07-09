import React from 'react';
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel'

import './Homepage.css'
import img from './images/LOGO.png'


function Homepage(props) {
    return (
        <div className='row'>
            <div className='col-md-9 p-0'>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://med.umn.edu/sites/med.umn.edu/files/pills.png"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3 class="text-dark">WELCOME</h3>
                            <p class="text-dark">Start your "Online Pharmacy" to grow your business worldwide with EMedStore Pharmacy Application Development Company & eCommerce Website Development Company..</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://duggalschemist.com/wp-content/uploads/2021/10/Untitled-1000-x-560-px-10.png"
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3 class="text-dark">Let Start </h3>
                            <p class="text-dark">It’s an Online Pharmacy app and website development company which helps to any pharmacy shop to make their presence online by their digital pharma marketing team.
Specially & specifically designed Online Pharmacy Platform by industry experts for the pharmacist to make the online presence of Pharmacy Business.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://conventions.com/wp-content/uploads/2020/07/pharmacy-medicine-NPPA-Conference-2021-ss-featured.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            
                            <h3 class="text-dark">Shop Now</h3>
                            <p class="text-dark">is the Best Medicine App and Website Development Company which Develop Online Pharmacy Application for Medical Store to get online medicine orders from all chronic patients by medicine refill program from anywhere 24 hours..</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className='col-md-3 p-0 bg-light cb1 d-flex flex-column justify-content-center'
            style={{
                background: "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('https://media.istockphoto.com/vectors/antibiotic-resistance-blue-seamless-pattern-vector-background-line-vector-id1317416781')",
                
            }}
            >
                <h1 className="text-white"style={{
                textShadow: '2px 2px 6px rgba(0,0,0,0.65)',
            }}>Go Pharmacy</h1>
            <br/><br/><br/><br/><br/><br/><br/><br/>
            <img className='login' src={img} alt=""/>
                <div className='container'>
                    {localStorage.getItem('jwt') ? (
                        <Link to='/dashboard' className='
                    button btn-light btn-lg btn-block
                    '>Already Logged in, Go to Dashboard</Link>
                    ) : (
                        <div className='container'>
                            <Link onClick={() => { props.setUser('doctor') }} to="/login" className='btn-success m-3 btn shadow'>login as doctor</Link>
                            <Link onClick={() => { props.setUser('admin') }} to="/login" className='btn-success btn shadow m-3'>login as admin</Link>
                            <Link to="/signup" className='btn-outline-light btn m-3'>signup</Link>
                        </div>

   
                )
                }
                
            </div>
            </div>
            
        <img className="image"
        src="https://img.freepik.com/free-vector/hand-holding-mobile-phone-with-internet-pharmacy-shopping-app-set-pills-drugs-medical-assistance-help-support-online-health-care-application-smartphone-vector-illustration-flat-style_169241-4290.jpg?size=626&ext=jpg&ga=GA1.2.1367449210.1652113855" alt="image" ></img>
       
        <img
        className='img-fluid'
        src="https://thumbs.dreamstime.com/z/online-pharmacy-mobile-app-vector-web-banners-homeopathic-pharmacy-medicines-delivery-service-online-drugstore-shop-babies-169951581.jpg" alt="image" ></img>
         <img
         className="image"
        src="https://i.pinimg.com/originals/00/04/77/0004772df94a556097fe50a97c805dd0.jpg" ></img>

        
        
        
        
        </div>

        

    )
}
export default Homepage;