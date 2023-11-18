import React from 'react'
import './Sidebar.css'
import { BiHomeHeart } from 'react-icons/bi'
import { TbShoppingCartHeart } from 'react-icons/tb'
import { FaRegComments } from 'react-icons/fa'
import { LiaUsersSolid } from 'react-icons/lia'
import { TbShoppingCartCheck } from 'react-icons/tb'
import { GiTakeMyMoney } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className='sidebar'>
            <h1 className='sidebar-title'>به داشبورد خود خوش آمدید</h1>
            <ul className='sidebar-links'>
                <NavLink to='/' >
                    صفحه اصلی
                    <BiHomeHeart className='icons' />
                </NavLink>
                <NavLink  to='/products'>
                    محصولات
                    <TbShoppingCartHeart className='icons' />
                </NavLink>
                <NavLink to='/comments'>
                    ایده ها
                    <FaRegComments className='icons' />
                </NavLink>
                <NavLink to='/users'>
                    کاربران
                    <LiaUsersSolid className='icons' />
                </NavLink>
                <NavLink to='/orders'>
                    سفارشات
                    <TbShoppingCartCheck className='icons' />
                </NavLink>
                <NavLink to='/discounts'>
                    تخفیف ها
                    <GiTakeMyMoney />
                </NavLink>


            </ul>
        </div>
    )
}

