import { useRouter } from 'next/router'
import AppLayout from '@/components/Layouts/AppLayout'
import MainBody from '@/components/MainBody'
import NavLink from '@/components/NavLink'
import Head from 'next/head'
import SubscriptionList from '@/components/lists/SubscriptionList'

const Index = () => {
    const router = useRouter()

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Subscriptions
                </h2>
            }>
            <Head>
                <title>Subscriptions List</title>
            </Head>
            <MainBody>
                <div className="flex">
                    <div className="mr-4">
                        <NavLink
                            href="/subscriptions"
                            active={router.pathname === '/subscriptions'}>
                            Subscriptions
                        </NavLink>
                    </div>
                </div>

                <SubscriptionList/>
            </MainBody>
        </AppLayout>
    )
}

export default Index
