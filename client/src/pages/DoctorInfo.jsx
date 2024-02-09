import React, { useState } from 'react';
import doctor from "../images/doctor-img01.png";
import { FaStar } from "react-icons/fa";


function DoctorInfo() {
  const [activeTab, setActiveTab] = useState('about');

  const [feedback, setFeedback] = useState(false)

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='doctor-info'>
      <div className='left-side'>
        <div className='doctor-card'>
          <div className='dimage'>
            <img src={doctor} alt="Doctor" />
          </div>
          <div className='d-details'>
            <span className='designation'>Surgeon</span>
            <span className='dname'>Rokibul Islam</span>
            <div className='rating'>
              <span className='icon'>
                <FaStar />
              </span>
              <span className='score'>4.8 (272)</span>
            </div>
            <br />
            <span className='description'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using</span>
          </div>
        </div>

        <div className="nav-tab">
          <h2
            className={`tab ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => handleTabClick('about')}
          >
            About
          </h2>

          <h2
            className={`tab ${activeTab === 'feedback' ? 'active' : ''}`}
            onClick={() => handleTabClick('feedback')}
          >
            Feedback
          </h2>
        </div>

        {activeTab === 'about' && (
          <div className="tab-content">
            {/* Content for the 'About' tab */}
            <h3>About of <span>Mohibur Rahaman</span></h3>
            <p style={{ lineHeight: "30px", fontSize: "17px", margin: "0px" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              It has survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>

            <div className='qualification'>
              <h3>Academic</h3>

              <div className='row'>

                <div className='education'>
                  <span className='date'>13 Septembar 2014</span>
                  <span className='degree'>P.H.D. In Surgon</span>
                  <span className='hospital'>Dhaka Medical College</span>

                </div>

                <div className='education'>
                  <span className='date'>13 Septembar 2014</span>
                  <span className='degree'>P.H.D. In Surgon</span>
                  <span className='hospital'>Dhaka Medical College</span>

                </div>

              </div>



            </div>
            <br></br>

            <div className='qualification'>
              <h3>Experience</h3>

              <div className='row'>

                <div className='education'>
                  <span className='date'>13 Septembar 2014</span>
                  <span className='degree'>P.H.D. In Surgon</span>
                  <span className='hospital'>Dhaka Medical College</span>

                </div>

                <div className='education'>
                  <span className='date'>13 Septembar 2014</span>
                  <span className='degree'>P.H.D. In Surgon</span>
                  <span className='hospital'>Dhaka Medical College</span>

                </div>

              </div>



            </div>

          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="tab-content">
            {/* Content for the 'Feedback' tab */}
            <div className='feedback-part'>
              <h3>All Reviews <spna>(272)</spna></h3>
              <div className='row'>

                <div className='left-part'>
                  <div className='image'>
                    <img src={doctor} />
                  </div>

                  <div className='info'>

                    <div className='dname'>
                      <span>Shuvo Bhowmik</span>
                    </div>
                    <div className='ddate'>
                      <span>Feb 2 2024</span>
                    </div>
                    <div className='d-feed'>
                      <span style={{ fontWeight: "bold" }}>Good service highly recommended</span>
                    </div>

                  </div>

                </div>

                <div className='right-part'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />

                </div>

              </div>


            </div>

            <br></br>
            <br></br>

            <button className='feedback-btn' onClick={() => setFeedback(!feedback)}>Give Feedback</button>
            <br></br>

            {feedback && (

              <div className='user-feedback'>
                <h3>How would rate your overall experience??</h3>
                <textarea placeholder='Write your message' style={{ fontSize: "15px", border: "1px solid gainsboro", padding: "15px", height: "20vh", width: "100%" }}></textarea>

              </div>

            )}



          </div>
        )}

      </div>



      <div className='right-side'>


        <div className='ticket-card'>


          <div className='first'>
            <span className='ticket'>Ticket Price</span>
            <span className='tprice'>500 TK.</span>
          </div>

          <div className='second'>
            <span className='tslot'>Available Time Slot</span>
            <div className='appoint'>
              <div className='day'>
                <span>Saturday</span>
                <span>Sunday</span>
                <span>Monday</span>
              </div>
              <div className='time'>
                <span>4.00PM - 9.30PM</span>
                <span>4.00PM - 9.30PM</span>
                <span>4.00PM - 9.30PM</span>
              </div>
            </div>
            <br></br>
            <button className='feedback-btn'>Book Appoint</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DoctorInfo;
