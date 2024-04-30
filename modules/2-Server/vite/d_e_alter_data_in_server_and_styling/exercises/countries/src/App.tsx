import countries_services from './services/countries'
import {useState, useEffect} from 'react'
const App = () => {
    const [countries, set_countries] = useState([])
    useEffect(()=> {
        countries_services
            .get_all()
            .then(all_countries => {
                set_countries(all_countries)
            })
    },[])
    if(countries.length > 0)
        console.log(countries.entries.name)
    return (
        <div>
            Idk yet
        </div>
    )
}
export default App
