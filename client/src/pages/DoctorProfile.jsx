import React, { useState } from 'react'
import Doctor from "../images/doctor-img02.png"
import { FaStar } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie"
import Swal from 'sweetalert2';


function DoctorProfile() {
    const {user} = useSelector((state)=> ({...state}))
    const dispatch = useDispatch();
    const [overView, setOverView] = useState(true)
    const [profile, setProfile] = useState(false)
    //Date Picker
    const [selectedDate, setSelectedDate] = useState(null);


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

    //dynamic qualification form start

    const [qualifications, setQualifications] = useState([
        { id: 1, startDate: null, endDate: null, degree: '', university: '' },
    ]);

    const handleAddQualification = () => {
        setQualifications([
            ...qualifications,
            { id: qualifications.length + 1, startDate: null, endDate: null, degree: '', university: '' },
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

    //dynamic experience form start

    const [experience, setExperience] = useState([
        { id: 1, startDate: null, endDate: null, degree: '', university: '' },
    ]);

    const handleAddExperience = () => {
        setExperience([
            ...experience,
            { id: experience.length + 1, startDate: null, endDate: null, degree: '', university: '' },
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
        { id: 1, startDate: null, endDate: null, degree: '', university: '' },
    ]);

    const handleAddTime = () => {
        setTime([
            ...time,
            { id: time.length + 1, startDate: null, endDate: null, degree: '', university: '' },
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


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle overall form submission logic
        console.log('Qualifications:', qualifications);
    };


    return (

        <div className='doctor-profile'>
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
                            <input type='text' className='form-control' placeholder='Full Name' />
                        </div>

                        <div className='form-group'>
                            <label>Email</label>
                            <input type='text' className='form-control' placeholder='Full Name' />
                        </div>

                        <div className='form-group'>
                            <label>Phone Number</label>
                            <input type='text' className='form-control' placeholder='Full Name' />
                        </div>

                        <div className='form-group'>
                            <label>Bio</label>
                            <input type='text' className='form-control' placeholder='Full Name' />
                        </div>

                        <div className='col'>

                            <div class="form-group">
                                <label for="sel1">Gender</label>
                                <select class="form-select" id="sel1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="sel1">Specialization</label>
                                <select class="form-select" id="sel1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="sel1">Ticket Price</label>
                                <select class="form-select" id="sel1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </div>

                        </div>

                        <button onClick={handleAddQualification} className='qualification-btn'>Add Qualification</button>

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
                                            <label for="degree">Degree</label>
                                            <select
                                                class="form-select"
                                                id="degree"
                                                value={qualification.degree}
                                                onChange={(e) => handleQualificationChange(qualification.id, 'degree', e.target.value)}
                                            >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label for="university">University</label>
                                            <select
                                                class="form-select"
                                                id="university"
                                                value={qualification.university}
                                                onChange={(e) => handleQualificationChange(qualification.id, 'university', e.target.value)}
                                            >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                            </select>
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

                        <button onClick={handleAddExperience} className='qualification-btn'>Add Experience</button>

                        <div style={{ width: "100%" }}>

                            {experience.map((experience) => (
                                <div key={experience.id}>
                                    <div className='col'>

                                        <div className='form-group'>
                                            <label>Starting Date</label>
                                            <DatePicker
                                                customInput={<CustomInput />}
                                                wrapperClassName="custom-datepicker-wrapper"
                                                selected={experience.startDate}
                                                onChange={(date) => handleQualificationChange(experience.id, 'startDate', date)}
                                                dateFormat="dd/MM/yyyy"
                                            />
                                        </div>

                                        <div className='form-group'>
                                            <label>Ending Date</label>
                                            <DatePicker
                                                customInput={<CustomInput />}
                                                wrapperClassName="custom-datepicker-wrapper"
                                                selected={experience.endDate}
                                                onChange={(date) => handleExperienceChange(experience.id, 'endDate', date)}
                                                dateFormat="dd/MM/yyyy"
                                            />
                                        </div>

                                    </div>
                                    <br></br>

                                    <div className='col'>
                                        <div class="form-group">
                                            <label for="degree">Degree</label>
                                            <select
                                                class="form-select"
                                                id="degree"
                                                value={experience.degree}
                                                onChange={(e) => handleExperienceChange(experience.id, 'degree', e.target.value)}
                                            >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label for="university">University</label>
                                            <select
                                                class="form-select"
                                                id="university"
                                                value={experience.university}
                                                onChange={(e) => handleExperienceChange(experience.id, 'university', e.target.value)}
                                            >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                            </select>
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

                        <button onClick={handleAddTime} className='qualification-btn'>Add Time</button>

                        <div style={{ width: "100%" }}>

                            {time.map((time) => (
                                <div key={time.id}>
                                    <div className='col'>

                                        <div class="form-group">
                                            <label for="degree">Day</label>
                                            <select
                                                class="form-select"
                                                id="degree"
                                                value={time.degree}
                                                onChange={(e) => handleTimeChange(time.id, 'degree', e.target.value)}
                                            >
                                                <option>Saturday</option>
                                                <option>Sunday</option>
                                                <option>Monday</option>
                                                <option>Tuesday</option>
                                                <option>Wednessday</option>
                                                <option>Thursday</option>
                                                <option>Friday</option>
                                            </select>
                                        </div>

                                        <div className='form-group'>
                                            <label>Starting Time</label>
                                            <select
                                                class="form-select"
                                                id="degree"
                                                value={time.degree}
                                                onChange={(e) => handleTimeChange(time.id, 'degree', e.target.value)}
                                            >
                                                <option>1.00 am</option>
                                                <option>2.00 am</option>
                                                <option>3.00 am</option>
                                                <option>4.00 am</option>
                                                <option>5.00 am</option>
                                                <option>6.00 am</option>
                                                <option>7.00 am</option>
                                            </select>
                                        </div>

                                        <div className='form-group'>
                                            <label>Ending Time</label>
                                            <select
                                                class="form-select"
                                                id="degree"
                                                value={time.degree}
                                                onChange={(e) => handleTimeChange(time.id, 'degree', e.target.value)}
                                            >
                                                <option>Saturday</option>
                                                <option>Sunday</option>
                                                <option>Monday</option>
                                                <option>Tuesday</option>
                                                <option>Wednessday</option>
                                                <option>Thursday</option>
                                                <option>Friday</option>
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
                            <label>About</label>
                            <textarea className='form-control' style={{height: '100px'}} />
                        </div>

                        <div className='col'>
                            <div className='upload-img'>
                                <img src={user.avatar}  style={{width: "100px", height: "100px", borderRadius: "50px"}}/>
                            </div>

                            <div className='form-group'>
                                <input type='file' className='form-control' />
                            </div>

                        </div>

                        <button type='submit' className='submit-btn'>Submit</button>








                    </form>
                </div>
            )}


        </div>
    )
}

export default DoctorProfile