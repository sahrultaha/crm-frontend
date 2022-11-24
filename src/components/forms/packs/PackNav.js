import NavLink from '@/components/NavLink'
import { useRouter } from 'next/router'

const PackNav = () => {
    const router = useRouter()
    return (
        <div className="flex mb-10">
            <div className="mr-4">
                <NavLink
                    href="/starter-packs"
                    active={router.pathname === '/starter-packs'}>
                    Starter Pack
                </NavLink>
            </div>
            <div>
                <NavLink
                    href="/starter-packs/upload"
                    active={router.pathname === '/starter-packs/upload'}>
                    Upload
                </NavLink>
            </div>
        </div>
    )
}

export default PackNav
