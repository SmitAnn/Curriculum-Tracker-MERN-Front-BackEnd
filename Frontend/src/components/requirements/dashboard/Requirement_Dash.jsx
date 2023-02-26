import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Table, Button, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import 'react-confirm-alert/src/react-confirm-alert.css';

const Requirement_Dash = () => {

    //const url = "/api/api";
    const url = "http://localhost:5000/api";

    const [visible, setVisible] = useState(true);
    const [apiData, setApiData] = useState([]);



    useEffect(() => {

        var userType = sessionStorage.getItem("userType");
        var token = sessionStorage.getItem("userToken");

        const headers = { 'x-access-token': token };

        if (userType === 'user') {
            setVisible(false);
            axios.get(url + '/requirement/getnew', { headers: headers })
                .then((getData) => {
                    setApiData(getData.data);
                })
        }
        else {
            setVisible(true);
            axios.get(url + '/requirement/read', { headers: headers })
                .then((getData) => {
                    setApiData(getData.data);
                })
        }

    }, [])


    const setData = (id, name, area, institution, category, hours, files, isClosed) => {
        localStorage.setItem("ID", id);
        localStorage.setItem("name", name);
        localStorage.setItem("area", area);
        localStorage.setItem("institution", institution);
        localStorage.setItem("category", category);
        localStorage.setItem("hours", hours);
        localStorage.setItem("file", files);
        localStorage.setItem("isClosed", isClosed);

        /* setRequirement({'name':name,'area':area,'institution':institution,'category':category,
         'hours':hours,'file':files});   
         localStorage.setItem(LOCAL_STORAGE_KEY,json.stringify(requirement));*/
    }
    return (

        <section className="Background">

            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col ">
                        <div className="card card-table" >
                            <div className="row g-0">
                                <div className="d-flex justify-content-center pt-3">
                                    <h2 className="fw-Bolder mb-3 pb-3 headeing" >New requirements</h2>
                                </div>
                                <div >
                                    <Segment style={{ overflow: 'auto', maxHeight: 480 }}>

                                        <Table celled padded>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                                    <Table.HeaderCell>Area</Table.HeaderCell>
                                                    <Table.HeaderCell>Institution</Table.HeaderCell>
                                                    <Table.HeaderCell>Category</Table.HeaderCell>
                                                    <Table.HeaderCell>Hours</Table.HeaderCell>
                                                    <Table.HeaderCell>File</Table.HeaderCell>
                                                    <Table.HeaderCell>View</Table.HeaderCell>

                                                </Table.Row>
                                            </Table.Header>

                                            <Table.Body>

                                                {apiData.map(data => {
                                                    return (
                                                        <Table.Row key={data._id}>

                                                            <Table.Cell>{data.name}</Table.Cell>
                                                            <Table.Cell>{data.area}</Table.Cell>
                                                            <Table.Cell>{data.institution}</Table.Cell>
                                                            <Table.Cell>{data.category}</Table.Cell>
                                                            <Table.Cell>{data.hours}</Table.Cell>
                                                            <Table.Cell>{data.file}</Table.Cell>
                                                            <Table.Cell>
                                                                <Link to='/requirements/ReadOne'>
                                                                    <Button className="btn btn-secondary btn-md" onClick={() => setData(data._id, data.name, data.area, data.institution, data.category, data.hours, data.file, data.isClosed)}>View</Button>
                                                                </Link>

                                                            </Table.Cell>


                                                        </Table.Row>
                                                    )

                                                })}

                                            </Table.Body>

                                        </Table> </Segment>
                                </div><div className="d-flex justify-content-center pt-3">
                                    {visible &&
                                        <Link to='/requirements/create'>
                                            <button type="button" className="btn btn-secondary btn-lg">Create New Requirement</button>
                                        </Link>}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>

    )
}

export default Requirement_Dash