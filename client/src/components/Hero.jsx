
import heroImg1 from "../images/dr-christopher-evans (3).jpg"
import heroImg2 from "../images/hero-img02.png"
import heroImg3 from "../images/hero-img03.png"

export default function Hero() {
  return (
    <div className='hero'>
        <div className='leftSection'>
          <div className='headline'>
            <h2>We help Patients <span className="text-primary">live a healthy</span>, longer life</h2>
          </div>
          <div className='description'>
            <p>
            Empowering individuals on their journey to wellness, our mission is to assist patients in achieving and maintaining a healthy and fulfilling life. With a commitment to longevity and well-being, we provide comprehensive support, personalized care, and valuable resources 
            to help patients lead healthier lives and embrace the joy of living to the fullest
            </p>

          </div>
          <div className='request-btn'>
            <button className='loginBtn'>Request an Appointment</button>
          </div>
          <div className='score'>
            <div >
              <p className='scoreCount'>30+</p>
              <p className='scoreTag'> Years of Experience</p>

            </div>

            <div>
              <p className='scoreCount'>10+</p>
              <p className='scoreTag'>Clinic Location</p>

            </div>

            <div>
              <p className='scoreCount'>200+</p>
              <p className='scoreTag'>Patient Satisfaction</p>

            </div>

          </div>

        </div>

        <div className='rightSection'>

          <div className='rpimg'>
            <img src={heroImg1} style={{borderRadius: '20px'}} />
          </div>
         

        </div>

      </div>
  )
}
