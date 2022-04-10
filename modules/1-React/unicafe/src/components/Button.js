import React from "react";

const Button = ({text, setFunction}) => {
    return(
    <button onClick={setFunction}>
       {text} 
    </button>)
}

export default Button