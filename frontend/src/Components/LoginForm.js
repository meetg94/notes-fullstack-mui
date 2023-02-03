import { useNavigate } from 'react-router-dom'

function LoginForm({
    username,
    password,
    handleLogin,
    setUsername,
    setPassword
}) {

    // const handleRegisterClick = () => {
    //     navigate.push('/register')
    // }

  return (
    <div>
        <h4>Not Registered ? <div className='register-button'>Register Now!</div></h4>
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
    </div>
  )
}

export default LoginForm