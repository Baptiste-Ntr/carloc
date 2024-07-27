import { useForm } from "react-hook-form";
import { useUser } from "./context/userContext";
import toast from "react-hot-toast";

function AddAnnonce() {

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm()

    const { jwt } = useUser()

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