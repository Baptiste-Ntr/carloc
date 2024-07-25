import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function AddAnnonce() {

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm()
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        register('image', { required: false });
    }, [register]);


    const onSubmit = (data) => {
        console.log(data)
    }

    const handleFilesChange = (e) => {
        const files = [...e.target.files];
        // Créer des objets de prévisualisation pour les nouveaux fichiers
        const newFilesPreviews = files.map(file => ({
            ...file,
            preview: URL.createObjectURL(file)
        }));
        // Ajouter les nouveaux fichiers à l'état existant
        setSelectedImages(prevImages => [...prevImages, ...newFilesPreviews]);
        // Mettre à jour l'état du formulaire (si nécessaire)
        setValue('image', [...selectedImages, ...files]);
    };

    useEffect(() => {
        return () => selectedImages.forEach(file => URL.revokeObjectURL(file.preview));
    }, [register])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" id="title" name="title" {...register("title", { required: true })} /><br />
                <textarea id="description" name="description" {...register('description', { required: true })} ></textarea><br />
                <input type="file" id="image" multiple name="image" onChange={handleFilesChange} /><br />
                <input type="number" id="price" name="price" {...register('price', { required: true })} /><br />
                <input type="submit" value={"send"} />
            </form>
            <div>
                {selectedImages.map((file, index) => (
                    <img key={index} src={file.preview} alt="preview" style={{ width: "100px", height: "100px" }} />
                ))}
            </div>
        </div>
    )
}

export default AddAnnonce;