import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AddAnnonce from "../components/addAnnonce";
import { useUser } from "../components/context/userContext";
import verifyJWT from "../utils/verifyJWT";

const Home = () => {
    const [addAnnonceOpen, setAddAnnonceOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false)

    const { jwt } = useUser()

    useEffect(() => {
        const verify = async () => {
            if (!await verifyJWT(jwt)) {
                setIsLogin(false)
                console.log('Not logged in')
            } else {
                setIsLogin(true)
                console.log('Logged in')
            }
        }
        verify()
    })

    return (
        <div>
            <h1>Home</h1>
            {!isLogin && (
                <>
                    <Link to="/login">Login 🔒</Link>
                    <Link to="/register">Register 📝</Link>
                </>
            )}
            {addAnnonceOpen && (
                <AddAnnonce />
            )}
            {isLogin && (
                <button onClick={() => setAddAnnonceOpen(!addAnnonceOpen)}>Add Annonce</button>
            )}
        </div>
    )
}

export default Home   