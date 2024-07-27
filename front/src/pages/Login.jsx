import { useForm } from 'react-hook-form';
import { fetchData } from '../utils/fetchData';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await fetchData('http://localhost:5000/login', 'POST', { 'Content-Type': 'application/json', }, JSON.stringify(data))
            if (response.status === 200) {
                toast.success('Login successful')
                navigate('/profile')
            } else {
                toast.error(response.message)
            }
            // console.log('Token:', token)
            console.log('Login response:', response)
        } catch (err) {
            console.log('Error logging in:', err)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" {...register("email", { required: true })} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" {...register("password", { required: true })} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;