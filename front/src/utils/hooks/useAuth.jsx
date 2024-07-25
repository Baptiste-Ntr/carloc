import { useEffect, useState } from 'react'
import verifyJWT from '../verifyJWT'

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            const result = await verifyJWT()
            setIsAuthenticated(result)
        }

        checkAuth()
    }, [])

    return isAuthenticated
}

export default useAuth