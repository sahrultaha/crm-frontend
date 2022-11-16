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
    const [showModal, setShowModal] = useState(false);

    function gotoUpdate() {
        router.push(`/customers/update?id=${id}`)
    }

    function delCustomer() {
        axios
            .delete(`/api/customers/${id}`)
            .then(response => {
                const id = response.data.id
                console.log(response)
                router.push('/customers')
            })
            .catch(error => {
                console.log('error!')
                if (error.response) {
                    // console.log(error.response.status)
                    // console.log(error.response.data)
                    // console.log(error.response.headers)
                    setErrors(error.response.data.errors)
                } else if (error.request) {
                    console.log(error.request)
                } else {
                    console.log('Error message ', error.message)
                }
                console.log(error.config)
            })

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
                                <Button className="ml-1" onClick={gotoUpdate}>Edit</Button>
                                <Button className="ml-2" onClick={() => setShowModal(true)}>Delete</Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="font-semibold text-xl text-gray-800 leading-tight">
                                        Delete Customer
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        Are you sure to delete customer ({id})
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <Button
                                        className="ml-2"
                                        onClick={() => setShowModal(false)}>
                                        Close
                                    </Button>
                                    <Button
                                        className="ml-2"
                                        onClick={delCustomer}>
                                        Yes
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </AppLayout>
    )
}

export default Show
