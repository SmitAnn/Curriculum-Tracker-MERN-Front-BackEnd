import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Table, Button, Segment } from 'semantic-ui-react'
import { json, Link } from 'react-router-dom';

import 'react-confirm-alert/src/react-confirm-alert.css';

const Curriculum_Dash = () => {

  //const url = "/api/api";
  const url = "http://localhost:5000/api";

  const [visible, setVisible] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [editVisible, setEditVisible] = useState(true);


  useEffect(() => {
    //sessionStorage.setItem("userType", "admin");
    var userType = sessionStorage.getItem("userType");
    if (userType === 'user') {

      var userId = sessionStorage.getItem("userId");
      setVisible(false);
      setEditVisible(false);
      axios.get(url + '/curriculum/readbyuser/' + userId)
        .then((getData) => {
          setApiData(getData.data);
          // console.log("getdata"+JSON.stringify(getData));
          // console.log("data1"+JSON.stringify(getData.data));
          // console.log("data2"+JSON.stringify(getData.data.data));
          // console.log("hi");
        })
    }
    else {
      setVisible(true);
      setEditVisible(true);
      axios.get(`${url}/curriculum/read`)
        .then((getData) => {
          setApiData(getData.data);

          // console.log("data 1" + JSON.stringify(getData.data));
          // console.log("id" + (getData.data[0].id));
        })
    }

  }, [])

  const getData = () => {
    axios.get(url + '/curriculum/read')
      .then((getData) => {

        setApiData(getData.data);
      })
  }



  const setData = (id, comments, name, area, institution, category, hours, file,) => {
    localStorage.setItem("ID", id);
    localStorage.setItem("comments", comments);
    localStorage.setItem("name", name);
    localStorage.setItem("area", area);
    localStorage.setItem("institution", institution);
    localStorage.setItem("category", category);
    localStorage.setItem("hours", hours);
    localStorage.setItem("file", file)

  }
  const makeStyle = (status) => {
    if (status === 'Approved') {
      return {
        background: 'rgb(145 254 159 / 47%)',
        color: 'green',

      }
    }
    else if (status === 'Pending') {
      return {
        background: '#ecb3b5',
        color: 'red',
      }
    }
    else {
      return {
        background: '#59bfff',
        color: 'white',

      }
    }
  }
  return (
    <div >

      <section className="Background">

        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col ">
              <div className="card card-table" >
                <div className="row g-0">
                  <div className="d-flex justify-content-center pt-3">
                    <h1 className="fw-Bolder mb-3 pb-3 headeing" >Curriculum Status</h1>
                  </div>
                  <div>
                    <Segment style={{ overflow: 'auto', maxHeight: 480 }}>
                      <Table celled padded>
                        <Table.Header>
                          <Table.Row>

                            <Table.HeaderCell>name</Table.HeaderCell>
                            <Table.HeaderCell>area</Table.HeaderCell>

                            <Table.HeaderCell>category</Table.HeaderCell>


                            <Table.HeaderCell>Approval Status</Table.HeaderCell>
                            <Table.HeaderCell>View</Table.HeaderCell>


                          </Table.Row>
                        </Table.Header>
                        .
                        <Table.Body>

                          {Array.isArray(apiData)
                            ? apiData.map(data => {
                              return (
                                <Table.Row key={data._id}>


                                  <Table.Cell>{data.name}</Table.Cell>
                                  <Table.Cell>{data.area}</Table.Cell>

                                  <Table.Cell>{data.category}</Table.Cell>
                                  <Table.Cell >
                                    <span className='status' style={makeStyle(data.isApproved ? "Approved" : "Pending")}>{data.isApproved ? "Approved" : "Pending"}</span>
                                  </Table.Cell>

                                  <Table.Cell>
                                    <Link to='/curriculums/ReadOne'>
                                      <Button className="btn btn-secondary btn-md" onClick={() => setData(data._id, data.comments, data.name, data.area, data.institution, data.category, data.hours, data.file)}>View</Button>
                                    </Link >
                                  </Table.Cell>


                                </Table.Row>
                              )

                            }) : null}

                        </Table.Body>

                      </Table></Segment>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  )
}

export default Curriculum_Dash