import { useEffect, useState } from "react"
import { fetchData } from "../utils/fetchData"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import useAuth from "../utils/hooks/useAuth"

/* eslint-disable react/prop-types */
const AnnonceObject = ({ annonce, userId, isEdited, isDeleted }) => {

    const [cars, setCars] = useState([])

    const [isOwnerAnnonce, setIsOwnerAnnonce] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: annonce.TITLE,
            description: annonce.DESCRIPTION
        }
    })

    const getCars = async () => {
        try {
            const response = await fetchData(`http://localhost:5000/cars/${annonce.ID_CAR}`, 'GET', { 'Content-Type': 'application/json', })
            if (response.status === 200) {
                console.log('Cars:', response.data)
                setCars(response.data[0])
            } else {
                console.log('Error fetching cars:', response.message)
                return []
            }
        } catch (err) {
            console.log('Error fetching cars:', err)
            return []
        }
    }

    const handleEdit = async (data) => {

        data = {
            ...data,
            id_user: annonce.ID_USER,
            id_car: annonce.ID_CAR,
            updatedAt: new Date('yyyy-MM-dd HH:mm:ss')
        }

        try {
            const response = await fetchData(`http://localhost:5000/annonces/${annonce.ID}`, 'PUT', { 'Content-Type': 'application/json', }, JSON.stringify(data))
            if (response.status === 200) {
                console.log('Annonce edited:', response.data)
                toast.success('Annonce edited')
                isEdited(true)
                setIsEditing(false)
            } else {
                console.log('Error editing annonce:', response.message)
                toast.error('Error editing annonce')
            }
        } catch (err) {
            console.log('Error editing annonce:', err)
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetchData(`http://localhost:5000/annonces/${annonce.ID}`, 'DELETE', { 'Content-Type': 'application/json', })
            if (response.status === 200) {
                console.log('Annonce deleted:', response.data)
                toast.success('Annonce deleted')
                isDeleted(true)
            } else {
                console.log('Error deleting annonce:', response.message)
                toast.error('Error deleting annonce')
            }
        } catch (err) {
            console.log('Error deleting annonce:', err)
        }
    }

    useEffect(() => {
        if (userId === annonce.ID_USER) {
            setIsOwnerAnnonce(true)
        }
        getCars()
    }, [])

    console.log(cars)

    if (isEditing) {
        return (
            <li>
                <form onSubmit={handleSubmit(handleEdit)}>
                    <input type="text" name="title" {...register('title', { required: true })} />
                    <input type="text" name="description" {...register('description', { required: true })} />
                    <input type="submit" value="Edit" />
                    <input type="button" value="❌" onClick={() => setIsEditing(!isEditing)} />
                </form>
            </li>
        )
    }

    return (
        <li>
            <h2>{annonce.TITLE}</h2>
            <p>{annonce.DESCRIPTION}</p>
            <p>{cars.TITLE}</p>
            <p>{cars.POWER} cv</p>
            <p>{cars.PRICE} €/days</p>
            <p>{cars.KMS} kms</p>
            <p>{cars.FUEL}</p>
            <p>{cars.DATE}</p>
            <p>{annonce.CREATED_AT}</p>
            {isOwnerAnnonce && (
                <>
                    <input type="button" value={"🛠️"} onClick={() => setIsEditing(!isEditing)} />
                    <input type="button" value={"❌"} onClick={handleDelete} />
                </>
            )}
        </li>
    )
}

export default AnnonceObject