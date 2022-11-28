import { useRouter } from 'next/router'
import AppLayout from '@/components/Layouts/AppLayout'
import MainBody from '@/components/MainBody'
import NavLink from '@/components/NavLink'
import Head from 'next/head'

const Index = () => {
    const router = useRouter()

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    MSISDN
                </h2>
            }>
            <Head>
                <title>MSISDN List</title>
            </Head>
            <MainBody>
                <div className="flex">
                    <div className="mr-4">
                        <NavLink
                            href="/msisdn"
                            active={router.pathname === '/msisdn'}>
                            MSISDN
                        </NavLink>
                    </div>
                    <div className="mr-4">
                        <NavLink
                            href="/msisdn/create"
                            active={router.pathname === '/msisdn/create'}>
                            Create New MSISDN
                        </NavLink>
                    </div>
                </div>
            </MainBody>
        </AppLayout>
    )
}

export default Index
