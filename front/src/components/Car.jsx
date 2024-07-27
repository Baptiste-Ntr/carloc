/* eslint-disable react/prop-types */
import toast from "react-hot-toast"
import { fetchData } from "../utils/fetchData"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const Car = ({ car, isDeleted, isEdited }) => {

    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: car.TITLE,
            power: car.POWER,
            fuel: car.FUEL,
            price: car.PRICE,
            kms: car.KMS,
            date: car.DATE,
        }
    })

    const handleEdit = async (data) => {
        const updatedData = {
            ...data,
            idUser: car.ID_USER,
            updatedAt: new Date('yyyy-MM-dd HH:mm:ss')
        }
        try {
            const response = await fetchData(`http://localhost:5000/cars/${car.ID}`, 'PUT', { 'Content-Type': 'application/json', }, JSON.stringify(updatedData))
            if (response.status === 200) {
                toast.success('Car edited')
                setIsEditing(false)
                isEdited(true)
                console.log('Car edited:', response.data)
            } else {
                console.log('Error editing car:', response.message)
                toast.error('Error editing car')
                isEdited(false)
            }
        } catch (err) {
            console.log('Error editing car:', err)
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetchData(`http://localhost:5000/cars/${car.ID}`, 'DELETE', { 'Content-Type': 'application/json', })
            if (response.status === 200) {
                toast.success('Car deleted')
                isDeleted(true)
                setIsDeleting(false)
                console.log('Car deleted:', response.data)
            } else {
                console.log('Error deleting car:', response.message)
                toast.error('Error deleting car')
                isDeleted(false)
            }
        } catch (err) {
            console.log('Error deleting car:', err)
        }
    }

    if (isEditing) {
        return (
            <form onSubmit={handleSubmit(handleEdit)}>
                <input type="text" name="title" placeholder={car.TITLE} {...register('title', { required: true })} />
                <input type="text" name="power" placeholder={car.POWER} {...register('power', { required: true })} />
                <input type="text" name="fuel" placeholder={car.FUEL} {...register('fuel', { required: true })} />
                <input type="text" name="price" placeholder={car.PRICE} {...register('price', { required: true })} />
                <input type="text" name="kms" placeholder={car.KMS} {...register('kms', { required: true })} />
                <input type="date" name="date" {...register('date', { required: true })} />
                <input type="submit" value="Save" />
                <input type="button" value="❌" onClick={() => setIsEditing(!isEditing)} />
            </form>
        )
    }

    return (
        <div>
            <h2>{car.TITLE}</h2>
            <p>Power: {car.POWER} hp</p>
            <p>Fuel: {car.FUEL}</p>
            <p>Price per day: {car.PRICE} €</p>
            <p>Kms: {car.KMS}</p>
            <p>Date: {car.DATE}</p>
            <p>Created at: {car.CREATED_AT}</p>
            <p>Updated at: {car.UPDATED_AT}</p>

            <nav>
                <input type="button" value="Edit 🛠️" onClick={() => setIsEditing(!isEditing)} />
                <input type="button" value="Delete ❌" onClick={() => handleDelete()} />
            </nav>
        </div>
    )


}