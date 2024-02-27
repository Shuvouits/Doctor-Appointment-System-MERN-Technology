import { Link } from "react-router-dom";
import Doctor1 from "../images/doctor-img01.png"
import Doctor2 from "../images/doctor-img02.png"
import Doctor3 from "../images/doctor-img03.png"
import { FaStar } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { BeatLoader } from 'react-spinners';

export default function DoctorList({ searchQuery }) {

    const [doctor, setDoctor] = useState({})
    const [loading, setLoading] = useState(true)

    console.log(searchQuery)

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
                setLoading(false)
                setDoctor(data);

            }
        } catch (error) {

        }




    };



    useEffect(() => {

        allDoctor();

    }, []);



    return (

       <div className="doctorList-container">

{
                loading && (

                    <div className='spinners'>
                        <BeatLoader color="red" />
                    </div>

                )
            }


<div className='doctorList' style={{ opacity: loading ? '0.3' : '1' }}>
            <div className='title'>
                <h3>Our <span className="text-primary">Doctor</span> List</h3>
                <p>World-class care for everyone. Our health System offers<br></br>unmatched, expert health care</p>
            </div>

            <div className='cardGrid'>

                {doctor && doctor.length > 0 ? (
                    <>
                        {doctor
                            .filter(item => {
                                // Customize the condition based on your search requirements
                                const searchTerms = searchQuery.toLowerCase().split(' ');
                                return searchTerms.every(term =>
                                    (item.fullName && item.fullName.toLowerCase().includes(term)) ||
                                    (item.email && item.email.toLowerCase().includes(term)) ||
                                    (item.speciality && item.speciality.toLowerCase().includes(term))
                                );
                            })
                            .map((item, index) => (
                                <Link key={item._id} className="customLink" to={`/${item.fullName}/${item._id}`}>
                                    <div className='card'>
                                        <div className='cardImg'>
                                            {item.avatar ? (
                                                <img src={item.avatar} width={'400px'} height={'400px'} style={{ borderRadius: '25px' }} />
                                            ) : (
                                                <img src={Doctor1} width={'400px'} />
                                            )}
                                        </div>
                                        <div className='dname'>{item.fullName} <span style={{ color: 'gray', fontWeight: '450', marginLeft: '20px' }}>{item.email}</span></div>
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
                            ))
                        }

                        {doctor.length > 0 && !doctor.some(item =>
                            (item.fullName && item.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            (item.speciality && item.speciality.toLowerCase().includes(searchQuery.toLowerCase()))
                        ) && (
                                <span style={{ color: 'red', fontSize: '20px', textAlign: 'center', fontWeight: 'bold', width: '100vw' }}>Not Get Any Searching Doctor</span>
                            )}



                    </>
                ) : (
                    <div></div>
                )}







            </div>





        </div>



       </div>

      
    )
}
