import { useState } from 'react'
import { PropTypes } from  'prop-types'
import './Counter.css'

export default function Counter(){

    const [count, setCount] = useState(0)

    function incrementCounterParentFunction(by){
        setCount(count+by)
    }
    function decrementCounterParentFunction(by){
        setCount(count-by)
    }
    function resetCounter(){
        setCount(0)
    }

    return(
        <>  
         <span className="totalcount">{count}</span>
         <CounterButton by={1} 
              incrementCounterParentFunction={incrementCounterParentFunction}
              decrementCounterParentFunction={decrementCounterParentFunction}/>
         <CounterButton by={2} 
              incrementCounterParentFunction={incrementCounterParentFunction}
              decrementCounterParentFunction={decrementCounterParentFunction}/>
         <CounterButton by={5}
              incrementCounterParentFunction={incrementCounterParentFunction}
              decrementCounterParentFunction={decrementCounterParentFunction}/>
        <button className='counterReset' onClick={resetCounter}>Reset</button>
        </>
    )
}

function CounterButton({by, incrementCounterParentFunction, decrementCounterParentFunction}){

  
    
    // function incrementCounterFunction(){
    //     incrementCounterParentFunction(by)
    // }
    // function decrementCounterFunction(){
    //     decrementCounterParentFunction(by)
    // }

    return (
        <div className="Counter">
 
            <div>
                <button className="counterButton" 
                        onClick={() => incrementCounterParentFunction(by)}
                        >+{by}</button>

                <button className="counterButton" 
                        onClick={()=> decrementCounterParentFunction(by)}
                        >-{by}</button>
            </div>
            
        </div>
        
    )
}

CounterButton.prototype={
    by: PropTypes.number
}

Counter.prototype={
    by: PropTypes.number
}