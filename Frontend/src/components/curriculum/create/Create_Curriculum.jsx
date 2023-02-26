import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import RightSide from '../../RightSide/RightSide';
import { useNavigate, Link } from 'react-router-dom'
const Create_Curriculum = () => {
    const navigate = useNavigate();
    const [curriculum, setCurriculum] = useState({
        comments: '',
        file: '',
        user: sessionStorage.getItem("userId"),
        requirements: '',
        isApproved: false

    });
    const [requirement, setRequirement] = useState({

        name: '',
        category: '',
        area: '',
        institution: '',
        hours: ''
    });

    useEffect(() => {
        setRequirement({
            Id: localStorage.getItem('ID'),
            name: localStorage.getItem('name'),
            category: localStorage.getItem('category'),
            area: localStorage.getItem('area'),
            institution: localStorage.getItem('institution'),
            hours: localStorage.getItem('hours')

        })

    }, []
    )

    const handleChange = e => {

        if (e.target.name !== 'file') {
            const { name, value } = e.target
            setCurriculum({ ...curriculum, [name]: value })
            console.log(value);
        }
        else {
            let name = e.target.name;
            let value = e.target.files[0];
            setCurriculum({ ...curriculum, [name]: value })
            console.log(value);
        }
    }



    const sendDataToAPI = async (event) => {
        console.log(requirement.hours);
        var { comments, file } = curriculum

        if (comments && file) {
            var token = sessionStorage.getItem("userToken");
            const config = {
                headers: { 'content-type': 'multipart/form-data', 'x-access-token': token }
            };

            const formData = new FormData();
            formData.append('comments', curriculum.comments);
            formData.append('user', curriculum.user);
            formData.append('requirement', requirement.Id);
            formData.append('file', curriculum.file);
            formData.append('isApproved', curriculum.isApproved);

            formData.append('name', requirement.name);
            formData.append('area', requirement.area);
            formData.append('category', requirement.category);
            formData.append('institution', requirement.institution);
            formData.append('hours', requirement.hours);


            const response = await axios.post(`http://localhost:5000/api/curriculum/create`, formData, config)

            if (response.data.success) {
                const ReqStatus =
                {
                    "_id": requirement.Id,
                    "isClosed": true
                }
                axios.put(`/api/api/requirement/updateStatus`, ReqStatus)
                alert("Curriculum created successfully");
                navigate('/curriculums/ReadAll');



            }
            else {
                alert("Curriculum Creation failed");
            }

        }
        else {
            alert("Invalid Input");
        }

    }



    return (
        <div className="App">
            <div className="AppGlass">
                <Sidebar />
                <section className="Background">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col ">
                                <div className="card card-form" >
                                    <div className="row g-0">

                                        <div className="col-xl-12">
                                            <form encType='multipart/form-data'>
                                                <div className="card-body p-md-5 text-black">
                                                    <div className="d-flex justify-content-center pt-3">
                                                        <h1 className="fw-Bolder mb-3 pb-3 headeing" >Curriculum</h1>
                                                    </div>
                                                    <br /><br />
                                                    <div >
                                                        <textarea className="form-control form-control-lg" name='comments' value={curriculum.comments} onChange={handleChange} id="exampleFormControlTextarea1" rows="3" placeholder="Comments" required></textarea>

                                                    </div>
                                                    <br />


                                                    <div className="form-group">
                                                        <input type="file" name="file" onChange={handleChange} className='form-control form-control-md' placeholder='Choose file' />
                                                    </div>



                                                    <br />
                                                    <div className="d-flex justify-content-center pt-3">
                                                        <Link to='/curriculums/ReadAll'>
                                                            <button type="button" className="btn btn-secondary btn-md">Back</button>
                                                        </Link>
                                                        <button type="button" onClick={sendDataToAPI} className="btn btn-secondary btn-md ms-2">Create</button>
                                                    </div>
                                                </div>
                                            </form>
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

export default Create_Curriculum