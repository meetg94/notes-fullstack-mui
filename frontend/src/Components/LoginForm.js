import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import RegisterForm from './RegisterForm'

function LoginForm({
    username,
    password,
    handleLogin,
    setUsername,
    setPassword
}) {

    const [registerFormShow, setRegisterFormShow] = useState(false)

    // const handleRegisterClick = () => {
    //     navigate.push('/register')
    // }

    const navigate = useNavigate()

  return (
    <div className='login-register-container'>
        {registerFormShow ?
            (
            <div>
                <div>
                    <h4>Registered Already?
                        <div className='register-button' onClick={() => setRegisterFormShow(false)}>
                        Login Now!
                    </div>
                </h4> 
            </div>
            <RegisterForm
                setRegisterFormShow={setRegisterFormShow}
            />
            </div>
            )
            :
            (
            <>
            <div>
                <h4>Not Registered?
                    <div className='register-button' onClick={() => setRegisterFormShow(true)}>
                        Register Now!
                    </div>
                </h4> 
            </div>
            <div>
                <h3>Login</h3>
                    <form onSubmit={handleLogin}>
                <div>
                    <label>
                    username
                        <input
                            value={username}
                            onChange={({ target }) =>setUsername(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                    password
                        <input
                            type="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Login</button>
                    </form>
            </div>
            </>)
        }
        
    </div>
  )
}

export default LoginForm