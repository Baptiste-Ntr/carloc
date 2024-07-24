'use client'

import { FormEvent } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const Page = () => {
    const router = useRouter()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            const response = await fetch(`http://localhost:5000/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
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
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <input value={'🏠'} type="button" onClick={() => router.push('/')} />
        </div>
    )
}

export default Page