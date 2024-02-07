import Icon1 from "../images/icon01.png"
import Icon2 from "../images/icon02.png"
import Icon3 from "../images/icon03.png"
import { BsBoxArrowRight } from "react-icons/bs";

export default function Services() {
    return (
        <div className='services'>

            <div className='serviceTitle'>
                <h2 style={{ textAlign: "center" }}>Providing the best medical services</h2>
                <p style={{ textAlign: "center" }}>World class care for everyone. Our health System offers<br></br>unmatched, expert health care</p>
            </div>

            <div className='serviceSection'>

                <div className='serviceFeature'>
                    <div className='image'>
                        <img src={Icon1} />
                    </div>
                    <div className='description'>
                        <h3>Find a Doctor</h3>
                        <p>World class care for everyone. Our health System offers unmatched, expert health care</p>
                    </div>
                    <div>
                        <BsBoxArrowRight className='icon' />
                    </div>
                </div>

                <div className='serviceFeature'>
                    <div className='image'>
                        <img src={Icon2} />
                    </div>
                    <div className='description'>
                        <h3>Find a Location</h3>
                        <p>World class care for everyone. Our health System offers unmatched, expert health care</p>
                    </div>
                    <div>
                        <BsBoxArrowRight className='icon' />
                    </div>
                </div>

                <div className='serviceFeature'>
                    <div className='image'>
                        <img src={Icon3} />
                    </div>
                    <div className='description'>
                        <h3>Book Appointment</h3>
                        <p>World class care for everyone. Our health System offers unmatched, expert health care</p>
                    </div>

                    <BsBoxArrowRight className='icon' />

                </div>

            </div>



        </div>
    )
}
