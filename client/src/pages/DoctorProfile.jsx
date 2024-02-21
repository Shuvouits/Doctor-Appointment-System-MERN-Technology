import React, { useEffect, useState } from 'react'
import Doctor from "../images/doctor-img02.png"
import { FaStar } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie"
import Swal from 'sweetalert2';

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app, storage } from '../firebase.js'
import { BeatLoader } from 'react-spinners';


function DoctorProfile() {
    const { user } = useSelector((state) => ({ ...state }))
    const { doctorProfile } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch();
    const [overView, setOverView] = useState(true)
    const [profile, setProfile] = useState(false)
    const [file, setFile] = useState(undefined)
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false)
    const [imagePreview, setImagePreview] = useState(null);
    //Date Picker
    const [selectedDate, setSelectedDate] = useState(null);
    const [imageLoading, setImageLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    


    const CustomInput = ({ value, onClick }) => (
        <input
            className="custom-datepicker-input"
            value={value}
            onClick={onClick}
            readOnly
        />
    );

    const handleOverview = () => {
        setOverView(true)
        setProfile(false)

    }

    const handleProfile = () => {
        setOverView(false)
        setProfile(true)
    }

    const [formData, setFormData] = useState({})








    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })

    }

    //Image Uploading Start

    const handleFileUpload = (file) => {
        setImageLoading(true)
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFilePerc(Math.round(progress));
        }, (error) => {
            setFileUploadError(true);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setFormData({ ...formData, avatar: downloadURL });
                setImagePreview(downloadURL);
                setImageLoading(false)
            });
        });
    };

    useEffect(() => {

        if (file) {
            handleFileUpload(file)
        }

    }, [file]);

    //Finished



    //dynamic qualification form start

    const [qualifications, setQualifications] = useState([
        {
            id: 1,
            startDate: null,
            endDate: null,
            qdegree: '',
            quniversity: ''
        },
    ]);



    const handleAddQualification = () => {
        setQualifications([
            ...qualifications,
            { id: qualifications.length + 1, startDate: null, endDate: null, qdegree: '', quniversity: '' },
        ]);
    };

    const handleRemoveQualification = (id) => {
        setQualifications(qualifications.filter((qualification) => qualification.id !== id));
    };

    const handleQualificationChange = (id, field, value) => {
        setQualifications((prevQualifications) =>
            prevQualifications.map((qualification) =>
                qualification.id === id ? { ...qualification, [field]: value } : qualification
            )

        );

    };



    //End

    /* const handleDynamicChange = (id, field, value, setState) => {
         setState((prevData) =>
             prevData.map((item) => (item.id === id ? { ...item, [field]: value } : item))
         );
     }; */

    //dynamic experience form start

    const [experience, setExperience] = useState([
        { id: 1, estartDate: null, eendDate: null, edegree: '', euniversity: '' },
    ]);

    const handleAddExperience = () => {
        setExperience([
            ...experience,
            { id: experience.length + 1, estartDate: null, eendDate: null, edegree: '', euniversity: '' },
        ]);
    };

    const handleRemoveExperience = (id) => {
        setExperience(experience.filter((experience) => experience.id !== id));
    };

    const handleExperienceChange = (id, field, value) => {
        setExperience((prevExperience) =>
            prevExperience.map((experience) =>
                experience.id === id ? { ...experience, [field]: value } : experience
            )
        );
    };



    //End


    //dynamic Time form start

    const [time, setTime] = useState([
        { id: 1, startDate: null, endDate: null, day: '' },
    ]);

    const handleAddTime = () => {
        setTime([
            ...time,
            { id: time.length + 1, startTime: null, endTime: null, day: '' },
        ]);
    };

    const handleRemoveTime = (id) => {
        setTime(time.filter((time) => time.id !== id));
    };

    const handleTimeChange = (id, field, value) => {
        setTime((prevTime) =>
            prevTime.map((time) =>
                time.id === id ? { ...time, [field]: value } : time
            )
        );
    };



    //End







    //log out functionality
    const handleLogout = async () => {
        try {

            const res = await fetch('http://localhost:4000/signout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                }
            });

            const data = await res.json();

            if (res.status === 200) {
                dispatch({ type: "LOGOUT", payload: null });
                Cookies.set("user", null);
                Cookies.set('doctorProfile', null);

                Swal.fire({
                    toast: true,
                    position: 'top-right',
                    animation: true,
                    text: `${user.fullName}, You have logged out`,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    customClass: {
                        container: 'custom-toast-container',
                        popup: 'custom-toast-popup',
                        title: 'custom-toast-title',
                        icon: 'custom-toast-icon',
                    },
                });


                navigate('/login')
            }

        } catch (error) {

        }

    }

    //Data Update form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        // Handle overall form submission logic
        const updatedFormData = {
            ...formData,
            time,
            qualifications,
            experience
        }

        console.log(updatedFormData);

        try {

            //FileImage Process

            if (file) {

                const storageRef = ref(storage, `/files/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                // Wait for both upload and download URL retrieval
                const [snapshot] = await Promise.all([
                    new Promise((resolve, reject) => {
                        uploadTask.on(
                            "state_changed",
                            (snapshot) => {
                                // Handle upload state changes if needed
                            },
                            (err) => {
                                console.log(err);
                                reject(err);
                            },
                            () => {
                                resolve(uploadTask.snapshot);
                            }
                        );
                    }),
                ]);

                // Get the download URL
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                // Update formData with the download URL
                setFormData((prevData) => ({
                    ...prevData,
                    avatar: downloadURL,
                }));

            }

            //End

            // Make the API request with updated formData
            const res = await fetch('http://localhost:4000/doctor-profile-update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(updatedFormData),
            });

            const data = await res.json();



            if (res.status === 200) {

                dispatch({ type: "UPDATE", payload: data });
                Cookies.set("user", JSON.stringify(data));
                setLoading(false)

                Swal.fire({
                    toast: true,
                    position: 'top-right',
                    animation: true,
                    text: `Your profile is successfully updated`,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    customClass: {
                        container: 'custom-toast-container',
                        popup: 'custom-toast-popup',
                        title: 'custom-toast-title',
                        icon: 'custom-toast-icon',
                    },
                });




            }

        } catch (error) {
            setLoading(true)

            Swal.fire({
                toast: true,
                position: 'top-right',
                animation: true,
                text: `Error..your profile is not updated`,
                icon: 'error',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                customClass: {
                    container: 'custom-toast-container',
                    popup: 'custom-toast-popup',
                    title: 'custom-toast-title',
                    icon: 'custom-toast-icon',
                },
            });

            setLoading(false)
        }



    };

    //Shows all doctor data
    useEffect(() => {
        const fetchDoctorProfile = async () => {

            const res = await fetch('http://localhost:4000/doctor-profile-show', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const data = await res.json();

            if (res.status === 200) {
                // Update formData with the fetched data
                setFormData((prevData) => ({
                    ...prevData,
                    ...data
                }));

                setQualifications(data.qualifications || []);
                setExperience(data.experience || []);
                setTime(data.time || []);

                dispatch({ type: "DOCTORPROFILEUPDATE", payload: data });
                Cookies.set("doctorProfile", JSON.stringify(data));

            }



        };

        fetchDoctorProfile();
    }, []);

    //End

    return (

        <div className='doctor-profile-container'>
            {
                loading && (

                    <div className='spinners'>
                        <BeatLoader color="red" />
                    </div>

                )
            }

            <div className='doctor-profile'  style={{ opacity: loading ? '0.3' : '1' }}>
                <div className='left-part'>
                    <div className='list'>
                        <ul>
                            <li className={overView ? 'active' : ''} onClick={handleOverview}>Overview</li>
                            <li>Appointments</li>
                            <li className={profile ? 'active' : ''} onClick={handleProfile}>Profile</li>
                        </ul>

                    </div>
                    <div className='account-btn'>
                        <button className='logout' onClick={handleLogout}>LogOut</button>
                        <button className='delete'>Delete Account</button>

                    </div>
                </div>

                {overView && (

                    <div className='right-part'>
                        <div className='dprofile'>
                            <div className='image'>
                                <img src={Doctor} />
                            </div>
                            <div className='info'>
                                <span className='designation'>Suregon</span>
                                <span>Shuvo Bhowmik</span>
                                <span><FaStar /> 4.5 (233)</span>
                                <span>Doctor Bio</span>
                            </div>
                        </div>
                        <div className='dabout'>
                            <p>
                                It is a long established fact that a reader will be distracted by the readable content
                                of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                more-or-less normal distribution of letters, as opposed to using 'Content here, content here',
                                making it look like readable English. Many desktop publishing packages and web page editors now
                                use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web
                                sites still in their infancy. Various versions have evolved over the years, sometimes by accident,
                                sometimes on purpose (injected humour and the like).
                            </p>
                        </div>

                        <div style={{ display: "flex", gap: "15px" }}>

                            <div className='education'>
                                <h2>Education</h2>

                                <div className='edetails'>
                                    <div className='info'>
                                        <span>University of California</span>
                                        <span>Phd in Suregon <span style={{ color: 'blue', fontWeight: 'bold' }}>(New Applo hospital in newWork)</span></span>
                                    </div>

                                    <div className='info'>
                                        <span>University of California</span>
                                        <span>Phd in Suregon <span style={{ color: 'blue', fontWeight: 'bold' }}>(New Applo hospital in newWork)</span></span>
                                    </div>

                                    <div className='info'>
                                        <span>University of California</span>
                                        <span>Phd in Suregon <span style={{ color: 'blue', fontWeight: 'bold' }}>(New Applo hospital in newWork)</span></span>
                                    </div>




                                </div>



                            </div>

                            <div className='education'>
                                <h2>Experience</h2>

                                <div className='edetails'>
                                    <div className='info'>
                                        <span>University of California</span>
                                        <span>Phd in Suregon <span style={{ color: 'blue', fontWeight: 'bold' }}>(New Applo hospital in newWork)</span></span>
                                    </div>

                                    <div className='info'>
                                        <span>University of California</span>
                                        <span>Phd in Suregon <span style={{ color: 'blue', fontWeight: 'bold' }}>(New Applo hospital in newWork)</span></span>
                                    </div>

                                    <div className='info'>
                                        <span>University of California</span>
                                        <span>Phd in Suregon <span style={{ color: 'blue', fontWeight: 'bold' }}>(New Applo hospital in newWork)</span></span>
                                    </div>




                                </div>



                            </div>

                        </div>




                    </div>

                )}

                {profile && (
                    <div className='profile-doctor'>
                        <h2>Profile Information</h2>
                        <form className='form' onSubmit={handleSubmit}>

                            <div className='form-group'>
                                <label>Full Name</label>
                                <input type='text' value={formData.fullName} id='fullName' onChange={handleChange} className='form-control' placeholder='Full Name' />
                            </div>

                            <div className='form-group'>
                                <label>Email</label>
                                <input type='email' value={formData.email} id='email' onChange={handleChange} className='form-control' placeholder='Email' />
                            </div>

                            <div className='form-group'>
                                <label>Phone Number</label>
                                <input type='number' value={formData.phone} id='phone' onChange={handleChange} className='form-control' placeholder='Phone Number' />
                            </div>

                            <div className='form-group'>
                                <label>Bio</label>
                                <input type='text' value={formData.bio} id='bio' onChange={handleChange} className='form-control' placeholder='Bio' />
                            </div>

                            <div className='col'>

                                <div class="form-group">
                                    <label for="gender">Gender</label>
                                    <select class="form-select" id="gender" onChange={handleChange} defaultValue={formData.gender}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="speciality">Specialization</label>
                                    <select class="form-select" id="speciality" defaultValue={formData.speciality} onChange={handleChange}>
                                        <option value='' selected>--Select--</option>
                                        <option value='Cancer'>Cancer</option>
                                        <option value='Heart & Vescular'>Heart & Vescular</option>
                                        <option value='Libour & Delivery'>Libour & Delivery</option>
                                        <option value='Mental Health'>Mental Health</option>
                                        <option value='Nuerology'>Nuerology</option>
                                        <option value='Burn'>Burn</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="ticket">Ticket Price</label>
                                    <select class="form-select" id="ticket" defaultValue={formData.ticket} onChange={handleChange}>
                                        <option selected>--Select--</option>
                                        <option value='200'>200</option>
                                        <option value='300'>300</option>
                                        <option value='500'>500</option>
                                        <option value='1000'>1000</option>
                                    </select>
                                </div>

                            </div>

                            <span onClick={handleAddQualification} className='qualification-btn'>Add Qualification</span>

                            <div style={{ width: "100%" }}>

                                {qualifications.map((qualification) => (
                                    <div key={qualification.id}>
                                        <div className='col'>

                                            <div className='form-group'>
                                                <label>Starting Date</label>
                                                <DatePicker
                                                    customInput={<CustomInput />}
                                                    wrapperClassName="custom-datepicker-wrapper"
                                                    selected={qualification.startDate}
                                                    onChange={(date) => handleQualificationChange(qualification.id, 'startDate', date)}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            </div>

                                            <div className='form-group'>
                                                <label>Ending Date</label>
                                                <DatePicker
                                                    customInput={<CustomInput />}
                                                    wrapperClassName="custom-datepicker-wrapper"
                                                    selected={qualification.endDate}
                                                    onChange={(date) => handleQualificationChange(qualification.id, 'endDate', date)}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            </div>

                                        </div>
                                        <br></br>

                                        <div className='col'>
                                            <div class="form-group">
                                                <label for="qdegree">Degree</label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    id="qdegree"
                                                    value={qualification.qdegree}
                                                    onChange={(e) => handleQualificationChange(qualification.id, 'qdegree', e.target.value)}
                                                />

                                            </div>

                                            <div class="form-group" style={{ marginLeft: "15px" }}>
                                                <label for="quniversity">University</label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    id="quniversity"
                                                    value={qualification.quniversity}
                                                    onChange={(e) => handleQualificationChange(qualification.id, 'quniversity', e.target.value)}
                                                />
                                            </div>
                                        </div>




                                        <button className='remove-qualification-btn' type="button" onClick={() => handleRemoveQualification(qualification.id)}>
                                            Remove Qualification
                                        </button>
                                        <br></br>
                                        <br></br>

                                    </div>
                                ))}

                            </div>

                            <span onClick={handleAddExperience} className='qualification-btn'>Add Experience</span>

                            <div style={{ width: "100%" }}>

                                {experience.map((experience) => (
                                    <div key={experience.id}>
                                        <div className='col'>

                                            <div className='form-group'>
                                                <label>Starting Date</label>
                                                <DatePicker
                                                    customInput={<CustomInput />}
                                                    wrapperClassName="custom-datepicker-wrapper"
                                                    selected={experience.estartDate}
                                                    onChange={(date) => handleExperienceChange(experience.id, 'estartDate', date)}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            </div>

                                            <div className='form-group'>
                                                <label>Ending Date</label>
                                                <DatePicker
                                                    customInput={<CustomInput />}
                                                    wrapperClassName="custom-datepicker-wrapper"
                                                    selected={experience.eendDate}
                                                    onChange={(date) => handleExperienceChange(experience.id, 'eendDate', date)}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            </div>

                                        </div>
                                        <br></br>

                                        <div className='col'>
                                            <div class="form-group">
                                                <label for="edegree">Degree</label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    id="edegree"
                                                    value={experience.edegree}
                                                    onChange={(e) => handleExperienceChange(experience.id, 'edegree', e.target.value)}
                                                />

                                            </div>

                                            <div class="form-group" style={{ marginLeft: "15px" }}>
                                                <label for="euniversity">University</label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    id="euniversity"
                                                    value={experience.euniversity}
                                                    onChange={(e) => handleExperienceChange(experience.id, 'euniversity', e.target.value)}
                                                />
                                            </div>
                                        </div>




                                        <button className='remove-qualification-btn' type="button" onClick={() => handleRemoveExperience(experience.id)}>
                                            Remove Experience
                                        </button>
                                        <br></br>
                                        <br></br>

                                    </div>
                                ))}

                            </div>

                            <span onClick={handleAddTime} className='qualification-btn'>Add Time</span>

                            <div style={{ width: "100%" }}>

                                {time.map((time) => (
                                    <div key={time.id}>
                                        <div className='col'>

                                            <div class="form-group">
                                                <label for="day">Day</label>
                                                <select
                                                    class="form-select"
                                                    id="day"
                                                    value={time.day}
                                                    onChange={(e) => handleTimeChange(time.id, 'day', e.target.value)}
                                                >
                                                    <option value='' selected>--Select--</option>
                                                    <option value='saturday'>Saturday</option>
                                                    <option value='sunday'>Sunday</option>
                                                    <option value='monday'>Monday</option>
                                                    <option value='tuesday'>Tuesday</option>
                                                    <option value='wednessday'>Wednessday</option>
                                                    <option value='thursday'>Thursday</option>
                                                    <option value='friday'>Friday</option>
                                                </select>
                                            </div>

                                            <div className='form-group'>
                                                <label>Starting Time</label>
                                                <select
                                                    class="form-select"
                                                    id="startTime"
                                                    value={time.startTime}
                                                    onChange={(e) => handleTimeChange(time.id, 'startTime', e.target.value)}
                                                >
                                                    <option value='' selected>--Select--</option>
                                                    <option value='1.00 am'>1.00 am</option>
                                                    <option value='2.00 am'>2.00 am</option>
                                                    <option value='3.00 am'>3.00 am</option>
                                                    <option value='4.00 am'>4.00 am</option>
                                                    <option value='5.00 am'>5.00 am</option>
                                                    <option value='6.00 am'>6.00 am</option>
                                                    <option value='7.00 am'>7.00 am</option>
                                                    <option value='8.00 am'>8.00 am</option>
                                                    <option value='9.00 am'>9.00 am</option>
                                                    <option value='10.00 am'>10.00 am</option>
                                                    <option value='11.00 am'>11.00 am</option>
                                                    <option value='12.00 pm'>12.00 pm</option>
                                                    <option value='1.00 pm'>1.00 pm</option>
                                                    <option value='2.00 pm'>2.00 pm</option>
                                                    <option value='3.00 pm'>3.00 pm</option>
                                                    <option value='4.00 pm'>4.00 pm</option>
                                                    <option value='5.00 pm'>5.00 pm</option>
                                                    <option value='6.00 pm'>6.00 pm</option>
                                                    <option value='7.00 pm'>7.00 pm</option>
                                                    <option value='8.00 pm'>8.00 pm</option>
                                                    <option value='9.00 pm'>9.00 pm</option>
                                                    <option value='10.00 pm'>10.00 pm</option>
                                                    <option value='11.00 pm'>11.00 pm</option>

                                                </select>
                                            </div>

                                            <div className='form-group'>
                                                <label>Ending Time</label>
                                                <select
                                                    class="form-select"
                                                    id="startTime"
                                                    value={time.endTime}
                                                    onChange={(e) => handleTimeChange(time.id, 'endTime', e.target.value)}
                                                >
                                                    <option value='' selected>--Select--</option>
                                                    <option value='1.00 am'>1.00 am</option>
                                                    <option value='2.00 am'>2.00 am</option>
                                                    <option value='3.00 am'>3.00 am</option>
                                                    <option value='4.00 am'>4.00 am</option>
                                                    <option value='5.00 am'>5.00 am</option>
                                                    <option value='6.00 am'>6.00 am</option>
                                                    <option value='7.00 am'>7.00 am</option>
                                                    <option value='8.00 am'>8.00 am</option>
                                                    <option value='9.00 am'>9.00 am</option>
                                                    <option value='10.00 am'>10.00 am</option>
                                                    <option value='11.00 am'>11.00 am</option>
                                                    <option value='12.00 pm'>12.00 pm</option>
                                                    <option value='1.00 pm'>1.00 pm</option>
                                                    <option value='2.00 pm'>2.00 pm</option>
                                                    <option value='3.00 pm'>3.00 pm</option>
                                                    <option value='4.00 pm'>4.00 pm</option>
                                                    <option value='5.00 pm'>5.00 pm</option>
                                                    <option value='6.00 pm'>6.00 pm</option>
                                                    <option value='7.00 pm'>7.00 pm</option>
                                                    <option value='8.00 pm'>8.00 pm</option>
                                                    <option value='9.00 pm'>9.00 pm</option>
                                                    <option value='10.00 pm'>10.00 pm</option>
                                                    <option value='11.00 pm'>11.00 pm</option>

                                                </select>
                                            </div>





                                        </div>

                                        <button className='remove-qualification-btn' type="button" onClick={() => handleRemoveTime(time.id)}>
                                            Remove Time
                                        </button>
                                        <br></br>
                                        <br></br>

                                    </div>
                                ))}

                            </div>


                            <div className='form-group'>
                                <label for='about'>About</label>
                                <textarea className='form-control' value={formData.about} id='about' onChange={handleChange} style={{ height: '100px', paddingTop: "15px" }} />
                            </div>

                            <div className='col'>
                                <div className='upload-img'>
                                    {
                                        imagePreview ? (
                                            <img src={formData.avatar} style={{ width: "100px", height: "100px", borderRadius: "50px" }} />

                                        ) : (
                                            <img src={user.avatar} style={{ width: "100px", height: "100px", borderRadius: "50px" }} />
                                        )
                                    }

                                </div>

                                <div className='form-group'>
                                    <input type='file' onChange={(e) => setFile(e.target.files[0])} className='form-control' />
                                </div>

                            </div>

                            {
                                imageLoading && (

                                    <span>{filePerc}% </span>

                                )
                            }

                            <button type='submit' className='submit-btn' style={{ background: loading || imageLoading ? 'red' : '', cursor: loading || imageLoading ? 'not-allowed' : 'pointer' }}>
                                {loading ? 'Profile Updated....' : ' Submit'}
                                
                            </button>








                        </form>
                    </div>
                )}


            </div>
        </div>


    )
}

export default DoctorProfile