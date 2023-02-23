import React, { useState } from 'react';

import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

import registerService from '../Services/register'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function RegisterForm() {

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)

    const [open, setOpen] = useState(true)

    const navigate = useNavigate()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        registerService.register(({ username, name, password }),
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        })
        .then((response) => {
            console.log(response.data.message)
        })
        .catch((error) => {
            console.log(error)
        })
        setUsername('')
        setName('')
        setPassword('')
        setSuccessMessage(`Congrats! ${username} registered`)
        setTimeout(() => {
            setSuccessMessage(null)
            navigate('/login')
        }, 6000)
    }

    return (
    <div className='registeration-form-container'>
        <h3>Register</h3>
        {successMessage ?
            <div>
                <p>{successMessage}</p>
                <p>Login</p>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert severity="success">Congrats user has been registered!</Alert>
                </Snackbar>
            </div>
            :
        <form onSubmit={handleSubmit}>
            <div>
                Username
                    <input
                        type="username"
                        name="username"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        placeholder='Enter Username'
                        required
                    />
            </div>
            <div>
                Name
                    <input
                        type="name"
                        name="name"
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                        placeholder='Enter name'
                        required
                    />
            </div>
            <div>
                Password
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder='Enter password'
                        required
                    />
            </div>
                <button type="submit">Register</button>
        </form>
}
    </div>
  )
}

export default RegisterForm