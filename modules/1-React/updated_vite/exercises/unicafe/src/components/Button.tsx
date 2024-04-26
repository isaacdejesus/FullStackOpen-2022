const Button = ({handler_function, text}: {handler_function: ()=> void, text: string}) => {
    return(
        <button onClick={handler_function}>{text}</button>
    )
}
export default Button
