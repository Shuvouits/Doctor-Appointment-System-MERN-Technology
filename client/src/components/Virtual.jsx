import Feature from "../images/feature-img.png"
import Avatar from "../images/avatar-icon.png"
import { FiBell } from "react-icons/fi";
import virtual from "../images/july-jhonson-dr (1).jpg"

export default function Virtual() {
  return (
    <div className='virtualTreatMent'>

        <div className='leftPart'>
          <div className='title'>
            <h3>Get <span className="text-primary">Virtual treatment</span> anytime</h3>
          </div>
          <div className='list'>
            <ul>
              <li>Schedule the appointment directly</li>
              <li>Search for your physician here, and contact there office</li>
              <li>View our physicians who are accepting new patitents, use the online scheduling tool to select an appointment time</li>
            </ul>

          </div>
          <div className='learnMore'>
            <button className='loginBtn'>Learn More</button>
          </div>

        </div>

        <div className='rightPart'>
          <img className='feature' src={virtual} width={500} height={500}/>
          <div className='sticker'>
            <div className='round1'>
              <div><p>Tue 21 10.03AM</p></div>
              <div className='alert'>
                <FiBell />
              </div>

            </div>

            <div style={{display: "flex", alignItems: 'center', justifyContent:'space-between', gap:"10px"}}>
            <div className='round3'>
              <img src={virtual} width={40} height={40} style={{borderRadius: '100%'}} />
              <p>Jhon Doe</p>
            </div>
            <div className='round2'><span className='way'>Consultation</span></div>
           

            </div>
           
          </div>
        </div>

      </div>
  )
}
