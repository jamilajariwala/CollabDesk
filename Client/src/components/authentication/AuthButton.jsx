import React from 'react'

const AuthButton = (props) => {
  return (
    <div>
        <button type="submit" className='bg-[#6D8196] px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-white hover:bg-[#5C7087] hover:shadow-md transition-all duration-200 active:scale-95'>
            {props.button}
        </button>
    </div>
  )
}

export default AuthButton