import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { redirect, useNavigate } from "react-router-dom";
import { useUser } from "../components/context/userContext";
import { isExpired, decodeToken } from 'react-jwt'

const Profile = () => {

    const navigate = useNavigate()
    const { email, jwt } = useUser()

    const [cookies, setCookies] = useState()

    const [profileInfo, setProfileInfo] = useState({
        adresse: '',
        avatarUrl: '',
        email: '',
        name: '',
        pays: '',
        telephone: '',
        username: ''
    })

    const getJWTToken = () => {
        if (!decodeToken(jwt) || !jwt || jwt === 'undefined' || jwt === 'null' || jwt === '' || jwt === null || jwt === undefined) {
            toast.error('You are not logged in. Please log in to view your profile.')
            navigate('/login')
        }

        if (isExpired(jwt)) {
            toast.error('Login expired. Please login again.')
            navigate('/login')
        }
    }

    const getProfile = async () => {
        try {
            const response = await fetch(`http://localhost:5000/profile`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            if (response.status === 200) {
                const profileData = await response.json()
                console.log(profileData)
                setProfileInfo({
                    adresse: profileData.result[0].ADRESSE,
                    avatarUrl: profileData.result[0].AVATAR_URL,
                    email: profileData.result[0].EMAIL,
                    name: profileData.result[0].NAME,
                    pays: profileData.result[0].PAYS,
                    telephone: profileData.result[0].TELEPHONE,
                    username: profileData.result[0].USERNAME
                })
            } else if (response.status === 500) {
                toast.error('An error occurred. Please try again later.')
                navigate('/')
            } else {
                toast.error('An error occurred. Please try again later.')
                console.error('An error occurred. Please try again later.')
            }
        } catch (err) {
            toast.error('An error occurend while trying to fetch the profile data.')
            console.error(err)
        }
    }

    useEffect(() => {
        getJWTToken()
        getProfile()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            username: formData.get("username"),
            pays: formData.get("pays"),
            adresse: formData.get("adresse"),
            telephone: formData.get("telephone"),
        }

        const accessToken = cookies.accessToken
        if (!accessToken) {
            toast.error('You are not logged in. Please log in to update your profile.')
            navigate('/')
        }

        try {
            const response = await fetch(`http://localhost:5000/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (response.status === 200) {
                toast.success('Profile updated successfully')
                navigate('/profile')
            } else {
                toast.error('An error occurred. Please try again later.')
                console.error('An error occurred. Please try again later.')
            }
        } catch (err) {
            console.log(err)
        }


    }


    return (
        <div>
            <input value={'🏠'} type="button" onClick={() => navigate('/')} />
            <h1>Profile</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" name="email" value={profileInfo.email} onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })} />
                <input type="text" placeholder="Name" name="name" value={profileInfo.name} onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })} />
                <input type="text" placeholder="Username" name="username" value={profileInfo.username} onChange={(e) => setProfileInfo({ ...profileInfo, username: e.target.value })} />
                <input type="text" placeholder="Country" name="pays" value={profileInfo.pays} onChange={(e) => setProfileInfo({ ...profileInfo, pays: e.target.value })} />
                <input type="text" placeholder="Address" name="adresse" value={profileInfo.adresse} onChange={(e) => setProfileInfo({ ...profileInfo, adresse: e.target.value })} />
                <input type="tel" placeholder="Phone" name="telephone" value={profileInfo.telephone} onChange={(e) => setProfileInfo({ ...profileInfo, telephone: e.target.value })} />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
}

export default Profile;