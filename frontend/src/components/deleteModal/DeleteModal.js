import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './DeleteModal.css'

export default function DeleteModal({ submitted, cancled,topic }) {
    useEffect(() => {
        const checkKey = (event) => {
            if (event.keyCode === 27) {
                cancled()
            }
        }
        window.addEventListener('keydown', checkKey)
        return () => window.removeEventListener('keydown', checkKey)
    })
    return ReactDOM.createPortal(
        <>
            <div className='modal-parent active'>
                <div className='delete-modal'>
                    <h1>{topic}</h1>
                    <div className='delete-modal-btns'>
                        <button
                            className='delete-btn delete-modal-accept-btn'
                            onClick={() => submitted()}>
                            بله
                        </button>
                        <button
                            className='delete-btn delete-modal-reject-btn'
                            onClick={() => cancled()}>
                            خیر
                        </button>
                    </div>
                </div>
            </div>

        </>
        , document.getElementById('modals-parent')
    )
}

