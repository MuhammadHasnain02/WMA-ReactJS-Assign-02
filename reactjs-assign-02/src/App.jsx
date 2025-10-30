import { useState } from 'react'
import './App.css'

function App() {
  let [isDark, setIsDark] = useState(false);
  let [input, setInput] = useState("");
  let [isResult , setResult] = useState(false)

  let handleClick = (value) => {

    if (value === "=") {

      try {
        
        let expression = input
          .replace(/×/g , "*")
          .replace(/÷/g , "/")
          .replace(/−/g , "-")

        let res = eval(expression)
        setInput(res.toString())
        setResult(true)

      } catch (error) {
        setInput("Error");
        setResult(true)
      }

      return
    }

    if (value === "AC") return setInput("")
    else if (value === "DE") return setInput((prev) => prev.slice(0 , -1))

    if (isResult && !["÷", "×", "−", "+", "%"].includes(value)) {
      
      setInput(value)
      setResult(false)
      
    } else {
      if (value !== "=") setInput((prev) => prev + value)
      setResult(false)
    }
     
  }

  return (
    <section className={`flex flex-col text-[28px] border border-gray-300 rounded-sm px-2 pt-3.5 pb-2 w-82 space-y-4 transition-all duration-800 ease-in-out
    ${isDark ? "bg-[#1e1e1e] text-white border-gray-700" : "bg-white text-black border-gray-300"}`}>

      {/* top small nav */}
      <div className="flex flex-row justify-between items-center border-b border-gray-300 pb-2">

        <div className='flex flex-row items-center space-x-3'>
          <i className="fa-solid fa-bars text-[20px] hover:cursor-pointer"></i>
          <p className="text-[19px] font-semibold">Calculator</p>
        </div>

        <div className={`flex flex-row items-center text-[18px] space-x-2.5 ${isDark ? "text-gray-300" : "text-gray-600"}`}>

          <i onClick={() => setIsDark(!isDark)} className= {`transition-all hover:cursor-pointer ${
          isDark ? "fa-regular fa-moon" : "fa-regular fa-sun"}`} ></i>
          <i className="fa-solid fa-clock-rotate-left hover:cursor-pointer"></i>

        </div>

      </div>

      {/* Calculation Screen */}
      <input id="displVal" placeholder='0' disabled value={input}
        className={`text-right text-3xl h-20 px-4 rounded-lg focus:outline-none transition-all duration-800 ease-in-out
        ${isDark ? "bg-[#2c2c2c] text-white placeholder-gray-200" : "bg-gray-50 text-black placeholder-gray-500"}`}
      ></input>

      {/* button div */}
      <div className="grid grid-cols-4 gap-1 text-[18px] font-medium text-gray-600">{

        [ "AC", "DE", "%", "÷",
          "7" , "8", "9" , "×",
          "4" , "5", "6" , "−",
          "1" , "2", "3" , "+",
          "±" , "0", "." , "="
        ].map((btn, i) => (

          <button key={i} onClick={() => handleClick(btn)}
          className={`rounded-lg py-3.5 transition-all duration-800 ease-in-out border border-gray-200 hover:cursor-pointer
              
            ${btn === "=" 
              ? "bg-[#3d6fc6] text-white border-none hover:bg-[#3B7BF2]" 
              : isDark 
                ? "bg-gray-900 border-gray-700 text-white hover:bg-gray-700" 
                : "bg-white border-gray-200 text-gray-700 hover:bg-[#e9e9e9]"}
            `}>

            {
              btn === "÷" ? <i className="fa-solid fa-divide"></i> :
              btn === "×" ? <i className="fa-solid fa-xmark"></i> :
              btn === "−" ? <i className="fa-solid fa-minus"></i> :
              btn === "+" ? <i className="fa-solid fa-plus"></i> :
              btn === "=" ? <i className="fa-solid fa-equals"></i> : btn
            }

          </button>

        ))
      }</div>

    </section>
  )
}

export default App
