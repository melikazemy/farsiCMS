import React, { useEffect } from 'react'
import './EditModal.css'
export default function EditModal({ children, onSubmit, onClose }) {

    useEffect(() => {
        const close = (event) => {
            if (event.keyCode === 27) {
                onClose()
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    })
    return (
        <div className='modal-parent active'>
            <form className='editModal-form'>
                <h1>اطلاعات جدید راوارد نمایید</h1>
                {children}
                <button className='editForm-submit' onClick={onSubmit}> ثبت اطلاعات جدید</button>
            </form>

        </div>

    )
}
