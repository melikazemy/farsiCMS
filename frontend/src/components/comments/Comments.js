import React, { useEffect, useState } from 'react'
import ErrorBox from '../errorBox/ErrorBox'
import './Comments.css'
import DetailsModal from '../detailsModal/DetailsModal'
import DeleteModal from '../deleteModal/DeleteModal'
import EditModal from '../editModal/EditModal'
export default function Comments() {
  const [allComments, setAllComments] = useState([])
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false)
  const [commentBody, setCommentBody] = useState('')
  const [commentId, setCommentId] = useState(null)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isCommentAcceptedModal, setIsCommentAcceptedModal] = useState(null)
  const onHide = () => {
    setIsDetailsModalVisible(false)
  }
  const submit = () => {
    fetch(`http://localhost:8000/api/comments/${commentId}`, {
      method: 'DELETE',
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        getAllComments()
        setIsDeleteModalVisible(false)
      })

  }
  const cancle = () => {
    setIsDeleteModalVisible(false)
  }
  const getAllComments = () => {
    fetch('http://localhost:8000/api/comments', {
      method: 'GET'
    }).then(res => res.json()).then(result => {
      console.log(result)
      setAllComments(result)
    })
  }
  useEffect(() => {
    getAllComments()
  }, [])

  const closeEditModal = () => {
    setIsEditModalVisible(false)
  }
  const saveCommentChanges = (event) => {
    event.preventDefault()
    fetch(`http://localhost:8000/api/comments/${commentId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          body: commentBody
        })
      }).then(res => res.json())
      .then(result => {
        console.log(result)
        getAllComments()
        setIsEditModalVisible(false)
      })
  }

  const closeCommentAcceptModal = () => {
    setIsCommentAcceptedModal(false)
  }
  const publishComment = () => {
    fetch(`http://localhost:8000/api/comments/accept/${commentId}`, {
      method: 'POST',
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setIsCommentAcceptedModal(false)
        getAllComments()
      })
  }

  const rejectComment = () => {
    fetch(`http://localhost:8000/api/comments/reject/${commentId}`,
      { method: 'POST' }
    ).then(res => res.json())
      .then(result => console.log(result))
      getAllComments()
  }
  return (
    <div className='cms-main'>
      {allComments.length ? (<table className='cms-table'>
        <thead>
          <tr>
            <th>اسم کاربر</th>
            <th>محصول </th>
            <th>کامنت </th>
            <th>تاریخ </th>
            <th>ساعت </th>
          </tr>
        </thead>
        <tbody>
          {allComments.map(comment => (
            <tr key={comment.id}>
              <td>{comment.userID}</td>
              <td>{comment.productID}</td>
              <td>
                <button onClick={() => {
                  setIsDetailsModalVisible(true)
                  setCommentBody(comment.body)
                }}>دیدن متن کامنت</button>
              </td>
              <td>{comment.date}</td>
              <td>{comment.hour}</td>
              <td>
                <button className='text-modal-close-btn'
                  onClick={() => {
                    setIsDeleteModalVisible(true)
                    setCommentId(comment.id)
                  }}>حذف</button>
                <button className='text-modal-close-btn'
                  onClick={() => {
                    setCommentId(comment.id)
                    setIsEditModalVisible(true)
                    setCommentBody(comment.body)

                  }}>ویرایش</button>

                <button className='text-modal-close-btn'>پاسخ</button>

                {comment.isAccept === 0 ?
                  (<button className='text-modal-close-btn'
                    onClick={() => {
                      setIsCommentAcceptedModal(true)
                      setCommentId(comment.id)
                    }}>تایید</button>)
                  : (<button
                    className='text-modal-close-btn'
                    onClick={() => {
                      setCommentId(comment.id)
                      rejectComment()
                    }
                    }
                  >رد </button>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>) : (<ErrorBox msg={'هیچ نظری یافت نشد'} />)}
      {isDetailsModalVisible &&
        (
          <DetailsModal closer={onHide} >
            <p className='text-modal'>
              {commentBody}
            </p>
            <button className='text-modal-close-btn' onClick={onHide}>بستن</button>
          </DetailsModal>
        )
      }

      {isDeleteModalVisible && (
        <DeleteModal submitted={submit} cancled={cancle} topic='آیا از حذف اطمینان دارید؟' />
      )}

      {isEditModalVisible &&
        (
          <EditModal onSubmit={saveCommentChanges} onClose={closeEditModal}>
            <textarea value={commentBody} onChange={event => setCommentBody(event.target.value)} />
          </EditModal>
        )}

      {isCommentAcceptedModal && (
        <DeleteModal submitted={publishComment} cancled={closeCommentAcceptModal} topic='کامنت منتشر شود؟' />
      )}
    </div>
  )
}
