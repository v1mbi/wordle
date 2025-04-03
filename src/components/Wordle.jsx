import React, { useEffect, useRef, useState } from 'react'
import WordGrid from './WordGrid'

export default function Wordle() {
  const [wordle,setWordle] = useState("Hello")
  const [won,setWon] = useState(false)
  const [retry,setRetry] = useState(false)
  const [easy,setEasy] = useState(true)

  function randomint(max,min){
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  useEffect(() => {
    async function fetchData(){
      const attachment = !easy?("?length=" + randomint(5,3)):("?length=" + randomint(9,6)) 
      const data = await fetch("https://random-word-api.herokuapp.com/word" + attachment)
      const response = await data.json()
      setWordle(response[0])
    }
    fetchData()
  },[retry])

  
  useEffect(()=>{
    setRetry(!retry)
  },[easy])

  

  console.log(wordle)
  
  return (<div className='flex flex-col items-center '>

<h6 className='m-0 text-xs text-gray-800'>the wordle in the console</h6>
    <div className='flex flex-row'>
      
      
      
      <h1 className='text-4xl m-1 text-gray-300'>Wordle</h1><h1 className='text-4xl m-1 text-blue-400'>Clone</h1></div>



    <div className="flex items-center m-2">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={easy}
          readOnly
        />
        <div
          onClick={() => setEasy(!easy)}
          className="w-11 h-6 bg-teal-300 rounded-full peer peer-checked:bg-red-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
        ></div>
        <span className="ml-2 text-sm font-medium text-white-900">
          {easy ? "Hard" : "Easy"}
        </span>
      </label>
    </div>
    
    
    <WordGrid wordle= {wordle} won={setWon}/>
    <WordGrid wordle= {wordle} won={setWon}/>
    <WordGrid wordle= {wordle} won={setWon}/>
    <WordGrid wordle= {wordle} won={setWon}/>
    <WordGrid wordle= {wordle} won={setWon}/>
    <button className='bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded' onClick={()=>setRetry(!retry)}>Refresh</button>
    {won ? <h1 className='m-4'> You won</h1> : <h1></h1>}
    </div>
    
  )
}
