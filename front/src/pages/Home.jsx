import { Link, useNavigate } from "react-router-dom";
import useAuth from "../utils/hooks/useAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AnnonceContainer } from "../components/AnnonceContainer";

const Home = () => {

    const navigate = useNavigate()
    const auth = useAuth()

    const [isAuth, setIsAuth] = useState(null)

    useEffect(() => {
        if (auth.isAuthenticated === null) return // Attendre que l'état soit mis à jour

        if (!auth.isAuthenticated) {
            navigate('/login')
            toast.error('You need to be logged in to access this page')
        } else {
            setIsAuth(true)
        }
    }, [auth])

    return (
        isAuth ? (
            <div>
                <h1>Home</h1>
                <Link to="/profile">👤 Profile</Link>
                <section>
                    <AnnonceContainer />
                </section>
            </div>
        ) : (
            <div>
                <h1>Home</h1>
                <Link to="/login">🔑 Login</Link>
                <Link to={"/register"}>📝 Register</Link>
            </div >
        )
    )
}

export default Home;