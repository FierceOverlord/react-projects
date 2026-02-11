import { useState, useCallback, useEffect, useRef } from 'react'

// useState stores component local state and triggers a re-render when the state changes

// useCallback memorizes a function so that its references deos not change in renders
// unless dependencies change (used to prevent unnecessary re-renders)

// useEffect runs side effects after render and re-runs when dependencies change 

// useRef holds mutable value that does not cause re-renders and can hold a DOM refernce
// without causing re-renders 

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_-/?:[]{}~"

    for(let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass) 

  }, [length, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0, 4)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md shadow-md rounded-lg mx-auto my-8 px-4 py-3 bg-gray-700 text-orange-500">
        
        <h2 className="text-white text-center my-3">Password Generator</h2>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            ref={passwordRef}
            readOnly
          />
          <button 
            onClick={copyPasswordToClipboard}
            className='px-3 py-0.5 shrink-0 bg-blue-500 outline-none text-white'>
              Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
              type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox" 
              id="checkboxInput"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }} 
            />
            <label htmlFor="checkboxInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
