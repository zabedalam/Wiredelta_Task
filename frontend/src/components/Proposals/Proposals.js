import React, { useEffect, useState, useContext } from "react";
import { Table } from "react-bootstrap";
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../App";
import Sidebar from "../Sidebar/Sidebar";

const Proposals = () => {
    const [listOfProposal, setListOfProposal] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(false)

    const [userName, setUserName] = useState("");
    const [boatType, setBoatType] = useState("");
    const [service, setService] = useState("");
    const [jobType, setJobType] = useState("");

    useEffect(() => {
        fetch("http://localhost:4000/api/jobs")
            .then((res) => res.json())
            .then((data) => setListOfProposal(data));
    }, []);


    const saveJobs = (id) => {
        axios.post(`http://localhost:4000/api/jobs/${id}`, {
            userName: userName,
            boatType: boatType,
            service: service,
            jobType: jobType
        }).then(response => {
            console.log(response.data)
        })
    }
    const handleDeleteProposal = id => {
        // DELETE request using axios with error handling
        axios.delete(`http://localhost:4000/api/jobs/${id}`)
            .then(() => {
                setListOfProposal(listOfProposal.filter((val) => {
                    return val._id != id;
                })
                )
            })
            .catch(error => {
                setErrorMessage(error.message);
                console.error('There was an error!', error);
            });

    }

    return (
        <div>
            <Sidebar />
            <section
                className="container align-items-center pt-5 col-md-6"
                style={{ marginLeft: "300px" }}
            >
                <div className="row">
                    <div className="col-sm-9">
                        <h4 className="mb-5">Proposals</h4>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Boat Type </th>
                                    <th>Service </th>
                                    <th>job Type</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listOfProposal.map((proposal) => (
                                    <tr key={proposal.id}>
                                        <td>{proposal.name}</td>
                                        <td>{proposal.boat_type}</td>
                                        <td>{proposal.service}</td>
                                        <td>{proposal.job_type}</td>
                                        <td><button className="btn btn-success" onClick={() => saveJobs(proposal.id)}>Approved Proposal</button></td>
                                        <td><button className="btn btn-danger" onClick={() => handleDeleteProposal(proposal.id)}>Cancel Proposal</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Proposals;
