import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get("email")
        const password = formData.get("password")

        try {
            const response = await fetch(`http://localhost:5000/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            if (response.ok) {
                toast.success('Login successful')
                navigate('/profile')
            } else if (response.status === 401) {
                toast.error('Invalid credentials')
            } else {
                toast.error('An error occurred. Please try again later.')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" name="email" required />
                <input type="password" placeholder="Password" name="password" required />
                <button type="submit">Login</button>
            </form>
            <input value={'🏠'} type="button" onClick={() => navigate('/')} />
        </div>
    )
}

export default Login