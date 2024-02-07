
import heroImg1 from "../images/hero-img01.png"
import heroImg2 from "../images/hero-img02.png"
import heroImg3 from "../images/hero-img03.png"

export default function Hero() {
  return (
    <div className='hero'>
        <div className='leftSection'>
          <div className='headline'>
            <h2>We help Patients live a healthy, longer life</h2>
          </div>
          <div className='description'>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
              as opposed to using 'Content here, content here',</p>

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
              <p className='scoreCount'>30+</p>
              <p className='scoreTag'> Years of Experience</p>

            </div>

            <div>
              <p className='scoreCount'>30+</p>
              <p className='scoreTag'> Years of Experience</p>

            </div>

          </div>

        </div>

        <div className='rightSection'>

          <div className='rpimg'>
            <img src={heroImg1} />
          </div>
          <div className='lpimg' >
            <img src={heroImg2} />
            <img src={heroImg3} />

          </div>

        </div>

      </div>
  )
}
