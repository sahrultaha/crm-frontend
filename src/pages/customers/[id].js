import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Show = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Customer Details
                </h2>
            }>

            <Head>
                <title>Customer Details</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            Customer with id {id} was created.
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Show
