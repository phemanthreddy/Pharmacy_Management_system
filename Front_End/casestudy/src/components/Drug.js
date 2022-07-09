import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'


export default function Drug(props) {

    const [drugData, setDrugData] = useState(
        []
    );
    const [toastMessage, setToastMessage] = useState('');
    const [show, setShow] = useState(false);
    const [searchId, setSearchId] = useState('');
    const [newDrugData, setNewDrugData] = useState({}
    );
    const handleChange = (e) => {
        setNewDrugData({
            ...newDrugData,
            [e.target.name]: e.target.value
        })
    }
    				//--------------------------------View Drug By ID------------------------------//

    const handleSearch = (e) => {             /////// ----------- view by id ------//
        e.preventDefault();
        let url = localStorage.getItem('user') === 'admin' ? 'http://localhost:8081/admin/viewDrug/{id}?id=' + searchId :' http://localhost:8082/doctor/viewDrug/{id}?id='+ searchId
        if (searchId !== '') {
            axios.get( url , {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
                .then((Responce) => {
                    setToastMessage('Drug found')
                    setShow(true)
                    setDrugData([Responce.data])
                })
                .catch((err) => {
                    console.log(err)
                    setToastMessage('Drug not found')
                    setShow(true)
                })
            setSearchId('')
        }

    }
        				//--------------------------------Add Drug------------------------------//

    const handleSubmit = (e) => {    
        e.preventDefault();
        axios.post('http://localhost:9090/admin/admin/addDrug', newDrugData,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            }
        )

            .then((Responce) => {
                console.log(Responce.data)
                setDrugData([...drugData, Responce.data])
                setNewDrugData({})
                setToastMessage('Drug Added Successfully')
                setShow(true)
            }
            ).catch((err) => {
                console.log(err)
            }
            )
    }


        				//--------------------------------View Drugs ------------------------------//

    const getDrugData = (e) => {
        if (e) {
            e.preventDefault();
        } 
        let url = localStorage.getItem('user') === 'admin' ? 'http://localhost:9090/admin/admin/viewDrugs' : 'http://localhost:9090/doctor/doctor/viewDrugs'                       
        if (drugData.length === 0 || e) {
            axios.get(
                url,
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('jwt')
                    }
                }
            )
               .then((Responce) => {
                    console.log(Responce.data)
                    if (Responce.data.message === "Network Error") {
                        setToastMessage('Network Error')
                        setShow(true)
                    } else {
                        setDrugData(Responce.data)
                    }

                })
                .catch((err) => {
                    console.log(err)
                    console.log(err.Responce)
                    console.log('Please Try again')
                }) } }

    useEffect(() => {
        getDrugData()
    }, [props.uiUpdate])
    console.log(drugData.length);


    return (
        <div className="container">
            <div className="row mb-2 justify-content-end mx-0">
                <form onSubmit={handleSearch}>
                    <div class="form-group m-0">
                        <div class="input-group">
                            <input type="text" class="form-control" name="id" placeholder="Drug id" value={searchId} onChange={(e) => { setSearchId(e.target.value) }} />
                            <span class="input-group-btn">
                                <button type="submit" class="btn btn-primary btn-search">Search</button>

                            </span>
                        </div>
                    </div>
                </form>
                <button className='btn btn-primary ml-2' onClick={getDrugData}>reset</button>
            </div>
            {
                localStorage.getItem('user') === 'admin' ? (
                    <div className="">
                        <form className="form-inline row mx-0 justify-content-end" onSubmit={handleSubmit}>
                            <input value={newDrugData.drugName} onChange={handleChange} name="drugName" className="form-control mr-sm-2 mb-2" placeholder="drug name" />
                            <input value={newDrugData.id} onChange={handleChange} name="id" className="form-control mr-sm-2 mb-2" placeholder="id" />
                            <input value={newDrugData.price} onChange={handleChange} name="price" className="form-control mr-sm-2 mb-2" placeholder="drug price" />
                            <input className='btn btn-primary mb-2' type="submit" value="Add" />
                        </form>
                    </div>
                ) : <></>
            }
            <div className="row mt-4">

                {drugData.map((drug, index) => {
                    return (
                        <div className="col-lg-3 col-md-4 mb-4 col-sm-6" key={index}>
                             <div className="card" style={{
                                backgroundColor: 'rgb(218, 239, 245)',
                            }}>
                                <img className='card-img-top' src={"https://static.vecteezy.com/system/resources/thumbnails/004/948/182/small_2x/medicine-and-drugs-pills-set-collection-with-modern-flat-style-free-vector.jpg"} alt="drug" />
                                <div className="card-body">

                                    <h5 className="card-title font-weight-bold text-primary text-left mb-2">{drug.drugName}</h5>
                                    <p className="card-text text-left m-0 font-weight-bold text-dark">ID: {drug.id}</p>
                                    <p className="card-text text-left m-0 font-weight-bold text-dark">PRICE: {drug.price}</p>
                                    <div className="d-flex justify-content-between mt-2">
                                        {
                                            localStorage.getItem('user') === "admin" ? (
                                                <>
                                                    <button className="btn btn-primary"
                                                        onClick={() => {
                                                            setNewDrugData({
                                                                drugName: drug.drugName,
                                                                id: drug.id,
                                                                price: drug.price
                                                            })
                                                            document.querySelector('.modal').style.display = 'block'
                                                        }
                                                        }

                                                    >edit</button>
                                                    <div className="modal" tabindex="-1" role="dialog">
                                                        <div className="modal-dialog" role="document">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title">Edit {
                                                                        newDrugData.drugName
                                                                    }</h5>
                                                                    <button type="button"
                                                                        onClick={() => {
                                                                            document.querySelector('.modal').style.display = 'none'
                                                                            setNewDrugData({})
                                                                        }
                                                                        } className="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    {<>
                                                                        <input value={newDrugData.drugName} onChange={handleChange} name="drugName" className="form-control mr-sm-2" placeholder="drug name" />

                                                                        <input value={newDrugData.price} onChange={handleChange} name="price" className="form-control mr-sm-2" placeholder="drug price" />
                                                                    </>

                                                                    }
                                                                </div>          
                                                                <div className="modal-footer">
                                                                    <button type="button"
                                                                        onClick={() => {
                                                                            axios.put('http://localhost:8084/drug/updateDrug/' + newDrugData.id
                                                                                , {

                                                                                    drugName: newDrugData.drugName,
                                                                                    id: newDrugData.id,
                                                                                    price: newDrugData.price
                                                                                })
                                                                                .then((Responce) => {
                                                                                    setToastMessage('Drug updated successfully')
                                                                                    setShow(true)
                                                                                    setDrugData(drugData.map(drug => {
                                                                                        if (drug.id === newDrugData.id) {

                                                                                            return newDrugData
                                                                                        } else {
                                                                                            return drug
                                                                                        }
                                                                                    }
                                                                                    ))

                                                                                    console.log(Responce.data)
                                                                                }
                                                                                ).catch((err) => {
                                                                                    console.log(err)
                                                                                }
                                                                                )
                                                                            document.querySelector('.modal').style.display = 'none'
                                                                            setNewDrugData({})
                                                                        }
                                                                        }
                                                                        className="btn btn-primary">Save changes</button>
                                                                    <button type="button"
                                                                        onClick={() => {
                                                                            document.querySelector('.modal').style.display = 'none'
                                                                            setNewDrugData({})
                                                                        }
                                                                        }
                                                                        className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-danger"
                                                        onClick={() => {   ////////-----delete drug---////////
                                                            axios.delete('http://localhost:9090/admin/admin/deleteDrug/{id}?id=' + drug.id,
                                                                {
                                                                    
                                                                        headers: {
                                                                            Authorization: 'Bearer ' + localStorage.getItem('jwt')
                                                                        }
                                                                })
                                                                .then((Responce) => {
                                                                    console.log(Responce.data)
                                                                    setToastMessage('Drug deleted successfully')
                                                                    setShow(true)
                                                                    
                                                                    setDrugData(drugData.filter(d => d.id !== drug.id))
                                                                })
                                                                .catch((err) => {
                                                                    console.log(err)
                                                                })
                                                        }
                                                        }
                                                    >delete</button>
                                                </>
                                            ) : (
                                                <button className="btn btn-danger"
                                                    onClick={() => {   //////---add orders by doctor--///////
                                                        axios.post('http://localhost:8085/orders/addOrders',
                                                       {
                                                                id: drug.id,
                                                                drugName: drug.drugName,
                                                                drugPrice: drug.price
                                                            })
                                                            .then((Responce) => {
                                                                console.log(Responce.data)
                                                                setToastMessage('Drug added to Orders successfully')
                                                            
                                                                setShow(true)
                                                                props.setUiUpdate(props.uiUpdate + 1)
                                                                console.log("updated" + props.uiUpdate + "times")
                                                            }
                                                            ).catch((err) => {
                                                                console.log(err)
                                                            }
                                                            )
                                                    }
                                                    }
                                                >order</button>
                                            )
                                        }
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
