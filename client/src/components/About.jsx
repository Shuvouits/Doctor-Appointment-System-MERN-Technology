import React from 'react'
import about from "../images/about.png"

export default function About() {
    return (
        <div className='about'>

            <div className='aboutProfile'>
                <img src={about} />
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
                            <h3>Dr. Mitchell Starc</h3>
                            <p>Cheif Doctor of Nursing</p>
                        </div>

                    </div>



                </div>
            </div>

            <div className='aboutDesc'>
                <h3 className='title'>Proud to be one of the nations best</h3>
                <p className='description'>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                    as opposed to using 'Content here, content here', making it look like readable English.
                    <br></br>
                    <br></br>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                    as opposed to using 'Content here, content here', making it look like readable English.
                </p>
                <div className='learnMore'>
                    <button className='loginBtn'>Learn More</button>
                </div>
            </div>

        </div>
    )
}
