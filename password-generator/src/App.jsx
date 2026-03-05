import { useState , useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberInclude, setNumberInclude] = useState(false)
  const [charInclude, setCharInclude] = useState(false)
  const [password, setPassword] = useState("")

  const passwordReference = useRef(null)

  const copyPasswordToClipboard = useCallback(() =>{
    passwordReference.current.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerator = useCallback(() =>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberInclude){
      str+="0123456789"
    }
    if(charInclude){
      str+="!@#$%^&*()-+"
    }
    for(let i=0;i<length;i++){
      let char = Math.floor(Math.random()*str.length)
      pass += str.charAt(char) 
    }
    setPassword(pass)
  }, [length, numberInclude, charInclude, setPassword])

  useEffect(() =>{
    passwordGenerator()},
    [passwordGenerator,length, numberInclude, charInclude])

  return (
    //this div is for background
    <div className="min-h-screen bg-gray-900  ">
      


      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg
       text-orange-500 bg-gray-800 px-4 my-8 py-3  'id='box'>
        <h1 className='text-2xl font-bold text-center
         text-white py-4 '>Password Generator</h1>


         
         <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
              value={password}
              readOnly
              placeholder='Password'
              className='outline-none w-full py-1 px-3 bg-white'
              ref={passwordReference}
          />
          <button onClick={copyPasswordToClipboard}
          className='bg-blue-500 hover:bg-blue-600 text-white py-1 px-1'>Copy</button>
         </div>


        <div className='flex text-sm gap-x-2'>
          <div className=' flex item-center gap-x-1'>
            <input type="range"
             min={8}
             max={100}
             value={length}
             className='cursor-pointer'
             onChange={(e) => setLength(e.target.value)}
             />
             <label>Length :{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numberInclude}
              id='numberInput'
              onChange={() => setNumberInclude((prev) => !prev)}
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charInclude}
              id='charInput'
              onChange={() => setCharInclude((prev) => !prev)}
            />
            <label>Symbols</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
