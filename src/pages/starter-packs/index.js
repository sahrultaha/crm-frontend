import { useRouter } from 'next/router'
import AppLayout from '@/components/Layouts/AppLayout'
import MainBody from '@/components/MainBody'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { Pagination } from '@mui/material'
import PackNav from '@/components/forms/packs/PackNav'

const PackTable = ({ isLoading, items }) => {
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
        <table className="border-collapse table-auto w-full text-sm">
            <thead>
                <tr>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        id
                    </th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        msisdn
                    </th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        imsi
                    </th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        plan
                    </th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Activation Date
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
                {items.map(item => (
                    <tr key={item.id}>
                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                            {item.id}
                        </td>
                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                            {item.number.number}
                        </td>
                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                            {item.imsi.imsi}
                        </td>
                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                            {item.product.name}
                        </td>
                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                            {item.installation_date}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const Dashboard = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [meta, setMeta] = useState({ current_page: 1, last_page: 1 })
    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)

    const pageHandler = i => {
        console.log(arguments) // outputs the arguments to the console
        setPage(i)
    }

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
            .get(makePaginationUrl({ url: 'api/packs', page: page }))
            .then(resp => {
                setItems(resp.data.data)
                setMeta(resp.data.meta)
                console.log(resp.data.meta)
            })
            .catch(e => {
                console.error('error fetching data', e)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [router.isReady, page])

    const pages = []

    return (
        <div>
            <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25 mb-5">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
                <div className="relative rounded-xl overflow-auto">
                    <div className="shadow-sm overflow-hidden my-8">
                        <PackTable
                            isLoading={loading}
                            items={items}
                            className="border-collapse table-auto w-full text-sm"
                            tdClassName="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"></PackTable>
                    </div>
                </div>
            </div>
            <Pagination
                page={meta.current_page}
                defaultPage={meta.current_page}
                count={meta.last_page}
                onChange={(e, page) => pageHandler(page)}></Pagination>
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
                <PackNav></PackNav>
                <div className="flex"></div>
                <Dashboard></Dashboard>
            </MainBody>
        </AppLayout>
    )
}

export default Index
