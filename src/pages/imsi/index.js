import { useRouter } from 'next/router'
import AppLayout from '@/components/Layouts/AppLayout'
import MainBody from '@/components/MainBody'
import NavLink from '@/components/NavLink'
import Head from 'next/head'
import ImsiList from '@/components/lists/ImsiList'
import ImsiNav from '@/components/Layouts/imsi/ImsiNav'

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
                <ImsiNav></ImsiNav>
                <ImsiList />
            </MainBody>
        </AppLayout>
    )
}

export default Index
