import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from '@/lib/axios'
import React, { useState, setEffect, useEffect } from 'react'

const Show = () => {
    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState([])
    // const getData = async () => {

    // };
    useEffect(() => {
        if (!router.isReady) return
        const { id: CustomerId } = router.query
        axios
            .get(`/api/customers/${CustomerId}`)
            .then(response => {
                console.log(response.data)
                // console.log(id)
                setData(response.data)
            })
            .catch(error => {
                // console.log(error)
            })
    }, [router.isReady])
    if (isNaN(data.id))
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
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Show
