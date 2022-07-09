import React, { useState, useEffect } from "react";
import axios from 'axios'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

export default function Supplier(props) {

    const [toastMessage, setToastMessage] = useState('');
    const [show, setShow] = useState(false);


    const [supplierList, setSupplierList] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [newSupplier, setnewSupplier] = useState({})
    const handleChange = (e) => {
        setnewSupplier({
            ...newSupplier,
            [e.target.name]: e.target.value
        })
    }
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchId !== '') {
        axios.get('http://localhost:8083/supplier/viewSupplier/' + searchId)
            .then((Responce) => {
                setToastMessage('Supplier found')
                setShow(true)
                setSupplierList([Responce.data])
                setSearchId('')
            })
            .catch((err) => {
                console.log(err)
                setToastMessage('Supplier not found')
                setShow(true)
            })
        }
    }
    const getSuppliersData = (e) => {
       if(e){
           e.preventDefault();
       }
        if (supplierList.length === 0 || e) {
            axios.get('http://localhost:8083/supplier/viewSuppliers')
                .then((Responce) => {
                    setSupplierList(Responce.data)
                    console.log(Responce.data)
                }).catch((err) => {
                    console.log("catched" + err)
                }
                )
        }
    }
    useEffect(() => {
        getSuppliersData()
    }, [props.uiUpdate])

    return (
        <div className="container">
            <div className="flex">
                <div className="row mb-2 justify-content-end mx-0">
                    <form onSubmit={handleSearch}>
                        <div class="form-group m-0">
                            <div class="input-group">
                                <input type="text" class="form-control" name="id" placeholder="Supplier id" value={searchId} onChange={ (e) => { setSearchId(e.target.value) }} />
                                <span class="input-group-btn">
                                    <button type="submit" class="btn btn-primary btn-search">Search</button>
                                    
                                </span>
                            </div>
                        </div>
                    </form>
                    <button className='btn btn-primary ml-2' onClick={getSuppliersData}>reset</button>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    axios.post('http://localhost:8083/supplier/addSupplier', newSupplier)
                        .then((Responce) => {
                            console.log(Responce.data)
                            setSupplierList([...supplierList, Responce.data])
                            setnewSupplier({})
                            setToastMessage('Suplier Added Successfully')
                            setShow(true)
                            // alert('Succesfully added')
                        }
                        ).catch((err) => {
                            console.log(err)
                        }
                        )
                }}>
                    <div className="form-group row justify-content-end">
                        <input type="text" className="form-control col-md-2" name="name" placeholder="name" value={newSupplier.name} onChange={handleChange} />
                        <input type="text" className="form-control col-md-2" name="id" placeholder="id" value={newSupplier.id} onChange={handleChange} />
                        <input type="text" className="form-control col-md-2" name="email" placeholder="email" value={newSupplier.email} onChange={handleChange} />
                        <input type="text" className="form-control col-md-2" name="phoneNumber" placeholder="phoneNumber" value={newSupplier.phoneNumber} onChange={handleChange} />
                        <input type="text" className="form-control col-md-2" name="drugName" placeholder="drugName" value={newSupplier.drugName} onChange={handleChange} />
                        <input type="text" className="form-control col-md-2" name="drugPrice" placeholder="drugPrice" value={newSupplier.drugPrice} onChange={handleChange} />
                        <button type="submit" className="btn btn-primary col-md-3 mt-2">Add</button>
                        
                    </div>

                </form>
            </div>
            <div className="row">
                {supplierList.map((supplier) => {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="card" style={{
                                backgroundColor: 'rgb(218, 239, 245)',
                            }}>
                                <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb8nqh2qge68dkNRHy9IT1m31Hy4y7VVrY4Q&usqp=CAU"} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title text-left font-weight-bold text-primary mb-2">{supplier.name}</h5>
                                    <p className="card-title text-left font-weight-bold text-dark m-0">id: {supplier.id}</p>
                                    <p className="card-title text-left font-weight-bold text-dark m-0">email: {supplier.email}</p>
                                    <p className="card-title text-left font-weight-bold text-dark m-0">phoneNumber: {supplier.phoneNumber}</p>
                                    <p className="card-title text-left font-weight-bold text-dark m-0">drug name: {supplier.drugName}</p>
                                    <p className="card-title text-left font-weight-bold text-dark mb-3">drug price: {supplier.drugPrice}</p>
                                    <button
                                        onClick={() => {
                                            axios.delete('http://localhost:8083/supplier/deleteSupplier/' + supplier.id)
                                                .then((Responce) => {
                                                    console.log(Responce.data)
                                                    setToastMessage('Supplier deleted successfully')
                                                    setShow(true)
                                                    setSupplierList(supplierList.filter(s => s.id !== supplier.id))
                                                }).catch((err) => {
                                                    console.log("catched" + err)
                                                }
                                                )
                                        }}
                                        className="btn btn-primary">delete</button>

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
