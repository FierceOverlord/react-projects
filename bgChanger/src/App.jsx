import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState("black")

  return (
    <div className='w-full h-screen' style={{background: color}}>
      <div className="fixed flex flex-wrap justify-center inset-x-0 bottom-12 rounded-xl px-3">
        <div className="flex flex-wrap gap-3 rounded-3xl px-3 py-2 bg-white">
          <button onClick={() => setColor("red")} className='bg-red-600 text-white rounded-2xl px-3 py-2 outline-none shadow-md' >Red</button>
          <button onClick={() => setColor("blue")} className="bg-blue-700 text-white rounded-2xl px-3 py-2 outline-none ">Blue</button>
        </div>
      </div>
    </div>
  )
}

export default App
