import React from 'react'

export default function DeleteModal({setConfirmDelete}) {
  return (
    <div className='absolute flex flex-1 justify-center items-center bg-third'>
        <p>Are you sure ?</p>
        <div className='flex flex-col justify-between'>
            <button 
            onClick={()=>{setConfirmDelete(true)}}
            className='px-5 py-2'>
                Yes
            </button>
            <button className='px-5 py-2'>
                No
            </button>
        </div>
    </div>
  )
}
