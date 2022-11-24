import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Button from '@/components/Button'
import axios from '@/lib/axios'
import React, { useState, useEffect } from 'react'
import SubscriptionList from '@/components/lists/SubscriptionList'

const Show = () => {
    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState(null)
    const [icUrls, setIcUrls] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [icColor, setIcColor] = useState('')
    const [icType, setIcType] = useState('')

    const [district, setDistrict] = useState('-----')
    const [mukim, setMukim] = useState('-----')
    const [village, setVillage] = useState({ id: '', 'name': '' })
    const [postalCode, setPostalCode] = useState('')
    const [houseNumber, setHouseNumber] = useState('')
    const [simpang, setSimpang] = useState('')
    const [street, setStreet] = useState('')
    const [buildingName, setBuildingName] = useState('')
    const [block, setBlock] = useState('')
    const [floor, setFloor] = useState('')
    const [unit, setUnit] = useState('')
    const [district_id, setDistrictId] = useState('')
    const [mukim_id, setMukimId] = useState('')
    const [village_id, setVillageId] = useState('')
    const [postal_code_id, setPostalCodeId] = useState('')
    const [address_id, setAddressID] = useState('')
    const [country, setCountry] = useState('')
    function gotoUpdate() {
        router.push(`/customers/update?id=${id}`)
    }

    function delCustomer() {
        axios
            .delete(`/api/customers/${id}`)
            .then(response => {
                const id = response.data.id
                // console.log(response)
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
        axios(`/api/customers/${CustomerId}`)
            .then(res => {
                console.log(res.data)
                setData(res.data)
                setIcColor(res.data['ic_color']['name'] ?? '')
                setIcType(res.data['ic_type']['name'] ?? '')
                setCountry(res.data['country']['name'] ?? '')
                console.log(res.data['address'][0]['address']['building_name'])

                if ((res.data['address']).length > 0) {
                    setHouseNumber(res.data['address'][0]['address']['house_number'])
                    setSimpang(res.data['address'][0]['address']['simpang'])
                    setStreet(res.data['address'][0]['address']['street'])
                    setBuildingName(res.data['address'][0]['address']['building_name'])
                    setBlock(res.data['address'][0]['address']['block'])
                    setFloor(res.data['address'][0]['address']['floor'])
                    setUnit(res.data['address'][0]['address']['unit'])
                    setMukim(res.data['address'][0]['address']['mukim']['name'])
                    setDistrict(res.data['address'][0]['address']['district']['name'])
                    setPostalCode(res.data['address'][0]['address']['postalcode']['name'])
                    setVillage({
                        'id': res.data['address'][0]['address']['village']['id'],
                        'name': res.data['address'][0]['address']['village']['name']
                    })

                }

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
    // console.log("Housenumber not empty string?",houseNumber !== '',"housenumber is not null",houseNumber !== null )
    // console.log("houseNumber",typeof houseNumber)
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
                            Account Category: {data.account_category.name}
                        </div>

                        <div className="p-6 bg-white border-b border-gray-200">
                            Date of Birth: {data.birth_date}
                        </div>

                        <div className="p-6 bg-white border-b border-gray-200">
                            IC Number : {data.ic_number} <br />
                            IC Type : {icType}
                            <br />
                            IC Color : {icColor}
                            <br />
                            Expired : {data.ic_expiry_date ?? ''} <br />
                        </div>

                        <div className="p-6 bg-white border-b border-gray-200">
                            Phone Number :+{data.country_code} {data.mobile_number}
                        </div>
                        <div className="p-6 bg-white border-b border-gray-200">
                            Email : {data.email}
                        </div>
                        <div className="p-6 bg-white border-b border-gray-200">
                            Country : {country}
                        </div>

                        <div className="p-6 bg-white border-b border-gray-200">
                            Address <br />
                            {houseNumber !== null ? `${houseNumber},` : ``} {floor !== null ? `${floor},` : ``} {block !== null ? `${block},` : ``} <br />
                            {buildingName !== null ? `${buildingName},` : ``} {simpang !== null ? `${simpang},` : ``} {street !== null ? `${street},` : ``} <br />
                            {village.name !== '' || village.name !== null ? `${village.name},` : ``}<br />
                            {postalCode !== '' || postalCode !== null ? `${postalCode},` : ``}<br />
                            {district !== '-----' || district !== null ? `${district},` : ``} <br />


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
