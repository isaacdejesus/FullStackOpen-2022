import axios from 'axios'
const all_url = "https://studies.cs.helsinki.fi/restcountries/api/all"
const specific_url = "https://studies.cs.helsinki.fi/restcountries/api/name/"
const get_all = () => {
    const request = axios.get(all_url);
    return request.then(response => response.data);
}
const get_country = (country_name: string) => {
    const request = axios.get(`${specific_url}/${country_name}`);
    return request.then(response => response.data);
}

export default {get_all, get_country}
