import { useForm } from "react-hook-form";
import { useUser } from "./context/userContext";
import toast from "react-hot-toast";

function AddAnnonce() {

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm()

    const { jwt } = useUser()


    const onSubmit = async (data, e) => {
        e.preventDefault()

        console.log(data)

        const formData = new FormData()

        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('image_url', data.image_url)

        try {
            const response = await fetch('http://localhost:5000/create_annonce', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    image_url: data.image_url
                })
            })

            if (response.status === 200) {
                toast.success('Annonce created successfully')
            } else {
                toast.error('An error occurred. Please try again later.')
            }
        } catch (err) {
            toast.error('An error occurred. Please try again later.')
            console.log(err)
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" id="title" name="title" {...register("title", { required: true })} /><br />
                <textarea id="description" name="description" {...register('description', { required: true })} ></textarea><br />
                <input type="number" id="price" name="price" {...register('price', { required: true })} /><br />
                <input type="text" id="image_url" name="image_url" {...register('image_url', { required: true })} />
                <input type="submit" value={"send"} />
            </form>
        </div>
    )
}

export default AddAnnonce;