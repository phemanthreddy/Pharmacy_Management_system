import React from "react";
import { Link } from "react-router-dom";

function Nav() {
    return (
        <>
        <nav className="navbar navbar-dark bg-primary navbar-expand-lg shadow">
            <button
            onClick={()=>{
                document.querySelector('.navbar-collapse').classList.toggle('show');
            }
            }
             className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav w-100 mt-3 mt-md-0 justify-content-between">
                    <li className="nav-item d-flex justify-content-left">
                        <Link to="/" className="nav-link btn px-3 btn-block btn-primary text-white">Home</Link>
                    </li>
                    <li className="nav-item d-flex justify-content-left active">
                        
                        {localStorage.getItem("jwt") ? (
                            <button onClick={() => {
                                localStorage.removeItem("jwt");
                                localStorage.removeItem("user");
                                window.location.href = "/";
                            }
                            } className="btn btn-block mt-3 mt-md-0 btn-danger">Logout</button>
                        ) : ( 
                            <></>
                         )}
                    </li>
                </ul>
            </div>
        </nav>
        <footer className="footer shadow"
        style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            height: "7vh",
            backgroundColor: "#A5D6A7",
            zIndex: 20
        }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <p className="text-muted my-3">
                        <small style={{color:"black"}}>Capgemini_Go Pharmacy| Copyrights &copy; 2022</small>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}
export default Nav; 