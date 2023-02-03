import { useState } from 'react'
import axios from 'axios'

import registerService from '../Services/register'

function RegisterForm() {

    const [ userData, setUserData ] = useState({})

    const handleChange = (e) => {
        const newData = {...userData}
        newData[e.target.name] = e.target.value
        setUserData(newData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        registerService.register({ userData })
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

  return (
    <div>
        <h3>Register</h3>
        <form onSubmit={handleSubmit}>
            <div>
                Name
                    <input
                        type="name"
                        value={userData.name}
                        onChange={handleChange}
                        placeholder='Enter Name'
                        required
                    />
            </div>
            <div>
                username
                    <input
                        value={userData.username}
                        onChange={handleChange}
                        placeholder='Enter username'
                        required
                    />
            </div>
            <div>
                password
                    <input
                        type="password"
                        value={userData.password}
                        onChange={handleChange}
                        placeholder='Enter password'
                        required
                    />
            </div>
                <button type="submit">Register</button>
        </form>
    </div>
  )
}

export default RegisterForm