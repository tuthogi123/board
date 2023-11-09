import React , {useState} from "react"

function Count() { 
    const [ count , setCount] = useState(0);


    return(
        <div>
            <h>count:  {count}</h>
            <button onClick={()=> setCount( count + 1)}>increment</button>



        </div>
    )
    
}
export default Count;