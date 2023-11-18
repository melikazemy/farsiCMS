import React, { useEffect, useState } from 'react'
import ErrorBox from '../errorBox/ErrorBox'
import DeleteModal from '../deleteModal/DeleteModal'
import EditModal from '../editModal/EditModal'
import DetailsModal from '../detailsModal/DetailsModal'
export default function Users() {

  const [allUsers, setAllUSers] = useState([])
  const [userId, setUserId] = useState(null)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false)

  const [userNewFirsname, setUserNewFirsname] = useState('')
  const [userNewLastname, setUserNewLastname] = useState('')
  const [userNewUsername, setUserNewUsername] = useState('')
  const [userNewPassword, setUserNewPassword] = useState('')
  const [userNewPhone, setUserNewPhone] = useState('')
  const [userNewCity, setUserNewCity] = useState('')
  const [userNewEmail, setUserNewEmail] = useState('')
  const [userNewAddress, setUserNewAddress] = useState('')
  const [userNewBuy, setUserNewBuy] = useState('')
  const [userNewScore, setUserNewScore] = useState('')
  const [customerInfo, setCustomerInfo] = useState({})
  const getAllUsers = () => {
    fetch('http://localhost:8000/api/users', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(users => {
        setAllUSers(users)
      })
  }
  useEffect(() => {
    getAllUsers()
  }, [])




  const killUser = () => {
    fetch(`http://localhost:8000/api/users/${userId}`, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        setIsDeleteModalVisible(false)
        getAllUsers()
      })
  }

  const closeEditModal = () => {
    setIsEditModalVisible(false)
  }

  const closeDetailsModal = () => {
    setIsDetailsModalVisible(false)
  }
  const keepUser = () => {
    setIsDeleteModalVisible(false)
  }

  const changeUserinfos = (event) => {
    event.preventDefault()
    const newInfosBody = {
      firsname: userNewFirsname,
      lastname: userNewLastname,
      username: userNewLastname,
      password: userNewLastname,
      phone: userNewPhone,
      city: userNewPhone,
      email: userNewEmail,
      address: userNewAddress,
      score: userNewScore,
      buy: userNewBuy,
    }
    fetch(`http://localhost:8000/api/users/${userId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInfosBody)
      })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setIsEditModalVisible(false)
        getAllUsers()
      })
  }


  return (
    <>
      {allUsers.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th>نام و نام خانوادگی</th>
              <th>یوزرنیم</th>
              <th>رمز عبور</th>
              <th>شماره تماس</th>
              <th>ایمیل</th>
            </tr>
          </thead>

          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.firsname} {user.lastname}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsDeleteModalVisible(true)
                      setUserId(user.id)
                    }
                    }>حذف</button>


                  <button
                    onClick={() => {
                      setIsDetailsModalVisible(true)
                      setCustomerInfo(user)
                    }}>جزییات</button>


                  <button onClick={() => {
                    setIsEditModalVisible(true)
                    setUserId(user.id)
                    setUserNewFirsname(user.firsname)
                    setUserNewLastname(user.lastname)
                    setUserNewUsername(user.username)
                    setUserNewPassword(user.password)
                    setUserNewPhone(user.phone)
                    setUserNewCity(user.city)
                    setUserNewEmail(user.email)
                    setUserNewAddress(user.address)
                    setUserNewBuy(user.buy)
                    setUserNewScore(user.score)
                  }}>ویرایش</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) :
        (<ErrorBox msg='کاربری یافت نشد' />)}

      {
        isDeleteModalVisible && <DeleteModal
          topic='آیا از حذف کاربر اطمینان دارید؟'
          cancled={keepUser}
          submitted={killUser} />
      }

      {isEditModalVisible &&
        <EditModal onClose={closeEditModal} onSubmit={changeUserinfos}>
          <input style={{ marginBottom: 5 }} type='text' value={userNewFirsname} placeholder='اطلاعات جدید را وارد کنید' onChange={(event) => setUserNewFirsname(event.target.value)} />
          <input style={{ marginBottom: 5 }} type='text' value={userNewLastname} placeholder='اطلاعات جدید را وارد کنید' onChange={(event) => setUserNewLastname(event.target.value)} />
          <input style={{ marginBottom: 5 }} type='text' value={userNewUsername} placeholder='اطلاعات جدید را وارد کنید' onChange={(event) => setUserNewUsername(event.target.value)} />
          <input style={{ marginBottom: 5 }} type='text' value={userNewPassword} placeholder='اطلاعات جدید را وارد کنید' onChange={(event) => setUserNewPassword(event.target.value)} />
          <input style={{ marginBottom: 5 }} type='text' value={userNewPhone} placeholder='اطلاعات جدید را وارد کنید' onChange={(event) => setUserNewPhone(event.target.value)} />
          <input style={{ marginBottom: 5 }} type='text' value={userNewCity} placeholder='اطلاعات جدید را وارد کنید' onChange={(event) => setUserNewCity(event.target.value)} />
          <input style={{ marginBottom: 5 }} type='text' value={userNewEmail} placeholder='اطلاعات جدید را وارد کنید' onChange={(event) => setUserNewEmail(event.target.value)} />
          <input style={{ marginBottom: 5 }} type='text' value={userNewAddress} placeholder='اطلاعات جدید را وارد کنید' onChange={(event) => setUserNewAddress(event.target.value)} />
          <input style={{ marginBottom: 5 }} type='text' value={userNewBuy} placeholder='اطلاعات جدید را وارد کنید' onChange={(event) => setUserNewBuy(event.target.value)} />
          <input style={{ marginBottom: 5 }} type='text' value={userNewScore} placeholder='اطلاعات جدید را وارد کنید' onChange={(event) => setUserNewScore(event.target.value)} />
        </EditModal>}

      {isDetailsModalVisible &&
        <DetailsModal
          closer={closeDetailsModal}>
          <table className="cms-table">
            <thead>
              <tr>
                <th>شهر</th>
                <th>آدرس</th>
                <th>امتیاز</th>
                <th>میزان خرید</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{customerInfo.city}</td>
                <td>{customerInfo.address}</td>
                <td>{customerInfo.score}</td>
                <td>{customerInfo.buy}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>}
    </>
  )
}
