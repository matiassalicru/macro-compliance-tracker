import React, { useState } from 'react'
import Head from 'next/head'

// Components
import Result from '../components/Result'
import MCTForm from '../components/MCTForm'

// Libraries
import fetch from 'isomorphic-unfetch'
import dayjs from 'dayjs'

const Home = ({ data }) => {
  const [results, setResults] = useState(data)

  const updateMacros = async () => {
    const res = await fetch('http://localhost:3000/api/daily', {
      method: 'post',
      body: JSON.stringify(results),
    })
  }

  const onChange = (e) => {
    const data = { ...results }

    let name = e.target.name

    let resultType = name.split(' ')[0].toLowerCase()
    let resultMacro = name.split(' ')[1].toLowerCase()

    data[resultMacro][resultType] = e.target.value

    setResults(data)
  }

  const getDataForPreviousDay = async () => {
    let currentDay = dayjs(results.date)
    let newDate = currentDay.subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss')
    const res = await fetch('http://localhost:3000/api/daily?date=' + newDate)
    const previousDayData = await res.json()

    setResults(previousDayData)
  }

  const getDataForNextDay = async () => {
    let currentDay = dayjs(results.date)
    let newDate = currentDay.add(1, 'day').format('YYYY-MM-DDTHH:mm:ss')
    const res = await fetch('http://localhost:3000/api/daily?date=' + newDate)
    const previousDayData = await res.json()

    setResults(previousDayData)
  }
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
        <link
          href='https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css'
          rel='stylesheet'
        />
      </Head>
      <div className='flex text-center'>
        <div className='w-1/3 bg-gray-200 p-4'>
          <button onClick={getDataForPreviousDay}>Previous Day</button>
        </div>
        <div className='w-1/3 p-4'>
          {dayjs(results.date).format('MM/DD/YYYY')}
        </div>
        <div className='w-1/3 bg-gray-200 p-4'>
          <button onClick={getDataForNextDay}>Next Day</button>
        </div>
      </div>
      <div className='flex mb-4 text-center'>
        <Result results={results.calories} />
        <Result results={results.carbs} />
        <Result results={results.fat} />
        <Result results={results.protein} />
      </div>
      <div className='flex'>
        <MCTForm data={results} item='Total' onChange={onChange} />
        <MCTForm data={results} item='Target' onChange={onChange} />
        <MCTForm data={results} item='Variant' onChange={onChange} />
      </div>
      <div className='flex text-center'>
        <div className='w-full m-4'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={updateMacros}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/daily')
  const json = await res.json()
  return {
    props: {
      data: json,
    },
  }
}

export default Home
