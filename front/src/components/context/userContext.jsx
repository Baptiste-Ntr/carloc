import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext)

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
    const [email, setEmail] = useState('')

    return (
        <UserContext.Provider value={{ email, setEmail }}>
            {children}
        </UserContext.Provider>
    )
}