import { Link } from "react-router-dom";
import Doctor1 from "../images/doctor-img01.png"
import Doctor2 from "../images/doctor-img02.png"
import Doctor3 from "../images/doctor-img03.png"
import { FaStar } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function DoctorList() {
    return (

        <div className='doctorList'>
            <div className='title'>
                <h3>Our Doctor List</h3>
                <p>World-class care for everyone. Our health System offers<br></br>unmatched, expert health care</p>
            </div>

            <div className='cardGrid'>

                <div className='card'>
                    <div className='cardImg'>
                        <img src={Doctor1} />
                    </div>
                    <Link className="customLink" to={'/dr-altap-mahamud/100200'}>

                    <div className='dname'>Dr. Altap Mahamud</div> 

                    </Link>
                   
                    <div className='mid-info'>
                        <span className='designation'>Surgeon</span>
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


                <div className='card'>
                    <div className='cardImg'>
                        <img src={Doctor2} />
                    </div>
                    <div className='dname'>Dr. Altap Mahamud</div>
                    <div className='mid-info'>
                        <span className='designation'>Surgeon</span>
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

                <div className='card'>
                    <div className='cardImg'>
                        <img src={Doctor3} />
                    </div>
                    <div className='dname'>Dr. Altap Mahamud</div>
                    <div className='mid-info'>
                        <span className='designation'>Surgeon</span>
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



            </div>





        </div>
    )
}
