import { Link } from "react-router-dom";
import Doctor1 from "../images/doctor-img01.png"
import Doctor2 from "../images/doctor-img02.png"
import Doctor3 from "../images/doctor-img03.png"
import { FaStar } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useEffect, useState } from "react";

export default function DoctorList() {

    const [doctor, setDoctor] = useState({})

    const allDoctor = async () => {

        try {
            const res = await fetch('http://localhost:4000/all-doctor', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();



            if (res.status === 200) {
                setDoctor(data);

            }
        } catch (error) {

        }

    };

    useEffect(() => {
        allDoctor();
    }, []);





    return (

        <div className='doctorList'>
            <div className='title'>
                <h3>Our Doctor List</h3>
                <p>World-class care for everyone. Our health System offers<br></br>unmatched, expert health care</p>
            </div>

            <div className='cardGrid'>

                {doctor && doctor.length > 0 ? (
                    <>
                        {doctor.map((item, index) => (

                            <Link className="customLink" to={`/${item.fullName}/${item._id}`}>

                                <div className='card'>
                                    <div className='cardImg'>
                                        {item.avatar ? (

                                            <img src={item.avatar} width={'400px'} style={{borderRadius: '15px'}} />

                                        ) : (

                                            <img src={Doctor1} width={'400px'} />

                                        )}



                                    </div>


                                    <div className='dname'>{item.fullName}</div>
                                    <span>{item.email}</span>



                                    <div className='mid-info'>
                                        <span className='designation'>{item.speciality}</span>
                                        <span className='score'>
                                            <span className='starIcon'><FaStar /></span>
                                            4.8 (272)
                                        </span>

                                    </div>
                                    <div className='last-info'>
                                        <div className='count'>+1500 patients</div>
                                        <div className='icon'><IoIosArrowRoundForward /></div>

                                    </div>
                                </div>

                            </Link>

                        ))}
                    </>

                ) : (
                    <div>No Doctor Found</div>
                )}





            </div>





        </div>
    )
}
