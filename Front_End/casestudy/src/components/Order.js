import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

export default function Order(props) {
    const [toastMessage, setToastMessage] = useState('');
    const [show, setShow] = useState(false);

    const [orderData, setorderData] = useState(
        []
    );
    const [searchId, setSearchId] = useState('');
    // const [newOrderData, setnewOrderData] = useState({});
    // const handleChange = (e) => {
    //     setnewOrderData({
    //         ...newOrderData,
    //         [e.target.name]: e.target.value
    //     })
    // }
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     axios.post('http://localhost:8085/orders/addOrders',
    //         newOrderData).then((Responce) => {
    //             console.log(Responce.data)
    //             setorderData([...orderData, Responce.data])
    //             setnewOrderData({})
    //             alert('Succesfully ordered')
    //         }
    //         ).catch((err) => {
    //             console.log(err)
    //         }
    //         )
    // }
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchId !== '') {
        axios.get('http://localhost:8085/orders/viewOrders/' + searchId)
            .then((Responce) => {
                setorderData([Responce.data])
                setSearchId('')
                setToastMessage('Order found')
                    setShow(true)
            })
            .catch((err) => {
                console.log(err)
                setToastMessage('Order not found')
                    setShow(true)
            })
        }
    }
    const getOrderData = (e) => {
        if (e) {
            e.preventDefault();
        }
        if (orderData.length === 0 || e) {
                // axios.get(
                //     'http://localhost:8081/admin/viewDrugs',
                //     {
                //         headers: {
                //             Authorization: 'Bearer ' + localStorage.getItem('jwt')
                //         }
                //     }
                // )
                axios.get('http://localhost:8085/orders/viewOrders')
                    .then((Responce) => {
                        console.log(Responce.data)
                        if (Responce.data.message === "Network Error") {
                            alert("Network Error")
                        } else {
                            setorderData(Responce.data)
                        }
    
                    })
                    .catch((err) => {
                        console.log(err)
                        console.log(err.Responce)
                        console.log('Please Try again')
                    })
        }
    }
            

    useEffect(() => {
        getOrderData()
    }, [props.uiUpdate])
    console.log(orderData.length);


    return (
        <div className="container">
            <div className="row mb-2 justify-content-end mx-0">
                    <form onSubmit={handleSearch}>
                        <div class="form-group m-0">
                            <div class="input-group">
                                <input type="text" class="form-control" name="id" placeholder="Order id" value={searchId} onChange={ (e) => { setSearchId(e.target.value) }} />
                                <span class="input-group-btn">
                                    <button type="submit" class="btn btn-primary btn-search">Search</button>
                                    
                                </span>
                            </div>
                        </div>
                    </form>
                    <button className='btn btn-primary ml-2' onClick={getOrderData}>reset</button>
                </div>
            {/* <div className="d-flex">
                <form className="form-inline" onSubmit={handleSubmit}>
                    <input value={newOrderData.drugName} onChange={handleChange} name="drugName" className="form-control mr-sm-2" placeholder="drug name" />
                    <input value={newOrderData.id} onChange={handleChange} name="id" className="form-control mr-sm-2" placeholder="id" />
                    <input value={newOrderData.drugPrice} onChange={handleChange} name="price" className="form-control mr-sm-2" placeholder="drug price" />
                    <input className='btn btn-primary' type="submit" value="order" />
                </form>
            </div> */}
            <div className="row mt-4">
                {orderData.map((drug, index) => {
                    return (
                        <div className="col-md-4 col-sm-6 col-lg-3" key={index}>
                            <div className="card" style={{
                                backgroundColor: 'rgb(218, 239, 245)',
                            }}>
                                <img className='card-img-top' src={"https://resources.tallysolutions.com/wp-content/uploads/2020/06/sales-order.jpg"} alt="drug" />
                                <div className="card-body">
                                    <h5 className="card-title font-weight-bold text-primary text-left mb-2">{drug.drugName}</h5>
                                    <p className="card-text text-left m-0 font-weight-bold text-dark">ID: {drug.id}</p>
                                    <p className="card-text text-left m-0 font-weight-bold text-dark">PRICE: {drug.drugPrice}</p>
                                    <div className="d-flex justify-content-between mt-2">
                                        {
                                            localStorage.getItem('user') === 'admin' ?
                                                <button className="btn btn-primary"
                                                    onClick={() => {
                                                        axios.post('http://localhost:9091/pickup/addPickup', {
                                                            drugName: drug.drugName,
                                                            drugPrice: drug.drugPrice,
                                                            id: drug.id
                                                        }).then((Responce) => {
                                                            console.log(Responce.data)
                                                            setToastMessage('Order added to pickup')
                                                            setShow(true)
                                                        }).catch((err) => {
                                                            console.log(err)
                                                        })

                                                    }
                                                    }

                                                >Accept</button>
                                                :
                                                <></>

                                        }<button className="btn btn-danger"
                                            onClick={() => {
                                                axios.delete('http://localhost:8085/orders/deleteOrders/' + drug.id)
                                                    .then((Responce) => {
                                                        setorderData(orderData.filter(item => item.id !== drug.id))
                                                        console.log(Responce.data)
                                                        setToastMessage('Order deleted successfully')
                                                        setShow(true)
                                                    }
                                                    ).catch((err) => {
                                                        console.log(err)
                                                    }
                                                    )
                                            }
                                            }
                                        >delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                )}
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
