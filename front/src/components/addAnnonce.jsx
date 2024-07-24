function AddAnnonce() {
    return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" id="title" name="title" required/><br/>
            <textarea id="description" name="description" required></textarea><br/>
            <input type="file" id="image" name="image" required/><br/>
            <input type="number" id="price" name="price" required/><br/>
            <input type="text" id="vehicule" name="vehicule" required/><br/>
            <input type="number" id="puissance" name="puissance" required/><br/>
            <input type="text" id="carburant" name="carburant" required/><br/>
            <input type="text" id="localisation" name="localisation" required/><br/>
            <input type="text" id="boite_vitesse" name="boite_vitesse" required/><br/>
        </form>
    </div>
    )
}

export default AddAnnonce;