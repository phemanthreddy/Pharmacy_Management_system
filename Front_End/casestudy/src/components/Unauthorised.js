import React from "react";


export default function Unauthorised() {
    return (
        <div className="container mt-5">
            <div className='col-md-12'>
                <img
                    className='img-fluid' 
                    src="https://stories.freepiklabs.com/storage/42128/401-error-unauthorized-cuate-6560.png" ></img>

        
            <div className="row mb-2 justify-content-end mx-0">
                <div className="col-md-12">
                        <h4 className="alert-heading">You are not authorised to view this page</h4>
                        <p>
                            Please login to view this page
                        </p>
                      
                        <p className="mb-5">
                            <a href="/login" className="btn btn-primary">Login</a>
                        </p>
                       
                    </div>
                </div>
            </div>
        </div>    
    )
}