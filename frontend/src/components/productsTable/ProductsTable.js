import React, { useState } from 'react'
import './ProductsTable.css'
import DeleteModal from '../deleteModal/DeleteModal'
import DetailsModal from '../detailsModal/DetailsModal'
import EditModal from '../editModal/EditModal'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import ErrorBox from '../errorBox/ErrorBox'
export default function ProductsTable({ allProducts, getAllProducts }) {
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [productId, setProductId] = useState(null)
    const [mainProductDetails, setMainProductDetails] = useState({})
    const [newProductTitle, setNewProductTitle] = useState('')
    const [newProductPrice, setNewProductPrice] = useState('')
    const [newProductCount, setNewProductCount] = useState('')
    const [newProductImg, setNewProductImg] = useState('')
    const [newProductPopularity, setNewProductPopularity] = useState('')
    const [newProductSale, setNewProductSale] = useState('')
    const [newProductColors, setNewProductColors] = useState('')



    const modalCancledAction = () => {
        setIsDeleteModalVisible(false)
    }

    const modalSubmittedAction = () => {
        fetch(`http://localhost:8000/api/products/${productId}`,
            { method: 'DELETE' }
        ).then(res => res.json())
            .then(result => {
                setIsDeleteModalVisible(false);
                getAllProducts()
            })
    }

    const detailsModalCloser = () => {
        setIsDetailModalVisible(false)
    }

    const updateProductsInfo = (event) => {
        event.preventDefault()
        const productNewDetails = {
            title: newProductTitle,
            price: newProductPrice,
            count: newProductCount,
            img: newProductImg,
            popularity: newProductPopularity,
            sale: newProductSale,
            colors: newProductColors
        }
        fetch(`http://localhost:8000/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productNewDetails)
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                getAllProducts()
                setIsDetailModalVisible(false)
            })
    }

    return (
        <>
            {allProducts.length ?
                (
                    <table className='products-table'>
                        <thead>
                            <tr className='products-table-fr-tr'>
                                <th>عکس</th>
                                <th>اسم</th>
                                <th>قیمت</th>
                                <th>موجودی</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allProducts.map((product) =>
                            (<tr key={product.id}
                                className='products-table-tr'>
                                <td><img src={product.img} alt='عکس محصول' /></td>
                                <td> {product.title} </td>
                                <td>{product.price}تومان</td>
                                <td>{product.count}</td>
                                <td>
                                    <button className='product-table-btns' onClick={() => {
                                        setIsDetailModalVisible(true)
                                        setMainProductDetails(product)
                                    }
                                    }>جزیات </button>
                                    <button className='product-table-btns' onClick={() => {
                                        setIsDeleteModalVisible(true)
                                        setProductId(product.id)

                                    }
                                    }> حذف</button>
                                    <button className='product-table-btns' onClick={() => {
                                        setIsEditModalVisible(true)
                                        setProductId(product.id)
                                        setNewProductTitle(product.title)
                                        setNewProductColors(product.colors)
                                        setNewProductPrice(product.price)
                                        setNewProductSale(product.sale)
                                        setNewProductImg(product.img)
                                        setNewProductPopularity(product.popularity)
                                        setNewProductCount(product.count)
                                    }}>ویرایش</button>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                ) :
                (<ErrorBox msg={'هیچ محصولی یافت نشد'} />)}





            {/* <tr className='products-table-tr'>
                <td><img src='/images/oil.jpeg' alt='oil' /></td>
                <td>روغن سرخ کردنی</td>
                <td>92000</td>
                <td>82</td>
                <td>
                    <button className='product-table-btns' onClick={() => setIsDetailModalVisible(true)}>جزیات </button>
                    <button className='product-table-btns' onClick={() => setIsDeleteModalVisible(true)}> حذف</button>
                    <button className='product-table-btns' onClick={() => setIsEditModalVisible(true)}>ویرایش</button>
                </td>
            </tr>

            <tr className='products-table-tr'>
                <td><img src='/images/oil.jpeg' alt='oil' /></td>
                <td>روغن سرخ کردنی</td>
                <td>92000</td>
                <td>82</td>
                <td>
                    <button className='product-table-btns' onClick={() => setIsDetailModalVisible(true)}>جزیات </button>
                    <button className='product-table-btns' onClick={() => setIsDeleteModalVisible(true)}> حذف</button>
                    <button className='product-table-btns' onClick={() => setIsEditModalVisible(true)}>ویرایش</button>
                </td>

            </tr> */}


            {isDeleteModalVisible && <DeleteModal
                submitted={modalSubmittedAction}
                cancled={modalCancledAction}
                topic="آیا از حذف اطمینان دارید" />
            }
            {
                isDetailModalVisible && <DetailsModal
                    closer={detailsModalCloser} >
                    ( <table className="cms-table">
                        <thead>
                            <tr>
                                <th>محبوبیت</th>
                                <th>فروش</th>
                                <th>رنگبندی</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{mainProductDetails.popularity}</td>
                                <td>{mainProductDetails.sale}</td>
                                <td>{mainProductDetails.colors}</td>
                            </tr>
                        </tbody>
                    </table>)
                </DetailsModal>
            }
            {
                isEditModalVisible && <EditModal
                    onClose={() => setIsEditModalVisible(false)}
                    onSubmit={updateProductsInfo} >
                    <div className='edit-pros-form-group'>
                        <span><AiOutlineDollarCircle /></span>
                        <input
                            type="text"
                            className='edit-products-input'
                            placeholder='اسم محصول را بنویسید'
                            value={newProductTitle}
                            onChange={(event) => setNewProductTitle(event.target.value)}
                        />
                    </div>
                    <div className='edit-pros-form-group'>
                        <span><AiOutlineDollarCircle /></span>
                        <input
                            onChange={(event) => setNewProductPrice(event.target.value)}
                            type="text"
                            placeholder='قیمت محصول را بنویسید'
                            value={newProductPrice}
                            className='edit-products-input' />
                    </div>
                    <div className='edit-pros-form-group'>
                        <span><AiOutlineDollarCircle /></span>
                        <input
                            onChange={(event) => setNewProductCount(event.target.value)}
                            type="text"
                            placeholder='موجودی محصول را بنویسید'
                            value={newProductCount}
                            className='edit-products-input' />
                    </div>
                    <div className='edit-pros-form-group'>
                        <span><AiOutlineDollarCircle /></span>
                        <input type="text"
                            onChange={(event) => setNewProductImg(event.target.value)}
                            value={newProductImg}
                            placeholder='آدرس عکس محصول را بنویسید'
                            className='edit-products-input' />
                    </div>
                    <div className='edit-pros-form-group'>
                        <span><AiOutlineDollarCircle /></span>
                        <input
                            type="text"
                            className='edit-products-input'
                            placeholder='محبوبیت محصول را بنویسید'
                            value={newProductPopularity}
                            onChange={(event) => setNewProductPopularity(event.target.value)}
                        />
                    </div>
                    <div className='edit-pros-form-group'>
                        <span><AiOutlineDollarCircle /></span>
                        <input
                            type="text"
                            className='edit-products-input'
                            placeholder='میزان فروش محصول را بنویسید'
                            value={newProductSale}
                            onChange={(event) => setNewProductSale(event.target.value)}
                        />
                    </div>
                    <div className='edit-pros-form-group'>
                        <span><AiOutlineDollarCircle /></span>
                        <input
                            type="text"
                            className='edit-products-input'
                            placeholder='تعداد رنگبندی محصول را بنویسید'
                            value={newProductColors}
                            onChange={(event) => setNewProductColors(event.target.value)}
                        />
                    </div>
                </EditModal>
            }

        </>
    )
}
