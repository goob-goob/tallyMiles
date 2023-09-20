import { useState, useEffect } from 'react'

// import './App.css'

function App() {

  const MILLI_IN_DAY = 86400000
  const MILLI_IN_SEVEN_DAYS = MILLI_IN_DAY * 7
  const MILLI_IN_THIRTY_DAYS = MILLI_IN_DAY * 30

  const input = document.getElementById('goob-input')

  const [x, setX] = useState('')
  const [entries, setEntries] = useState({})

  // console.log('entries', entries)

  const things = Object.entries(entries).map(([key, value]) => [Number(key), value]).sort(([k1, v1], [k2, v2]) => k2 - k1)

  const sevenDaysEntries = things.filter(([key, value]) => key - MILLI_IN_SEVEN_DAYS)
  // console.log('sevenDaysEntries', sevenDaysEntries)
  const sevenDaysValues = sevenDaysEntries.map(([key, value]) => Number(value))
  const sevenDaysTotal = sevenDaysValues.reduce((a, b) => a + b, 0)
  // console.log('sevenDaysTotal', sevenDaysTotal)

  const thirtyDaysEntries = things.filter(([key, value]) => key - MILLI_IN_THIRTY_DAYS)
  // console.log('thirtyDaysEntries', thirtyDaysEntries)
  const thirtyDaysValues = thirtyDaysEntries.map(([key, value]) => Number(value))
  const thirtyDaysTotal = thirtyDaysValues.reduce((a, b) => a + b, 0)
  // console.log('sevenDaysTotal', sevenDaysTotal)

  function addEntry(e) {
  
    const key = Date.now()
    const value = x
    localStorage.setItem(key, value)
    setEntries({ ...localStorage })

    input.value = ''
  }

  function handleNumberChange(e) {
    setX(e.target.value)
  }

  useEffect(() => {
    // let keys = Object.keys

    setEntries({ ...localStorage })
  }, [])


  return (

    <div className='bg-black text-white w-screen h-screen'>
      <section className='w-screen h-1/4 outline-white'>\
        {/* <h1>header?</h1> */}
      </section>
      <section className='w-full h-1/2 flex text-3xl'>
        <section className='lg:w-1/4  h-full outline-teal-500'></section>
        <section className='w-5/6 mx-16 lg:ml-0 lg:w-1/2 h-full  outline-yellow-400 flex flex-row items-center justify-center'>
          <section className=' outline-green-500 flex flex-col w-1/2 lg:w-1/3 h-full pt-2'>
            <section>
              {Object.entries(sevenDaysEntries).map(([index, [key, value]]) => (

                <section
                  className='h-10 bg-white text-black text-3xl my-2 rounded'
                  key={key}>
                  {String(value)}
                </section>
              ))}
            </section>
            <form>
              <input name='' id='goob-input' type="number" onChange={handleNumberChange} className=' mt-4 mb-3 rounded text-black w-full h-16 outline outline-red-300' />
            </form>
            <button
              className='bg-teal outline-red-600 outline rounded'
              onClick={addEntry}
            >Add Entry
            </button>
            {/* <button className='bg-red outline-blue-500 outline h-6'>Other button</button> */}
          </section>
          <section className='outline-purple-500  w-1/2 lg:w-1/3 h-full'>
            <section className='w-full h-1/6  outline-orange-500 pl-4 pt-4'>
              <h1>Last 7 Days</h1>
              <p>{sevenDaysTotal}</p>
            </section>
            <section className='w-full h-1/6  outline-orange-500 pl-4'>
              <h1>Last 30 Days</h1>
              <p>{thirtyDaysTotal}</p>
            </section>
          </section>
        </section>
        <section className='lg:w-1/4 h-full outline-teal-500'></section>
      </section>
      <section className='w-screen h-1/4 outline-white'>
        {/* <h1>Footer?</h1> */}
      </section>
    </div>

  )
}

export default App
