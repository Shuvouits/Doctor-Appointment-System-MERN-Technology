import React, { useEffect, useState } from 'react';
import doctor from "../images/doctor-img01.png";
import { FaStar } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';


function DoctorInfo() {
  const { id, doctorName } = useParams();
  console.log(id);

  const [specificDoctor, setSpecificDoctor] = useState({});

  const [activeTab, setActiveTab] = useState('about');

  const [feedback, setFeedback] = useState(false)

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [userRating, setUserRating] = useState(0);
  const handleStarClick = (rating) => {
    setUserRating(rating);
  };

  const findDoctor = async () => {

    try {
      const res = await fetch(`http://localhost:4000/specific-doctor/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });


      const data = await res.json();

      if (res.status === 200) {
        setSpecificDoctor(data);

      }

    } catch (error) {
      return (error)

    }

  };

  useEffect(() => {
    findDoctor();
  }, []);

  return (
    <div className='doctor-info'>
      <div className='left-side'>
        <div className='doctor-card'>
          <div className='dimage'>
            <img src={specificDoctor.avatar} style={{ borderRadius: '20px' }} width={'350px'} height={'350px'} alt="Doctor" />
          </div>
          <div className='d-details'>
            <span className='designation'>{specificDoctor.speciality}</span>
            <span className='dname'>{specificDoctor.fullName}</span>
            <div className='rating'>
              <span className='icon'>
                <FaStar />
              </span>
              <span className='score'>4.8 (272)</span>
            </div>
            <br />
            <span className='description'>
              {specificDoctor.bio}
            </span>
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
            <h3>About of <span>{specificDoctor.fullName}</span></h3>
            <p style={{ lineHeight: "30px", fontSize: "17px", margin: "0px" }}>
              {specificDoctor.about}
            </p>

            <div className='qualification'>
              <h3>Academic</h3>

              <div className='row'>

                {specificDoctor.qualifications && specificDoctor.qualifications.length > 0 ? (
                  <div>
                    {specificDoctor.qualifications.map((item, index) => (
                      <div className='education'>
                        <span className='date'>{format(item.startDate, 'MMMM-yyyy-dd')} - {format(item.endDate, 'MMMM-yyyy-dd')}</span>
                        <span className='degree'>{specificDoctor.speciality}</span>
                        <span className='hospital'>{item.qdegree}</span>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div>No education history yet</div>
                )}




              </div>



            </div>
            <br></br>

            <div className='qualification'>
              <h3>Experience</h3>

              <div className='row'>

                {specificDoctor.experience && specificDoctor.experience.length > 0 ? (
                  <div>
                    {specificDoctor.experience.map((item, index) => (
                      <div className='education'>
                        <span className='date'>{format(item.estartDate, 'MMMM-yyyy-dd')} - {format(item.eendDate, 'MMMM-yyyy-dd')}</span>
                        <span className='degree'>{specificDoctor.speciality}</span>
                        <span className='hospital'>{item.edegree}</span>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div>No education history yet</div>
                )}

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

                <div className='user-rating-input'>
                  <span>Give your Rating </span>
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        onClick={() => handleStarClick(star)}
                        color={star <= userRating ? "#ffcc00" : "gainsboro"}
                        style={{ cursor: "pointer", fontSize: "24px" }}
                      />
                    ))}
                  </div>
                </div>
                <br></br>

                <textarea placeholder='Write your message' style={{ fontSize: "15px", border: "1px solid gainsboro", padding: "15px", height: "20vh", width: "100%" }}></textarea>

              </div>

            )}



          </div>
        )}

        <div style={{ marginBottom: "100px" }}></div>

      </div>



      <div className='right-side'>


        <div className='ticket-card'>


          <div className='first'>
            <span className='ticket'>Ticket Price</span>
            <span className='tprice'>{specificDoctor.ticket} TK.</span>
          </div>

          <div className='second'>
            <span className='tslot'>Available Time Slot</span>
            <div className='appoint'>

           

              <div className='day'>

              {specificDoctor.time && specificDoctor.time.length > 0 ? (
                  <div>
                    {specificDoctor.time.map((item, index) => (
                      
                      <>
                        <span style={{textTransform:"uppercase"}}>{item.day}</span>
                        <br></br>
                        <br></br>
                      </>
                    ))}
                  </div>
                ) : (
                  <div>No setting time yet</div>
                )}
              </div>
              <div className='time'>
              {specificDoctor.time && specificDoctor.time.length > 0 ? (
                  <div>
                    {specificDoctor.time.map((item, index) => (
                      
                      <>
                        <span style={{textTransform:"uppercase"}}>{item.startTime} - {item.endTime}</span>
                        <br></br>
                        <br></br>
                      </>
                    ))}
                  </div>
                ) : (
                  <div>No setting time yet</div>
                )}
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
