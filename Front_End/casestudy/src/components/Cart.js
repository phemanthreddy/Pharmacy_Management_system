import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

export default function Cart(props) {

    const [toastMessage, setToastMessage] = useState('');
    const [show, setShow] = useState(false);


    const [cart, setCart] = useState([])
    const [searchId, setSearchId] = useState('');

    const getCartData = (e) => {
        if (e) {
            e.preventDefault();
        }
        if (cart.length === 0 || e) {
                axios.get('http://localhost:9091/pickup/viewPickup')
                    .then(res => {
                        setCart(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
        }
    }
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchId !== '') {
        axios.get('http://localhost:9091/pickup/viewPickup/' + searchId)
            .then((Responce) => {
                setToastMessage('Pickup Itemfound')
                setShow(true)
                setCart([Responce.data])
                setSearchId('')
            })
            .catch((err) => {
                console.log(err)
                setToastMessage('Pickup Item not found')
                    setShow(true)
            })
        }
        
    }

    useEffect(() => {
        getCartData()
    }, [props.uiUpdate])

    return (
        <div className="container">
            <div className="row mb-2 justify-content-end mx-0">
                <form onSubmit={handleSearch}>
                    <div class="form-group m-0">
                        <div class="input-group">
                            <input type="text" class="form-control" name="id" placeholder="Search id" value={searchId} onChange={ (e) => { setSearchId(e.target.value) }} />
                            <span class="input-group-btn">
                                <button type="submit" class="btn btn-primary btn-search">Search</button>
                                
                            </span>
                        </div>
                    </div>
                </form>
                <button className='btn btn-primary ml-2' onClick={getCartData}>reset</button>
            </div>
            <div className="row">
                {cart.map(item => {
                    return (
                        <div className="col-md-4 col-lg-3 col-sm-6 mb-4" key={item.id}>
                            <div className="card" style={{
                                backgroundColor: 'rgb(203 228 255)',
                            }}>
                                <img src={"https://media.istockphoto.com/vectors/online-order-and-pick-up-pointconcept-safe-shopping-during-covid19-vector-id1219796089?b=1&k=20&m=1219796089&s=612x612&w=0&h=_A-Dh7a1eyYotk-Rju6GM0ICX7CW-W1X66wcWhKx7j4="} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <p className="card-text font-weight-bold text-left">id-{item.id}</p>
                                    <p className="card-text font-weight-bold text-left">name-{item.drugName}</p>
                                    <p className="card-text font-weight-bold text-left">price-{item.drugPrice}</p>
                                    <div className="d-flex justify-content-between">
                                        {localStorage.getItem('user') === 'doctor' ?
                                        <>
                                        <button className="btn btn-success float-left"
                                    onClick={() => {
                                        window.location.replace("http://localhost:8086")
                                    }}
                                >pay</button>
                                        
                                        </>
                                    
                                    
                                : <><button className="btn btn-danger float-right"
                                onClick={() => {
                                    axios.delete('http://localhost:9091/pickup/deletePickup/' + item.id)
                                        .then(res => {
                                            setCart(cart.filter(i => i.id !== item.id))
                                            setToastMessage('Succesfully deleted')
                                            setShow(true)
                                            // alert('Succesfully deleted')
                                        }
                                        ).catch(err => {
                                            console.log(err)
                                        }
                                        )
                                }
                                }
                            >delete</button></>}
                                    </div>
                                    
                                    
                                    
                                </div>
                            </div>
                        </div>
                    )
                })}
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
