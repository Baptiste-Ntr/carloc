import { useEffect, useState } from "react"
import { fetchData } from "../utils/fetchData"
import AnnonceObject from "./Annonce"
import useAuth from "../utils/hooks/useAuth"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export const AnnonceContainer = () => {

    const { register, handleSubmit } = useForm()

    const [annonces, setAnnonces] = useState([])
    const [cars, setCars] = useState([])

    const [isAddingAnnonce, setIsAddingAnnonce] = useState(false)

    const [isAuth, setIsAuth] = useState(null)

    const auth = useAuth()

    const getAnnonces = async () => {
        try {
            const response = await fetchData('http://localhost:5000/annonces', 'GET', { 'Content-Type': 'application/json', })
            if (response.status === 200) {
                console.log('Annonces:', response.data)
                setAnnonces(response.data)
            } else {
                console.log('Error fetching annonces:', response.message)
                return []
            }
        } catch (err) {
            console.log('Error fetching annonces:', err)
        }
    }

    const getUserCars = async () => {
        try {
            const response = await fetchData(`http://localhost:5000/cars_user/${auth.id}`, 'GET', { 'Content-Type': 'application/json', })
            if (response.status === 200) {
                console.log('Cars:', response.data)
                setCars(response.data)
            } else {
                console.log('Error fetching cars:', response.message)
                return []
            }
        } catch (err) {
            console.log('Error fetching cars:', err)
            return []
        }
    }

    const handleSubmitAddAnnonce = async (data) => {
        const formData = {
            ...data,
            id_user: auth.id,
            id_car: data.carId,
            createdAt: new Date('yyyy-MM-dd HH:mm:ss')
        }
        try {
            const response = await fetchData('http://localhost:5000/annonces', 'POST', { 'Content-Type': 'application/json', }, JSON.stringify(formData))
            if (response.status === 200) {
                setIsAddingAnnonce(false)
                toast.success('Annonce added')
                console.log('Annonce added:', response.data)
                getAnnonces()
            } else {
                toast.error('Error adding annonce')
                console.log('Error adding annonce:', response.message)
            }
        } catch (err) {
            console.log('Error adding annonce:', err)
        }
    }

    const handleEdit = async (isEdited) => {
        if (isEdited) {
            getAnnonces()
        }
    }

    const handleDelete = async (isDeleted) => {
        if (isDeleted) {
            getAnnonces()
        }
    }

    useEffect(() => {
        if (auth.isAuthenticated) {
            setIsAuth(true)
        }
        getAnnonces()
        getUserCars()
    }, [auth])

    return (
        <div>
            <h1>Annonces</h1>
            <p>{isAuth ? 'true' : 'false'}</p>
            <nav>
                {isAuth && <input type="button" value="➕ Add Annonce" onClick={() => setIsAddingAnnonce(!isAddingAnnonce)} />}
            </nav>
            {isAddingAnnonce && (
                <form onSubmit={handleSubmit(handleSubmitAddAnnonce)}>
                    <input type="text" name="title" placeholder="Title" {...register('title', { required: true })} />
                    <input type="text" name="description" placeholder="Description" {...register('description', { required: true })} />
                    <select {...register('carId', { required: true })}>
                        {cars.map((car, index) => (
                            <option key={index} value={car.ID}>{car.TITLE}</option>
                        ))}
                    </select>
                    <input type="submit" value={"Add Annonce"} />
                    <input type="button" value="❌" onClick={() => setIsAddingAnnonce(!isAddingAnnonce)} />
                </form>
            )}
            <section>
                <ul>
                    {annonces.map((annonce, index) => (
                        <li key={index}>
                            <AnnonceObject annonce={annonce} userId={auth.id} isDeleted={handleDelete} isEdited={handleEdit} />
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}