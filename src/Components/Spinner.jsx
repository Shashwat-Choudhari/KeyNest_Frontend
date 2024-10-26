import React from 'react'
import loading from "./loading.gif"

const Spinner = () => {
  return (
    <div className='flex w-full justify-center m-0 p-0'>
        <img src={loading} alt="loading" />
      </div>
  )
}

export default Spinner