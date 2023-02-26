import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Table, Button, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Sidebar from '../../Sidebar/Sidebar';
import RightSide from '../../RightSide/RightSide';

const Read_Curriculum = () => {

  //const url = "/api/api";
  const url = "http://localhost:5000/api";

  const [visible, setVisible] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [editVisible, setEditVisible] = useState(true);
  const ConfirmDelete = (id) => {

    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to delete this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => onDelete(id)
        },
        {
          label: 'No',
        }
      ]
    });
  }




  const onDelete = (id) => {
    var token = sessionStorage.getItem("userToken");
    console.log(token);
    const headers = { 'x-access-token': token };
    axios.delete(url + '/api/curriculum/delete/' + id, { headers: headers })
      .then((response) => {
        if (response.data.status === "success") {
          alert("Curriculum deleted successfully");
          getData();
        }
        else {
          alert("Something went wrong");
        }
      })
  }



  useEffect(() => {

    var userType = sessionStorage.getItem("userType");
    if (userType === 'user') {

      var userId = sessionStorage.getItem("userId");
      setVisible(false);
      setEditVisible(false);
      axios.get(url + '/curriculum/readbyuser/' + userId)
        .then((getData) => {
          setApiData(getData.data);
        })
    }
    else {
      setVisible(true);
      setEditVisible(true);
      axios.get(url + '/curriculum/read')
        .then((getData) => {
          setApiData(getData.data);
        })
    }

  }, [])

  const getData = () => {


    axios.get(url + '/api/curriculum/read')
      .then((getData) => {
        console.log(getData.data)
        setApiData(getData.data);
      })
  }



  const setData = (id, comments, name, area, institution, category, hours, file, isApproved) => {
    localStorage.setItem("ID", id);
    localStorage.setItem("comments", comments);
    localStorage.setItem("name", name);
    localStorage.setItem("area", area);
    localStorage.setItem("institution", institution);
    localStorage.setItem("category", category);
    localStorage.setItem("hours", hours);
    localStorage.setItem("file", file)
    localStorage.setItem("isApproved", isApproved)
  }

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <section className="Background">

          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col ">
                <div className="card card-table" >
                  <div className="row g-0">
                    <div className="d-flex justify-content-center pt-3">
                      <h1 className="fw-Bolder mb-3 pb-3 headeing" >Curriculum List</h1>
                    </div>
                    <div>
                      <Segment style={{ overflow: 'auto', maxHeight: 480 }}>

                        <Table celled padded>
                          <Table.Header>
                            <Table.Row>

                              <Table.HeaderCell>name</Table.HeaderCell>
                              <Table.HeaderCell>area</Table.HeaderCell>
                              <Table.HeaderCell>institution</Table.HeaderCell>
                              <Table.HeaderCell>category</Table.HeaderCell>
                              <Table.HeaderCell>hours</Table.HeaderCell>
                              <Table.HeaderCell>Comments</Table.HeaderCell>
                              <Table.HeaderCell>Approval Status</Table.HeaderCell>
                              <Table.HeaderCell>View</Table.HeaderCell>
                              <Table.HeaderCell>Edit</Table.HeaderCell>
                              {visible && <Table.HeaderCell>Delete</Table.HeaderCell>}
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
                                  <Table.Cell>{data.comments}</Table.Cell>
                                  <Table.Cell>{data.isApproved ? "Approved" : "Pending"}</Table.Cell>
                                  <Table.Cell>
                                    <Link to='/curriculums/ReadOne'>
                                      <Button className="btn btn-secondary btn-md" onClick={() => setData(data._id, data.comments, data.name, data.area, data.institution, data.category, data.hours, data.file, data.isApproved)}>View</Button>
                                    </Link >
                                  </Table.Cell>

                                  <Table.Cell>  {(editVisible || !data.isApproved) &&
                                    <Link to='/curriculums/update'>
                                      <Button className="btn btn-secondary btn-md" onClick={() => setData(data._id, data.comments, data.name, data.area, data.institution, data.category, data.hours, data.file, data.isApproved)}>Edit</Button>
                                    </Link>}

                                  </Table.Cell>
                                  {visible &&
                                    <Table.Cell>

                                      <Button className="btn btn-secondary btn-md" onClick={() => ConfirmDelete(data._id)}>Delete</Button>

                                    </Table.Cell>}
                                </Table.Row>
                              )

                            })}

                          </Table.Body>

                        </Table> </Segment>
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
        <RightSide />
      </div>
    </div>
  )
}

export default Read_Curriculum