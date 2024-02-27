import React, { useState } from 'react'
import DoctorList from '../components/DoctorList'

export default function FindDoctor() {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };


    return (

        <div>

            <div className='fdoctor'>
                <div className='fdoctor-search'>
                    
                    <br></br>
                    <div className='searchbar'>
                        <input type='text' className='' placeholder='Search Doctor'  onChange={handleSearchChange}/>
                        <button className='searchBtn'>Search</button>

                    </div>
                </div>
               
            </div>
            <div className='fdoctor-list'>
              <DoctorList  searchQuery={searchQuery} />
            </div>
            <div style={{marginBottom: "100px"}}></div>

        </div>

    )
}
