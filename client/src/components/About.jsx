import React from 'react'
import about from "../images/samanta-patel-dr-upscaled.jpg"
import { Link } from 'react-router-dom'

export default function About() {
    return (
        <div className='about'>

            <div className='aboutProfile'>
                <img src={about} width={500} height={500}/>
                <div className='sticker'>

                    <div className='circle'>
                        <div className='red'></div>
                        <div className='yellow'></div>
                        <div className='green'></div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>

                        <div className='profile-img'>
                            <img src={about} style={{ width: "50px", height: "50px", borderRadius: "50px" }} />
                        </div>

                        <div className='profile-bio'>
                            <h3>Dr. Samantha Patel </h3>
                            <p>Cheif Doctor of Nuerology</p>
                        </div>

                    </div>



                </div>
            </div>

            <div className='aboutDesc'>
                <h3 className='title'>Proud To Be <span className='text-primary'>One of The Nations</span> Best</h3>
                <p className='description'>
                "Dr. Samantha Patel, a distinguished neurology specialist, takes immense pride in being 
                recognized as one of the nation's best doctors. With a passion for advancing 
                neurological care, she has dedicated her career to providing exceptional expertise
                 and compassionate service to her patients. Driven by a commitment to excellence, 
                 she remains at the forefront of advancements in neurology, ensuring the highest
                  standard of care for those seeking neurological health solutions. Her dedication, 
                  coupled with a relentless pursuit of knowledge, solidifies her position as a trusted
                   and respected figure in the medical community, bringing hope and healing to those in 
                   need"
                   
                </p>
                <div className='learnMore'>
                    <Link to={'https://doctor.shuvobhowmik.xyz/Dr.%20Samantha%20Patel/65c7b7eac0eeb49f5e22a763'}>
                    <button className='loginBtn'>Book Now</button>
                    </Link>
                    
                </div>
            </div>

        </div>
    )
}
