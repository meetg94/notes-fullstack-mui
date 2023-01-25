function LoginForm({
    handleSubmit,
    handlerUsernameChange,
    handlePasswordChange,
    username,
    password
}) {
  return (
    <div>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
            <div>
                username
                    <input
                        value={username}
                        onChange={handlerUsernameChange}
                    />
            </div>
            <div>
                password
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
            </div>
                <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default LoginForm