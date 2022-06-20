import React, { useState, useEffect } from 'react'

const Result = ({ results }) => {
  const { target, variant, total } = results

  const [bg, setBg] = useState('')

  useEffect(() => {
    setBackground()
  })

  const setBackground = () => {
    let min = target - variant
    let max = target + variant

    if (total >= min && total <= max) {
      setBg('bg-green-500')
    } else if (total < min) {
      setBg('bg-blue-500')
    } else {
      setBg('bg-red-500')
    }
  }

  return (
    <div className={bg + ' w-1/4 p-4 text-white'}>
      <h2 className='text-3x1 font-bold'>
        {total}
        <div className='flex text-sm p-4'>
          <div className='w-1/3'>{target - variant}</div>
          <div className='w-1/3 font-bold'>{target}</div>
          <div className='w-1/3'>{target + variant}</div>
        </div>
      </h2>
      <h3 className='text-xl'>{results.label}</h3>
    </div>
  )
}

export default Result
