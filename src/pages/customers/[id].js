import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Button from '@/components/Button'
import axios from '@/lib/axios'
import React, { useState, useEffect } from 'react'

const Show = () => {
    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState(null)
    const [icUrls, setIcUrls] = useState([])

    function handleClick() {
        router.push(`/customers/update?id=${id}`)
      }

    useEffect(() => {
        if (!router.isReady) return
        const { id: CustomerId } = router.query
        axios
            .get(`/api/customers/${CustomerId}`)
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.log('Error fetching customer details...', error)
            })
    }, [router.isReady])

    useEffect(async () => {
        if (!data) {
            console.log('no data, abort fetching images...')
            return
        }

        try {
            console.log(data)
            for (const fileId of data.file_ids) {
                const resp = await axios.get(`/api/files/${fileId}`)
                setIcUrls(prevState => [
                    ...prevState,
                    {
                        id: fileId,
                        url: resp.data.url,
                    },
                ])
            }
        } catch (e) {
            console.log('Error getting file urls...', e)
        }
    }, [data])

    if (data === null || isNaN(data?.id))
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
                                Invalid Customer ID
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        )

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
                            Customer with id {id} was created on (
                            {data.created_at}).
                        </div>

                        <div className="p-6 bg-white border-b border-gray-200">
                            Customer Title ID : {data.customer_title_id}
                            <br />
                            Customer Name : {data.name}
                        </div>

                        <div className="p-6 bg-white border-b border-gray-200">
                            Date of Birth: {data.birth_date}
                        </div>

                        <div className="p-6 bg-white border-b border-gray-200">
                            IC Number : {data.ic_number} <br />
                            IC Type ID : {data.ic_type_id}
                            <br />
                            IC Color ID : {data.ic_color_id}
                            <br />
                            Expired : {data.ic_expiry_date} <br />
                        </div>

                        <div className="p-6 bg-white border-b border-gray-200">
                            Phone Number : {data.mobile_number}
                        </div>
                        <div className="p-6 bg-white border-b border-gray-200">
                            Email : {data.email}
                        </div>
                        <div className="p-6 bg-white border-b border-gray-200">
                            Country ID : {data.country_id}
                        </div>
                        <div className="p-6 bg-white border-b border-gray-200">
                            {icUrls.map(obj => (
                                <img
                                    key={obj.id}
                                    src={obj.url}
                                    className="inline-block w-20 h-20 mr-4"
                                />
                            ))}
                        </div>
                        <div className="p-6 bg-white border-b border-gray-200">
                        <div className="flex items-center justify-end mt-4">
                        <Button className="ml-4" onClick={handleClick}>Edit</Button>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Show
