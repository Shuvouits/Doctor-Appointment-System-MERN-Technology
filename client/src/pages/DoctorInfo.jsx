import React, { useEffect, useState } from 'react';
import avatar from "../images/147142.png";
import { FaStar } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import deleteIcon from "../images/1214428.png"



function DoctorInfo() {
  const { user } = useSelector((state) => ({ ...state }))
  const { id, doctorName } = useParams();

  const [specificDoctor, setSpecificDoctor] = useState({});

  const [activeTab, setActiveTab] = useState('about');

  const [feedback, setFeedback] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  const [formData, setFormData] = useState({
    message: '',
    ratingNumber: 0,
  });


  const [userRating, setUserRating] = useState(0);
  const handleStarClick = (rating) => {

    setFormData({
      ...formData,
      ratingNumber: rating,
    });


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


  const bookingHandler = async () => {

    try {
      const res = await fetch(`http://localhost:4000/stripe-payment/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      });


      const data = await res.json();
      console.log(data);

      if (data.session.url) {
        window.location.href = data.session.url
      }

    } catch (error) {
      return (error)

    }



  }





  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }






  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    if (!user) {



      Swal.fire({
        toast: true,
        position: 'top-right',
        animation: true,
        text: 'You are not authorized, please login',
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

    }


    try {

      const res = await fetch(`http://localhost:4000/user-rating/${user.id}/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 200) {

        setFormData({
          ...formData,
          message: '',
          ratingNumber: 0
        });

        Swal.fire({
          toast: true,
          position: 'top-right',
          animation: true,
          text: 'Thanks for your review',
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

        setFeedback(false)
        setUserRating(0)

      }

      allUserReview();



    } catch (error) {
      return (error)
      setLoading(false)
    }

  }

  const [review, setReview] = useState({});

  const allUserReview = async () => {

    try {
      const res = await fetch(`http://localhost:4000/user-review/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });


      const data = await res.json();
      setReview(data);

    } catch (error) {
      return (error)

    }

  };

  useEffect(() => {
    allUserReview();
  }, []);

  
  const deleteRating = async() =>{
   
      try{

        const result = await Swal.fire({
          title: 'Delete your review?',
          text: 'You won\'t be able to revert this!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
          const res = await fetch(`http://localhost:4000/delete-review/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
          });
    
          const data = await res.json();
    
          if (res.status === 200) {
            allUserReview();
          }
        }


      }catch(error){
        return (error)
      }
  }



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
              


              {review && review.length > 0 ? (
                <>
                <h3>All Reviews <spna>({review.length})</spna></h3>


                  <div>
                    {review.map((item, index) => (

                      <div className='row'>
                        <div className='left-part'>

                          <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '20px', marginBottom: '10px' }}>
                            <div className='image'>
                              <img src={item.avatar} style={{ borderRadius: '70px', width: '70px', height: '70px' }} />
                            </div>
                            <div className='info'>
                              <div className='dname' style={{fontWeight: 'bold'}}>
                                <span>{item.fullName}</span>
                              </div>
                              <div className='ddate'>
                                <span>{format(item.time, 'MMMM-yyyy-dd')}</span>
                              </div>
                              <div className='d-feed'>
                                <span  style={{fontSize: '16px'}}>{item.message}</span>
                              </div>

                            </div>





                          </div>
                        </div>

                        <div className='right-part'>
                          {item.ratingNumber === 1 && (
                            <FaStar />
                          )}

                          {item.ratingNumber === 2 && (
                            <>
                              <FaStar />
                              <FaStar />
                            </>

                          )}

                          {item.ratingNumber === 3 && (
                            <>
                              <FaStar />
                              <FaStar />

                              <FaStar />
                            </>

                          )}

                          {item.ratingNumber === 4 && (
                            <>
                              <FaStar />
                              <FaStar /> <FaStar /> <FaStar />
                            </>

                          )}

                          {item.ratingNumber === 5 && (
                            <>
                              <FaStar />
                              <FaStar /> <FaStar /> <FaStar /> <FaStar />
                            </>

                          )}





                        </div>

                        {user && (

                          <div className='delete-part'>
                            <img src={deleteIcon} width={20} height={20} onClick={deleteRating} />
                          </div>

                        )}



                      </div>






                    ))}
                  </div>



                </>



              ) : (
                <div>No Review Found</div>
              )}







            </div>

            <br></br>
            <br></br>

            <button className='feedback-btn' onClick={() => setFeedback(!feedback)}>Give Feedback</button>
            <br></br>







            {feedback && (

              <form onSubmit={handleSubmit}>

                <div className='user-feedback'>
                  <h3>How would rate your overall experience??</h3>

                  <div className='user-rating-input'>

                    <span>Give your Rating </span>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          onClick={() => handleStarClick(star)}

                          id='ratingNumber'
                          onChange={handleChange}

                          color={star <= userRating ? "#ffcc00" : "gainsboro"}
                          style={{ cursor: "pointer", fontSize: "24px" }}
                        />
                      ))}
                    </div>
                  </div>
                  <br></br>

                  <textarea id='message' onChange={handleChange} placeholder='Write your message' style={{ fontSize: "15px", border: "1px solid gainsboro", padding: "15px", height: "20vh", width: "100%" }}>

                  </textarea>

                </div>
                <button type='submit' style={{ border: 'none', width: '100%', height: '45px', cursor: 'pointer', fontSize: '15px', background: 'red', marginTop: '20px', color: 'white', fontWeight: 'bold', borderRadius: '20px' }}>Submit</button>

              </form>



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
                        <span style={{ textTransform: "uppercase" }}>{item.day}</span>
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
                        <span style={{ textTransform: "uppercase" }}>{item.startTime} - {item.endTime}</span>
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




            <button className='feedback-btn' onClick={bookingHandler}>Book Appoint</button>



          </div>

        </div>
      </div>



    </div>
  );
}

export default DoctorInfo;
