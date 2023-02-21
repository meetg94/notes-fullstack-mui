import axios from "axios";
const baseUrl = '/api/auth/signup'

const register = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return console.log(response.data)
}

const registerService = {
    register
}

export default registerService;