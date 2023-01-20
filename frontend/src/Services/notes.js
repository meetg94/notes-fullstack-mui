import axios from "axios";

const baseUrl = `http://localhost:3001/notes`

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.get(baseUrl)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll: getAll,
    create: create,
    update: update
}