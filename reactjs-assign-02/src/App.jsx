import { useState , useEffect } from 'react'
import './App.css'

function App() {

  // ---------- STATES ----------
  let [input, setInput]   = useState("");
  let [isDark, setIsDark] = useState(false);
  let [isResult , setResult] = useState(false)

  let [history, setHistory]  = useState([])
  let [hasLoaded, setHasLoaded] = useState(false)

  let [showHistrTab , setHistrTab] = useState(false)

  useEffect(() => {
    let savedHistory = localStorage.getItem("calcHistory")
    if (savedHistory) setHistory(JSON.parse(savedHistory))
    setHasLoaded(true)
  } , [])

  useEffect(() => {
    if (hasLoaded) return localStorage.setItem("calcHistory", JSON.stringify(history));
  } , [history, hasLoaded])

  // Button click handler 
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

        // ➕ Save result in history array
        setHistory((prev) => [...prev , `${input} = ${res}`])

      } catch (error) {
        setInput("Error");
        setResult(true)
      }

      return
    }

    if (value === "AC") return setInput("")
    else if (value === "DE") return setInput((prev) => prev.slice(0 , -1))

    // Operators list
    let operators = ["÷", "×", "−", "+", "%"];

    // Handle Operators [one at a time]
    if (operators.includes(value)) {
      
      setInput((prev) => {

        if (prev === "") return ""
        let lastChar = prev.slice(-1)

        if (operators.includes(lastChar)) return prev.slice(0, -1) + value
        return prev + value
        
      })
      setResult(false);
      return;

    }


    // If result already shown and new number clicked → start new calc
    if (isResult && !["÷", "×", "−", "+", "%"].includes(value)) {
      
      setInput(value)
      setResult(false)
      
    } else {
      if (value !== "=") setInput((prev) => prev + value)
      setResult(false)
    }
     
  }

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("calcHistory");
  };

  return (

    <div className={`relative flex flex-row items-center transition-all duration-700`}>

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
            <i onClick={() => setHistrTab(true)} className="fa-solid fa-clock-rotate-left hover:cursor-pointer"></i>

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
    
      {/* ---------- 📜 History Section ---------- */}
      <section className={`flex flex-col justify-between absolute top-0 right-[-260px] h-full w-65 p-4 shadow-lg border-l transition-all duration-700 ease-in-out transform
        ${showHistrTab ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        ${isDark ? "bg-[#1e1e1e] text-white border-gray-700" : "bg-white text-black border-gray-200"}`}>

        <div>
          {/* header with close button */}
          <div className="flex justify-between items-center mb-3 border-b pb-2">
            
            <h2 className="font-semibold text-lg">History</h2>
            <i className="fa-solid fa-xmark hover:cursor-pointer"
              onClick={() => setHistrTab(false)}></i>

          </div>

          {/* history content */}
          <div>
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm">No history yet</p>
            ) : (
              <div className="flex flex-col text-lg text-gray-600 font-semibold tracking-wider space-y-1.5 overflow-y-auto">
                {history.map((h, i) => ( <span key={i}>{h}</span> ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer with clear button */}
        {history.length > 0 && (

          <div className="flex justify-center items-center border-t pt-2">
            <button className="bg-red-600 text-white font-semibold py-1.5 px-4 rounded-md hover:cursor-pointer hover:bg-red-700 text-sm"
              onClick={clearHistory}>
              Clear History
            </button>
          </div>

        )}

      </section>

    </div>
  )
}

export default App
