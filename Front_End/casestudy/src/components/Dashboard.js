import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { Row, Col, Nav, NavItem, NavLink } from 'react-bootstrap'
import Drug from './Drug';
import Order from './Order';
import Doctor from './Doctor';
import Supplier from './Supplier';
import Cart from './Cart'
import Unauthorised from './Unauthorised';


function Dashboard(props) {
    // if(localStorage.getItem('jwt') === null){
    //     window.location.href = '/login'
    // }
    const [user, setUser] = useState(localStorage.getItem('user'))
    const [data, setData] = useState(["drugs", "order", "supplier", "view pickup"])
    if (user === 'doctor' && data.length === 4) {
        setData(["drugs","view orders", 'view cart'])
    }
    return (
        <>
        {
            localStorage.getItem('jwt') === null ? (
                <Unauthorised />
            ) : (
        <div style={{
            background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1585435557343-3b092031a831?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 'calc(100vh - 110px)',
            paddingBottom: '7vh',
            }}>
            
            <div className='container-fluid'>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3} className='bg-dark'
                        style={{
                            minHeight: 'calc(100vh - 3rem)',
                        }}
                        >
                            <Nav variant="pills" className="flex-column">
                            <img className='rounded-circle w-75 mx-auto' style={{padding: 'calc(4vh + 1vw) calc(4vh + 1vw) 0 calc(4vh + 1vw)'}} src={localStorage.getItem('user') === 'admin' ? 'https://www.nwcaonline.com/wp-content/uploads/2016/07/avatar_administrator2-360x360.png' : 'https://cdn-icons-png.flaticon.com/512/3022/3022340.png'  } alt="user" />
                                <h4 className='text-white text-center'>{localStorage.getItem('user') === 'admin' ? 'Administrator' : 'Doctor'}</h4>
                                {data.map((item, index) => {
                                    return (
                                        <Nav.Item key={index}>
                                            <Nav.Link eventKey={item}>{item}</Nav.Link>
                                        </Nav.Item>
                                    )
                                })}
                            </Nav>
                        </Col>
                        <Col sm={9}>
                        <h1 className='text-white ' style={{
                textShadow: '2px 2px 6px rgba(0,0,0,0.65)',
            }}>{user} Dashboard</h1>
                            <Tab.Content>
                                {data.map((item, index) => {
                                    return (
                                        <Tab.Pane eventKey={item} key={index}>
                                            {item === 'drugs' ? <Drug uiUpdate = {props.uiUpdate} setUiUpdate = {props.setUiUpdate} /> : item === 'order' ? <Order uiUpdate = {props.uiUpdate} setUiUpdate = {props.setUiUpdate} /> : item === 'doctor' ? <Doctor uiUpdate = {props.uiUpdate} setUiUpdate = {props.setUiUpdate} /> : item === 'supplier' ? <Supplier uiUpdate = {props.uiUpdate} setUiUpdate = {props.setUiUpdate} /> : item === 'view orders' ? <Order uiUpdate = {props.uiUpdate} setUiUpdate = {props.setUiUpdate} /> : item === 'view cart' ? <Cart uiUpdate = {props.uiUpdate} setUiUpdate = {props.setUiUpdate} /> : item === 'view pickup' ? <Cart uiUpdate = {props.uiUpdate} setUiUpdate = {props.setUiUpdate} /> : null}
                                        </Tab.Pane>
                                    )
                                })}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>

            </div>
        </div>
    )
}</>
)
}

export default Dashboard;