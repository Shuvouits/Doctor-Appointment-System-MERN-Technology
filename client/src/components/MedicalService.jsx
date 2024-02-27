import { FaRegArrowAltCircleRight } from "react-icons/fa";
import cancer from "../images/2885298.png"
import heart from "../images/954406.png"
import stomach from "../images/2864292.png"
import mental from "../images/3998035.png"
import nuerology from "../images/4006171.png"


export default function MedicalService() {
    return (
        <div className='medicalServices'>
            <div className='medicalInfo'>
                <h3>Our <span className="text-primary">Medical</span> Services</h3>
                <p>World Class care for everyone. Our health System offers<br></br>unmatched expert health care.</p>
            </div>

            <br></br>

            <div className='mdserviceLoop'>

                <div className="about-card">
                    <div className="card-body">
                        <div className="icon">
                            <img src={cancer} width={100} height={100} />
                        </div>
                        <div className="title">
                            <h3>Cancer Care</h3>
                        </div>

                    </div>

                </div>

                <div className="about-card">

                    <div className="card-body">
                        <div className="icon">
                            <img src={heart} width={100} height={100} />
                        </div>
                        <div className="title">
                            <h3>Heart & Vescular</h3>
                        </div>

                    </div>

                </div>

                <div className="about-card">

                    <div className="card-body">
                        <div className="icon">
                            <img src={stomach} width={100} height={100} />
                        </div>
                        <div className="title">
                            <h3>Labour & Delivery</h3>
                        </div>

                    </div>

                </div>

                <div className="about-card">

                    <div className="card-body">
                        <div className="icon">
                            <img src={mental} width={100} height={100} />
                        </div>
                        <div className="title">
                            <h3>Mental Health</h3>
                        </div>

                    </div>

                </div>

                <div className="about-card">
                <div className="card-body">
                        <div className="icon">
                            <img src={nuerology} width={100} height={100} />
                        </div>
                        <div className="title">
                            <h3>Nuerology</h3>
                        </div>

                    </div>
                </div>






            </div>


        </div>
    )
}
