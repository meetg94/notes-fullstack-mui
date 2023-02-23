import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function LoginForm({
    username,
    password,
    handleLogin,
    setUsername,
    setPassword
}) {

    const [loginShow, setLoginShow] = useState(true)

    // const handleRegisterClick = () => {
    //     navigate.push('/register')
    // }

    const navigate = useNavigate()

  return (
    <div className='login-register-container'>
        <h4>Not Registered ? 
            <div className='register-button' onClick={() => {navigate('/register')}}>
                Register Now!
            </div>
        </h4>
        {loginShow ? 
            (<div>
                <h3>Login</h3>
                    <form onSubmit={handleLogin}>
                <div>
                    username
                        <input
                            value={username}
                            onChange={({ target }) =>setUsername(target.value)}
                        />
                </div>
                <div>
                    password
                        <input
                            type="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                </div>
                <button type="submit">Login</button>
                    </form>
            </div>) : null
        }
        
    </div>
  )
}

export default LoginForm