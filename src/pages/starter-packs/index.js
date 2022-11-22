import { useRouter } from 'next/router'
import AppLayout from '@/components/Layouts/AppLayout'
import MainBody from '@/components/MainBody'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'

const PackTable = ({ isLoading, items, ...props }) => {
    if (isLoading) {
        return <div>Loading....</div>
    }
    if (!Array.isArray(items)) {
        return <div> ERRROR items is not in array</div>
    }
    if (items.length === 0) {
        return <div>data is empty</div>
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>msisdn</th>
                    <th>imsi</th>
                    <th>plan</th>
                    <th>Activation Date</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.number.number}</td>
                        <td>{item.imsi.imsi}</td>
                        <td>{item.product.name}</td>
                        <td>{item.installation_date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const Dashboard = () => {
    const router = useRouter()
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])

    const makePaginationUrl = ({ url, page, limit, sort }) => {
        page = page || 1
        limit = limit || 10
        sort = sort || 'desc'
        let queryParams = new URLSearchParams(
            `page=${page}&limit=${limit}&sort=${sort}`,
        )

        return url + `?${queryParams.toString()}`
    }
    useEffect(() => {
        if (!router.isReady) return
        axios
            .get(makePaginationUrl({ url: 'api/packs' }))
            .then(resp => {
                const data = resp.data.data
                setItems(data)
            })
            .catch(e => {
                console.error('error fetching data', e)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [router.isReady])

    return (
        <div>
            <PackTable isLoading={loading} items={items}></PackTable>
        </div>
    )
}

const Index = () => {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Starter Pack
                </h2>
            }>
            <Head>
                <title>Starter Pack</title>
            </Head>
            <MainBody>
                <div className="flex"></div>
                <Dashboard></Dashboard>
            </MainBody>
        </AppLayout>
    )
}

export default Index
