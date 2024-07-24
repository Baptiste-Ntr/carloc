import { useState } from "react"
import { Link } from "react-router-dom"
import AddAnnonce from "../components/addAnnonce";

const Home = () => {
    const [addAnnonceOpen, setAddAnnonceOpen] = useState(false);
    return (
        <div>
            <h1>Home</h1>
            <Link to="/login">Login 🔒</Link>
            <Link to="/register">Register 📝</Link>
            {addAnnonceOpen && (
            <AddAnnonce/>
            )}
            <button onClick={() => setAddAnnonceOpen(!addAnnonceOpen)}>Add Annonce</button>
        </div>
    )
}

export default Home   