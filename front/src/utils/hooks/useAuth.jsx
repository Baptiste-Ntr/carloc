import { useEffect, useState } from 'react'
import { fetchData } from '../fetchData'

const useAuth = () => {
    const [auth, setAuth] = useState({
        isAuthenticated: null,
        id: null
    })

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetchData(`http://localhost:5000/get_jwt`, 'GET', { 'Content-Type': 'application/json' })
                if (response.status === 200) {
                    setAuth({
                        isAuthenticated: true,
                        id: response.data.user.id
                    })
                } else {
                    setAuth({
                        isAuthenticated: false,
                        id: null
                    })
                }
            } catch (err) {
                console.log('Error useAuth before fetchData', err)
                setAuth({
                    isAuthenticated: false,
                    id: null
                })
            }
        }

        checkAuth()
    }, [])

    return auth
}

export default useAuth