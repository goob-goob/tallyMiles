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

  let things = Object.entries(entries).map(([key, value]) => [Number(key), value]).sort(([k1], [k2]) => k2 - k1)
  const today = Date.now()
  console.log('today = ', today)

  const sevenDaysEntries = things.filter(([key]) => key + MILLI_IN_SEVEN_DAYS > today - MILLI_IN_SEVEN_DAYS)
  console.log('sevenDaysEntries', sevenDaysEntries)
  const sevenDaysValues = sevenDaysEntries.map(([_, value]) => Number(value))
  const sevenDaysTotal = sevenDaysValues.reduce((a, b) => a + b, 0)
  // console.log('sevenDaysTotal', sevenDaysTotal)

  const thirtyDaysEntries = things.filter(([key]) => key + MILLI_IN_THIRTY_DAYS > today - MILLI_IN_THIRTY_DAYS)
  console.log('thirtyDaysEntries', thirtyDaysEntries)
  const thirtyDaysValues = thirtyDaysEntries.map(([_, value]) => Number(value))
  const thirtyDaysTotal = thirtyDaysValues.reduce((a, b) => a + b, 0)
  // console.log('sevenDaysTotal', sevenDaysTotal)

  let quarter = new Date().getMonth()
  quarter = whatQuarter(quarter)
  console.log('quarter, ', quarter, typeof quarter)

  console.log('new Date(key).getMonth()', new Date().getMonth())
  console.log('new Date(key).getMonth()', whatQuarter(new Date().getMonth()))

  const quarterlyEntries = things.filter(([key]) => whatQuarter(new Date(key).getMonth()) == quarter)
  console.log('quarterlyEntries', quarterlyEntries)
  const quarterlyValues = quarterlyEntries.map(([_, value]) => Number(value))
  const quarterlyTotal = quarterlyValues.reduce((a, b) => a + b, 0)

  function whatQuarter(x) {
    switch (x) {
      case 0:
      case 1:
      case 2:
        return 1
        break
      case 3:
      case 4:
      case 5:
        return 2
        break
      case 6:
      case 7:
      case 8:
        return 3
        break
      default:
        return 4
        break
    }
  }

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

    <div className='text-white w-screen h-screen flex justify-center flex-col bg-gray-900'>

      <section className='-w-full flex  text-3xl'>
        <section className='lg:w-1/4  h-full outline-teal-500'></section>
        <section className='w-full lg:ml-0  h-full  outline-yellow-400 flex bg-gray-900 flex-col-reverse lg:flex-row items-center justify-center'>
          <section className=' outline-green-500 flex flex-col w-5/6 lg:w-1/3 h-full pt-4'>
            <section className='flex lg:flex-col flex-col-reverse '>
              {Object.entries(sevenDaysEntries.slice(0, 8)).map(([index, [key, value]]) => (

                <section
                  className='lg:h-10 bg-white text-black text-6xl lg:text-3xl my-2 rounded-lg pl-4'
                  key={key}>
                  {String(value)}
                </section>
              ))}
            </section>
            <form>
              <input name='' id='goob-input' type="number" onChange={handleNumberChange} className='pl-4 text-6xl mt-4 mb-3 rounded text-black w-full h-16 outline outline-red-300' />
            </form>
            <button
              className='bg-teal outline-red-600 outline rounded text-6xl'
              onClick={addEntry}
            >Add Entry
            </button>
            {/* <button className='bg-red outline-blue-500 outline h-6'>Other button</button> */}
          </section>
          <section className='outline-purple-500  w-full bg-gray-700 bg-opacity-40 lg:w-1/3 h-full flex justify-center'>
            <section className='outline-yellow-500  w-5/6 '>
              <section className='outline-blue-500  flex w-full justify-center'>
                <section className='w-1/2 lg:h-1/6  outline-orange-500 mb-4 pl-4 pt-4 text-5xl flex flex-col items-center'>
                  <h1>Quarterly</h1>
                  <p>{quarterlyTotal}</p>
                </section>
              </section>
              <section className='w-full outline-yellow-600  flex items-center'>
                <section className=' lg:h-1/6  outline-orange-500 mb-4 pl-4 lg:pt-4 text-5xl flex-1 flex flex-col items-center'>
                  <h1>7 Days</h1>
                  <p>{sevenDaysTotal}</p>
                </section>
                <section className=' lg:h-1/6  outline-orange-500 pl-4 mb-4 text-5xl flex-1 flex flex-col items-center'>
                  <h1>30 Days</h1>
                  <p>{thirtyDaysTotal}</p>
                </section>
              </section>
            </section>
          </section>
        </section>
        <section className='lg:w-1/4 h-full outline-teal-500'></section>
      </section>

    </div>

  )
}

export default App
