import { useEffect, useState } from "react"
import { fetchData } from "../utils/fetchData"
import useAuth from "../utils/hooks/useAuth"
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { Car } from "../components/Car"

const Profile = () => {

    const auth = useAuth()

    const navigate = useNavigate()

    const [isAddingCar, setIsAddingCar] = useState(false)
    const [cars, setCars] = useState()

    const { register, handleSubmit } = useForm();

    const getCars = async () => {
        try {
            const response = await fetchData(`http://localhost:5000/cars_user/${auth.id}`, 'GET', { 'Content-Type': 'application/json', })
            if (response.status === 200) {
                console.log('Cars:', response.data)
                return response.data
            } else {
                console.log('Error fetching cars:', response.message)
                return []
            }
        } catch (err) {
            console.log('Error fetching cars:', err)
            return []
        }
    }

    const submitCar = async (data) => {

        const formData = {
            ...data,
            createdAt: new Date('yyyy-MM-dd HH:mm:ss'),
            idUser: auth.id
        }

        console.log(formData)

        try {
            const response = await fetchData(`http://localhost:5000/cars`, 'POST', { 'Content-Type': 'application/json', }, JSON.stringify(formData))
            if (response.status === 200) {
                setIsAddingCar(false)
                toast.success('Added Cars')
                console.log('Car added:', response.data)
                const updatedCars = await getCars()
                setCars(updatedCars)
            } else {
                console.log('Error adding car:', response.message)
                toast.error('Error adding car')
            }
        } catch (err) {
            console.log('Error adding car:', err)
        }
    }

    const handleEdit = async (isEdited) => {
        if (isEdited) {
            const updatedCars = await getCars()
            setCars(updatedCars)
        }
    }

    const handleDelete = async (isDeleted) => {
        if (isDeleted) {
            const updatedCars = await getCars()
            setCars(updatedCars)
        }
    }

    useEffect(() => {
        if (auth.isAuthenticated === null) return // Attendre que l'état soit mis à jour

        if (!auth.isAuthenticated) {
            navigate('/login')
            toast.error('You need to be logged in to access this page')
        } else {
            toast.success('Welcome to your profile')
            const fetchCars = async () => {
                const carsData = await getCars()
                setCars(carsData)
            }
            fetchCars()
        }
    }, [auth])

    console.log('Cars:', cars)

    return (
        <div>
            <h1>Profile</h1>
            <nav>
                <Link to={'/'}>🏠</Link>
                <input type="button" value={'Add a car'} onClick={() => setIsAddingCar(!isAddingCar)} />
            </nav>
            {isAddingCar && (
                <form onSubmit={handleSubmit(submitCar)}>
                    {/* title, power, fuel, price per days, kms, date, createdAt */}
                    <input type="text" id='title' name='title' placeholder='Title' {...register('title', { required: true })} />
                    <input type="number" id='power' name='power' placeholder='Power' {...register('power', { required: true })} />
                    <input type="text" id='fuel' name='fuel' placeholder='Fuel' {...register('fuel', { required: true })} />
                    <input type="number" id='price' name='price' placeholder='Price per day' {...register('price', { required: true })} />
                    <input type="number" id='kms' name='kms' placeholder='Kms' {...register('kms', { required: true })} />
                    <input type="date" id='date' name='date' {...register('date', { required: true })} />
                    <input type="submit" value="Add" />
                    <input type='button' value='❌' onClick={() => setIsAddingCar(false)} />
                </form>
            )}
            {cars && cars.map((car, index) => (
                <Car key={index} car={car} isEdited={handleEdit} isDeleted={handleDelete} />
            ))}
        </div>
    )
}

export default Profile