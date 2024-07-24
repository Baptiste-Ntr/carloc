'use client'

import { FormEvent } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const Page = () => {

    const router = useRouter()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const name = formData.get("name") as string
        const username = formData.get("username") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const confirmEmail = formData.get("confirmEmail") as string
        const confirmPassword = formData.get("confirmPassword") as string
        const pays = formData.get("pays") as string
        const adresse = formData.get("adresse") as string
        const telephone = formData.get("telephone") as string

        console.log({ name, username, email, password, confirmEmail, confirmPassword, pays, adresse, telephone })

        try {
            const response = await fetch(`http://localhost:5000/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, name, username, confirmEmail, confirmPassword, pays, adresse, telephone })
            })

            if (response.ok) {
                router.push('/profile')
            } else if (response.status === 401) {
                toast.error('Invalid credentials')
            } else {
                toast.error('An error occurred. Please try again later.')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} >
                <input type="text" placeholder="Name" name="name" required />
                <input type="text" placeholder="Username" name="username" required />
                <input type="email" placeholder="Email" name="email" required />
                <input type="email" placeholder="Confirm Email" name="confirmEmail" required />
                <input type="password" placeholder="Password" name="password" required />
                <input type="password" placeholder="Confirm Password" name="confirmPassword" required />
                <input type="text" placeholder="Pays" name="pays" required />
                <input type="text" placeholder="Adresse" name="adresse" required />
                <input type="text" placeholder="Telephone" name="telephone" required />
                <button type="submit">Register</button>
            </form>
            <input value={'🏠'} type="button" onClick={() => router.push('/')} />
        </div>
    )
}

export default Page