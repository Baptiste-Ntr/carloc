'use client'

import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter()
    return (
        <div>
            <h1>Profile</h1>
            <input value={'🏠'} type="button" onClick={() => router.push('/')} />
        </div>
    )
}

export default Page