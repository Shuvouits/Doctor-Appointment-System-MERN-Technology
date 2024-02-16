import React from 'react'
import Doctor from "../images/doctor-img02.png"
import { FaStar } from "react-icons/fa";

function DoctorProfile() {
    return (
        <div className='doctor-profile'>
            <div className='left-part'>
                <div className='list'>
                    <ul>
                        <li className='active'>Overview</li>
                        <li>Appointments</li>
                        <li>Profile</li>
                    </ul>

                </div>
                <div className='account-btn'>
                    <button className='logout'>LogOut</button>
                    <button className='delete'>Delete Account</button>

                </div>
            </div>
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

                <div style={{display: "flex", gap: "15px"}}>

                <div className='education'>
                    <h2>Education</h2>

                    <div className='edetails'>
                        <div className='info'>
                            <span>University of California</span>
                            <span>Phd in Suregon <span style={{color: 'blue', fontWeight: 'bold'}}>(New Applo hospital in newWork)</span></span>
                        </div>

                        <div className='info'>
                            <span>University of California</span>
                            <span>Phd in Suregon <span style={{color: 'blue', fontWeight: 'bold'}}>(New Applo hospital in newWork)</span></span>
                        </div>

                        <div className='info'>
                            <span>University of California</span>
                            <span>Phd in Suregon <span style={{color: 'blue', fontWeight: 'bold'}}>(New Applo hospital in newWork)</span></span>
                        </div>

                       


                    </div>



                </div>

                <div className='education'>
                    <h2>Experience</h2>

                    <div className='edetails'>
                        <div className='info'>
                            <span>University of California</span>
                            <span>Phd in Suregon <span style={{color: 'blue', fontWeight: 'bold'}}>(New Applo hospital in newWork)</span></span>
                        </div>

                        <div className='info'>
                            <span>University of California</span>
                            <span>Phd in Suregon <span style={{color: 'blue', fontWeight: 'bold'}}>(New Applo hospital in newWork)</span></span>
                        </div>

                        <div className='info'>
                            <span>University of California</span>
                            <span>Phd in Suregon <span style={{color: 'blue', fontWeight: 'bold'}}>(New Applo hospital in newWork)</span></span>
                        </div>

                       


                    </div>



                </div>

                </div>

                


            </div>

        </div>
    )
}

export default DoctorProfile