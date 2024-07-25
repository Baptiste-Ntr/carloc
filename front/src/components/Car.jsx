import toast from "react-hot-toast"
import { useState } from "react"

/* eslint-disable react/prop-types */
const Car = ({ car, jwt }) => {


    const formatDateForInput = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    const date = formatDateForInput(car.DATE)

    const [isCarEdit, setIsCarEdit] = useState(false)

    const [carData, setCarData] = useState({
        title: car.TITLE,
        power: car.POWER,
        fuel: car.FUEL,
        price: car.PRICE,
        kms: car.KMS,
        date: date,
        updatedAt: null
    })

    console.log(car)

    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost:5000/cars', {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ carId: car.ID })
            })

            if (response.status === 200) {
                console.log('Car deleted successfully')
                toast.success('Car deleted successfully')
            } else {
                console.error('An error occurred. Please try again later.')
                toast.error('An error occurred. Please try again later.')
            }

        } catch (err) {
            console.log(err)
        }
    }

    const handleEdit = async () => {

        try {
            const response = await fetch('http://localhost:5000/cars', {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: carData.title, power: carData.power, fuel: carData.fuel, price: carData.price, kms: carData.kms, date: carData.date, carId: car.ID })
            })

            if (response.status === 200) {
                console.log('Car edited successfully')
                toast.success('Car edited successfully')
                setIsCarEdit(!isCarEdit)
            } else {
                console.error('An error occurred. Please try again later.')
                toast.error('An error occurred. Please try again later.')
            }

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            <section>

            </section>
            {!isCarEdit ? (
                <>
                    <div>
                        <h1>{car.TITLE}</h1>
                        <p>{car.POWER} ch.</p>
                        <p>{car.FUEL}</p>
                        <p>{car.PRICE}€/jour</p>
                        <p>{car.KMS} kms</p>
                        <p>Disponible le {date}</p>
                    </div>
                    <div>
                        <input type="button" value="Modifier 📝" onClick={() => { setIsCarEdit(!isCarEdit) }} />
                        <input type='button' value={"Supprimer ❌"} onClick={handleDelete} />
                    </div>
                </>
            ) : (
                <div>
                    <input type="text" name="title" placeholder="Nom" value={carData.title} onChange={(e) => setCarData({ ...carData, title: e.target.value })} />
                    <input type="text" name="power" placeholder="Puissance" value={carData.power} onChange={(e) => { setCarData({ ...carData, power: e.target.value }) }} />
                    <input type="text" name="fuel" placeholder="Fuel" value={carData.fuel} onChange={(e) => { setCarData({ ...carData, fuel: e.target.value }) }} />
                    <input type="text" name="price" placeholder="Prix /jours" value={carData.price} onChange={(e) => { setCarData({ ...carData, price: e.target.value }) }} />
                    <input type="text" name="kms" placeholder="Kilomètres" value={carData.kms} onChange={(e) => { setCarData({ ...carData, kms: e.target.value }) }} />
                    <input type="date" name='date' value={carData.date} onChange={(e) => { setCarData({ ...carData, date: e.target.value }) }} />
                    <input type="submit" value="Valider" onClick={handleEdit} />
                    <input type="button" value="❌" onClick={() => { setIsCarEdit(!isCarEdit) }} />
                </div >
            )}
        </>
    )
}

export default Car;