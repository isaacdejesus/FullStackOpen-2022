const Welcome = ({name}: {name: string}): JSX.Element => {
    return(
        <h1> Hello, {name}</h1>
    )
}
const App = () => {
    return (
        <div>
            <Welcome name="Joey" />
        </div>
    )
}
export default App
