import { useRouter } from 'next/router'
import AppLayout from '@/components/Layouts/AppLayout'
import MainBody from '@/components/MainBody'
import NavLink from '@/components/NavLink'
import Head from 'next/head'
import ImsiList from '@/components/lists/ImsiList'

const Index = () => {
    const router = useRouter()

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    IMSI
                </h2>
            }>
            <Head>
                <title>Imsi List</title>
            </Head>
            <MainBody>
                <div className="flex">
                    <div className="mr-4">
                        <NavLink
                            href="/imsi"
                            active={router.pathname === '/imsi'}>
                            IMSI
                        </NavLink>
                    </div>
                    <div className="mr-4">
                        <NavLink
                            href="/imsi/create"
                            active={router.pathname === '/imsi/create'}>
                            Create New IMSI
                        </NavLink>
                    </div>
                    <div>
                        <NavLink
                            href="/imsi/bulk-upload"
                            active={router.pathname === '/imsi/bulk-upload'}>
                            Bulk Upload
                        </NavLink>
                    </div>
                </div>

                <ImsiList/>
            </MainBody>
        </AppLayout>
    )
}

export default Index
