import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import * as React from 'react'
import AddressInputs from '@/components/forms/AddressInputs'
import IcCheckingInputs from '@/components/forms/IcCheckingInputs'

import AppLayout from '@/components/Layouts/AppLayout'
import MainBody from '@/components/MainBody'
import Head from 'next/head'

const Update = () => {
    const router = useRouter()
    const [data, setData] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [existingCustomer, setExistingCustomer] = useState(null)

    const [IcNumber, setIcNumber] = useState('')
    const [IcTypeId, setIcTypeId] = useState('')
    const [IcColorId, setIcColorId] = useState('')
    const [IcExpiryDate, setIcExpiryDate] = useState('')
    const [updateModeValue, setUpdateModeValue] = useState(false)


    const [OriIcColorId, setOriIcColorId] = useState('')
    const [OriIcExpiryDate, setOriIcExpiryDate] = useState('')
    const [IcNumberOrig, setIcNumberOrig] = useState('')
    const [IcTypeIdOrig, setIcTypeIdOrig] = useState('')


    const [countryId, setCountryId] = useState(1)
    const [customerTitleId, setCustomerTitleId] = useState('')
    const [accountCategoryId, setAccountCategoryId] = useState(1)
    const [birthDate, setBirthDate] = useState('')
    const [address, setAddress] = useState(null)

    const [district, setDistrict] = useState('-----')
    const [mukim, setMukim] = useState('-----')
    const [village, setVillage] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [houseNumber, setHouseNumber] = useState('')
    const [simpang, setSimpang] = useState('')
    const [street, setStreet] = useState('')
    const [buildingName, setBuildingName] = useState('')
    const [block, setBlock] = useState('')
    const [floor, setFloor] = useState('')
    const [unit, setUnit] = useState('')

    const [icFront, setIcFront] = useState('')
    const [icBack, setIcBack] = useState('')
    const [errors, setErrors] = useState([])
    const [icUrls, setIcUrls] = useState([])

    const [icFrontID, seticFrontID] = useState('')
    const [icBackID, seticBackID] = useState('')

    const onExistingCustomerHandler = val => {
        console.log(IcNumber, IcNumberOrig)
        console.log(IcTypeId, IcTypeIdOrig)
        setUpdateModeValue(true)
        setExistingCustomer(val)
    }

    const onNameChangeHandler = event => setName(event.target.value)
    const onEmailChangeHandler = event => setEmail(event.target.value.trim())
    const onMobileNumberChangeHandler = event =>
        setMobileNumber(event.target.value.trim())
    const onCountryIdChangeHandler = event => setCountryId(event.target.value)
    const onCustomerTitleIdChangeHandler = event =>
        setCustomerTitleId(event.target.value)
    const onAccountCategoryIdChangeHandler = event =>
        setAccountCategoryId(event.target.value)
    const onBirthDateChangeHandler = event =>
        setBirthDate(event.target.value.trim())
    const onAddressChangeHandler = val => {
        setAddress(val)
    }

    const onIcFrontChangeHandler = event => setIcFront(event.target.files[0])
    const onIcBackChangeHandler = event => setIcBack(event.target.files[0])


    useEffect(() => {
        if (!router.isReady) return
        const { id: CustomerId } = router.query
        // console.log("customer id : " + CustomerId)

        axios(`/api/customers/get?id=${CustomerId}`)
            .then(res => {
                // console.log(res.data)
                setData(res.data)
                setName(res.data['name'])
                setEmail(res.data['email'] ?? "")
                setMobileNumber(res.data['mobile_number'] ?? "")

                setIcNumber(res.data['ic_number'])
                setIcTypeId(res.data['ic_type_id'])
                setIcColorId(res.data['ic_color_id'] ?? "")
                setIcExpiryDate(res.data['ic_expiry_date'])


                setOriIcColorId(res.data['ic_color_id'] ?? "")
                setOriIcExpiryDate(res.data['ic_expiry_date'])

                setIcNumberOrig(res.data['ic_number'])
                setIcTypeIdOrig(res.data['ic_type_id'])



                setCountryId(res.data['country_id'])
                setCustomerTitleId(res.data['customer_title_id'] ?? "")
                setAccountCategoryId(res.data['account_category_id'])
                setBirthDate(res.data['birth_date'])

            })
            .catch(error => {
                // setData(null)
            })
            .finally(() => {

            })
    }, [router.isReady])

    useEffect(async () => {
        if (!data) {
            console.log('no data, abort fetching images...')
            return
        }

        try {
            seticFrontID(data.file_ids[0])
            seticBackID(data.file_ids[1])

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


    const updateForm = async event => {
        event.preventDefault()
        const { id: CustomerId } = router.query

        // TODO: validation
        // if (icFront === '' || icFront === null) {
        //     alert('No ic front provided')
        // }

        // if (icBack === '' || icBack === null) {
        //     alert('No ic back provided')
        // }

        const data = {
            id: CustomerId,
            name: name,
            email: email === '' ? null : email,
            mobile_number: mobileNumber === '' ? null : mobileNumber,
            country_id: countryId,
            customer_title_id: customerTitleId === '' ? null : customerTitleId,
            account_category_id: accountCategoryId,
            birth_date: birthDate,
            ic_number: IcNumber ?? '',
            ic_type_id: IcTypeId ?? '',
            ic_color_id: IcColorId ?? '',
            ic_expiry_date: IcExpiryDate ?? '',
            village: village ?? '',
            district: district ?? '',
            mukim: mukim ?? '',
            postalcode: postalCode ?? '',
            house_number: houseNumber ?? '',
            simpang: simpang ?? '',
            street: street ?? '',
            building_name: buildingName ?? '',
            block: block ?? '',
            floor: floor ?? '',
            unit: unit ?? '',
        }

        await axios
            .put('/api/customers/update', data)
            .then(async res => {
                const id = res.data.id

                const headers = {
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                }
                // console.log("ic front id", icFrontID, " back:", icBackID)
                const icFrontFormData = new FormData()
                icFrontFormData.append('file', icFront)
                icFrontFormData.append('relation_id', id)
                icFrontFormData.append('relation_type_id', 1)
                icFrontFormData.append('file_category_id', 1)
                icFrontFormData.append('file_id', icFrontID)

                icFrontFormData.append('_method', 'PATCH')

                const icBackFormData = new FormData()
                icBackFormData.append('file', icBack)
                icBackFormData.append('relation_id', id)
                icBackFormData.append('relation_type_id', 1)
                icBackFormData.append('file_category_id', 1)
                icBackFormData.append('file_id', icBackID)
                icBackFormData.append('_method', 'PATCH')
                try {

                    if (icFront != "") {
                        // console.log(icFrontFormData, "form data front")
                        const responseIcFront = await axios.post(
                            '/api/files',
                            icFrontFormData,
                            headers,
                            // console.log(icFrontFormData + "testing front")
                        )
                        console.log('upload ok')
                        console.log("Front", responseIcFront)
                    }
                    if (icBack != "") {

                        const responseIcBack = await axios.post(
                            '/api/files',
                            icBackFormData,
                            headers,
                            // console.log(icBackFormData + "testing back")
                        )
                        console.log('upload ok')
                        console.log("Back", responseIcBack)
                    }
                    router.push(`/customers/${id}`)

                } catch (e) {
                    console.error('Failed to upload!')
                    console.log(e)
                }

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

    if (data == null || data == "") {
        return (

            <AppLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Update Customer Details
                    </h2>
                }>
                <Head>
                    <title>Update Customer Details</title>
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
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Update Customer Details
                </h2>
            }>
            <Head>
                <title>Update Customer Details</title>
            </Head>
            <MainBody>
                <form onSubmit={updateForm}>
                    <div>
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            type="text"
                            value={name}
                            className="block mt-1 w-full"
                            onChange={onNameChangeHandler}
                            required
                            pattern="[^\s][a-zA-Z\s]+"
                            autoFocus
                        />

                        <InputError messages={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="email">Email (optional)</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                            className="block mt-1 w-full"
                            onChange={onEmailChangeHandler}
                        />

                        <InputError messages={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="mobileNumber">
                            Mobile Number (optional)
                        </Label>

                        <Input
                            id="mobileNumber"
                            type="text"
                            value={mobileNumber}
                            pattern="[0-9]{7,10}"
                            className="block mt-1 w-full"
                            onChange={onMobileNumberChangeHandler}
                        />

                        <InputError
                            messages={errors.mobile_number}
                            className="mt-2"
                        />
                    </div>

                    <IcCheckingInputs
                        onCustomerChange={onExistingCustomerHandler}
                        icNumber={IcNumber}
                        icTypeId={IcTypeId}
                        icColorId={IcColorId}
                        icExpiryDate={IcExpiryDate}

                        oriIcNumber={IcNumberOrig}
                        oriIcTypeId={IcTypeIdOrig}
                        oriExpiryDate={OriIcExpiryDate}
                        oriIcColorId={OriIcColorId}

                        setIcNumber={setIcNumber}
                        setIcTypeId={setIcTypeId}
                        setIcColorId={setIcColorId}
                        setIcExpiryDate={setIcExpiryDate}
                        updateMode={updateModeValue}

                    />

                    <div className="mt-4">
                        <Label htmlFor="countryId">Country</Label>

                        <select
                            id="countryId"
                            value={countryId}
                            required
                            onChange={onCountryIdChangeHandler}>
                            <option value={1}>Brunei</option>
                            <option value={2}>Malaysia</option>
                        </select>

                        <InputError
                            messages={errors.country_id}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="customerTitleId">
                            Customer Title (optional)
                        </Label>

                        <select
                            id="customerTitleId"
                            value={customerTitleId}
                            onChange={onCustomerTitleIdChangeHandler}>
                            <option>Select One</option>
                            <option value={1}>Mr</option>
                            <option value={2}>Ms</option>
                            <option value={3}>Mrs</option>
                            <option value={4}>Haji</option>
                            <option value={5}>Hajah</option>
                            <option value={6}>Dr</option>
                        </select>

                        <InputError
                            messages={errors.customer_title_id}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="accountCategoryId">
                            Account Category
                        </Label>

                        <select
                            id="accountCategoryId"
                            value={accountCategoryId}
                            required
                            onChange={onAccountCategoryIdChangeHandler}>
                            <option value={1}>Brunei Personal</option>
                            <option value={2}>Foreign Personal</option>
                            <option value={3}>Company</option>
                            <option value={4}>Embassy</option>
                            <option value={5}>Government</option>
                        </select>

                        <InputError
                            messages={errors.account_category_id}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="birthDate">Birth Date</Label>

                        <Input
                            id="birthDate"
                            type="date"
                            value={birthDate}
                            className="block mt-1 w-full"
                            required
                            onChange={onBirthDateChangeHandler}
                        />

                        <InputError
                            messages={errors.birth_date}
                            className="mt-2"
                        />
                    </div>

                    <AddressInputs
                        district={district}
                        mukim={mukim}
                        village={village}
                        postalCode={postalCode}
                        houseNumber={houseNumber}
                        simpang={simpang}
                        street={street}
                        buildingName={buildingName}
                        block={block}
                        floor={floor}
                        unit={unit}
                        setDistrict={setDistrict}
                        setMukim={setMukim}
                        setVillage={setVillage}
                        setPostalCode={setPostalCode}
                        setHouseNumber={setHouseNumber}
                        setSimpang={setSimpang}
                        setStreet={setStreet}
                        setBuildingName={setBuildingName}
                        setBlock={setBlock}
                        setFloor={setFloor}
                        setUnit={setUnit}
                    />

                    <div className="mt-4">
                        <Label htmlFor="icFront">Ic Front</Label>

                        <Input
                            id="icFront"
                            type="file"
                            className="block mt-1 w-full"
                            onChange={onIcFrontChangeHandler}
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="icBack">Ic Back</Label>

                        <Input
                            id="icBack"
                            type="file"
                            className="block mt-1 w-full"
                            onChange={onIcBackChangeHandler}
                        />
                    </div>
                    <div className="p-6 bg-white border-b border-gray-200">
                        {icUrls.map(obj => (
                            <img
                                key={obj.id}
                                src={obj.url}
                                className="inline-block w-40 mr-4"
                            />
                        ))}
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ml-4">Update</Button>
                    </div>
                </form>
            </MainBody>
        </AppLayout>
    )
}

export default Update
