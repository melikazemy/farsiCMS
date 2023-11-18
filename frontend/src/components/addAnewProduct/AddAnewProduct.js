import React, { useState } from 'react'
import './AddAnewProduct.css'
export default function AddAnewProduct({ getAllProducts }) {
    const [aNewProductName, setaNewProductName] = useState('')
    const [aNewProductPrice, setaNewProductPrice] = useState('')
    const [aNewProductCount, setaNewProductCount] = useState('')
    const [aNewProductImg, setaNewProductImg] = useState('')
    const [aNewProductPopularity, setaNewProductPopularity] = useState('')
    const [aNewProductSale, setaNewProductSale] = useState('')
    const [aNewProductColors, setaNewProductColors] = useState('')
    const newGood = {
        title: aNewProductName,
        price: aNewProductPrice,
        count: aNewProductPrice,
        img: aNewProductImg,
        popularity: aNewProductPopularity,
        sale: aNewProductSale,
        colors: aNewProductColors,
    }
    const clearInputs = () => {
        setaNewProductName('')
        setaNewProductPrice('')
        setaNewProductCount('')
        setaNewProductImg('')
        setaNewProductPopularity('')
        setaNewProductSale('')
        setaNewProductColors('')
    }


    const addAnewProduct = (event) => {
        event.preventDefault()
        fetch('http://localhost:8000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGood)

        }).then(res => res.json())
            .then(result => {
                console.log(result)
                getAllProducts()
                clearInputs()
            })
    }


    return (
        <div className='products-main'>
            <h1 className='products-title'>افزودن محصول جدید</h1>

            <form action="#" className='add-products-form'>
                <div className='add-products-form-wrap'>
                    <div className='add-products-form-group'>
                        <input
                            type="text"
                            placeholder='اسم محصول را بنویسید'
                            className='add-products-input'
                            value={aNewProductName}
                            onChange={(event) => setaNewProductName(event.target.value)}
                        />
                    </div>
                    <div className='add-products-form-group'>
                        <input
                            type="text"
                            placeholder='قیمت محصول را بنویسید'
                            className='add-products-input'
                            value={aNewProductPrice}
                            onChange={event => setaNewProductPrice(event.target.value)} />
                    </div>
                    <div className='add-products-form-group'>
                        <input
                            type="text"
                            placeholder='موجودی محصول را بنویسید'
                            className='add-products-input'
                            value={aNewProductCount}
                            onChange={event => setaNewProductCount(event.target.value)} />
                    </div>
                    <div className='add-products-form-group'>
                        <input
                            type="text"
                            placeholder='آدرس عکس محصول را بنویسید'
                            className='add-products-input'
                            value={aNewProductImg}
                            onChange={event => setaNewProductImg(event.target.value)} />
                    </div>
                    <div className='add-products-form-group'>
                        <input
                            type="text"
                            placeholder='میزان محبوبیت محصول را بنویسید'
                            className='add-products-input'
                            value={aNewProductPopularity}
                            onChange={event => setaNewProductPopularity(event.target.value)} />
                    </div>
                    <div className='add-products-form-group'>
                        <input
                            type="text"
                            placeholder='میزان فروش محصول را بنویسید'
                            className='add-products-input'
                            value={aNewProductSale}
                            onChange={event => setaNewProductSale(event.target.value)} />
                    </div>
                    <div className='add-products-form-group'>
                        <input type="text"
                            placeholder='تعداد رنگ بندی محصول را بنویسید'
                            className='add-products-input'
                            value={aNewProductColors}
                            onChange={event => setaNewProductColors(event.target.value)}
                        />
                    </div>
                </div>
                <button className='add-products-submit' onClick={addAnewProduct}>ثبت محصول</button>
            </form>

        </div>
    )
}
