import React from 'react'
import DoctorList from '../components/DoctorList'

export default function FindDoctor() {
    return (

        <div>

            <div className='fdoctor'>
                <div className='fdoctor-search'>
                    <h2>Find a Doctor</h2>
                    <br></br>
                    <div className='searchbar'>
                        <input type='text' className='' placeholder='Search Doctor' />
                        <button className='searchBtn'>Search</button>

                    </div>
                </div>
               
            </div>
            <div className='fdoctor-list'>
              <DoctorList />
            </div>
            <div style={{marginBottom: "100px"}}></div>

        </div>

    )
}
