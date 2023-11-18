import React from 'react'
import './Header.css'
import {PiBellLight} from 'react-icons/pi'
import {BsBrightnessHigh} from 'react-icons/bs'
function Header() {
    return (

        <div className='header '>
            <div className='admin-profile'>
                <img src='/images/admin.jpg' alt='admin-profile' />
                <div>
                    <h1>ملیکا موسی کاظمی</h1>
                    <h3>react developer</h3>
                </div>
            </div>
            <div className='left-header'>
                <div className='search_box'>
                    <input type='text' placeholder='جست و جو کنید'></input>
                    <button>جست و جو</button>
                </div>
                <button className='header-icons'>
                    <PiBellLight/>
                </button>
                <button className='header-icons'>
                    <BsBrightnessHigh/>
                </button>

            </div>
        </div>
    )
}

export default Header