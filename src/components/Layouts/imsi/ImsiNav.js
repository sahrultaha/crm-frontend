import NavLink from '@/components/NavLink'
import { useRouter } from 'next/router'

const ImsiNav = () => {
    const router = useRouter()
    return (
        <div className="flex mb-10">
            <div className="mr-4">
                <NavLink href="/imsi" active={router.pathname === '/imsi'}>
                    Imsi
                </NavLink>
            </div>
            <div className="mr-4">
                <NavLink
                    href="/imsi/create"
                    active={router.pathname === '/imsi/create'}>
                    Create
                </NavLink>
            </div>
            <div>
                <NavLink
                    href="/imsi/upload"
                    active={router.pathname === '/imsi/upload'}>
                    Upload
                </NavLink>
            </div>
        </div>
    )
}

export default ImsiNav
