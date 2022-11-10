import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useState } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import * as React from 'react'
import AddressInputs from '@/components/forms/AddressInputs'
import IcCheckingInputs from '@/components/forms/IcCheckingInputs'
import AppLayout from '@/components/Layouts/AppLayout'
import MainBody from '@/components/MainBody'
import Head from 'next/head'

const Create = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [existingCustomer, setExistingCustomer] = useState(null)
    const [icDetails, setIcDetails] = useState(null)
    const [countryId, setCountryId] = useState(1)
    const [customerTitleId, setCustomerTitleId] = useState('')
    const [accountCategoryId, setAccountCategoryId] = useState(1)
    const [birthDate, setBirthDate] = useState('')
    const [address, setAddress] = useState(null)

    const [icFront, setIcFront] = useState('')
    const [icBack, setIcBack] = useState('')
    const [errors, setErrors] = useState([])

    const onExistingCustomerHandler = val => setExistingCustomer(val)
    const onIcDetailsChangeHandler = val => setIcDetails(val)
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

    const submitForm = async event => {
        event.preventDefault()

        // TODO: validation
        if (icFront === '' || icFront === null) {
            alert('No ic front provided')
        }

        if (icBack === '' || icBack === null) {
            alert('No ic back provided')
        }

        const data = {
            name: name,
            email: email === '' ? null : email,
            mobile_number: mobileNumber === '' ? null : mobileNumber,
            country_id: countryId,
            customer_title_id: customerTitleId === '' ? null : customerTitleId,
            account_category_id: accountCategoryId,
            birth_date: birthDate,
        }

        if (icDetails !== null) {
            data = {
                ...data,
                ic_number: icDetails.icNumber ?? '',
                ic_type_id: icDetails.icTypeId ?? '',
                ic_color_id: icDetails.icColorId ?? '',
                ic_expiry_date: icDetails.icExpiryDate ?? '',
            }
        }

        if (address !== null) {
            data = {
                ...data,
                village: address.village,
                district: address.district,
                mukim: address.mukim,
                postalcode: address.postalCode,
                house_number: address.houseNumber,
                simpang: address.simpang,
                street: address.street,
                building_name: address.buildingName,
                block: address.block,
                floor: address.floor,
                unit: address.unit,
            }
        }

        await axios
            .post('/api/customers', data)
            .then(async res => {
                const id = res.data.id

                const headers = {
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                }

                const icFrontFormData = new FormData()
                icFrontFormData.append('file', icFront)
                icFrontFormData.append('relation_id', id)
                icFrontFormData.append('relation_type_id', 1)
                icFrontFormData.append('file_category_id', 1)

                const icBackFormData = new FormData()
                icBackFormData.append('file', icBack)
                icBackFormData.append('relation_id', id)
                icBackFormData.append('relation_type_id', 1)
                icBackFormData.append('file_category_id', 1)

                try {
                    const responseIcFront = await axios.post(
                        '/api/files',
                        icFrontFormData,
                        headers,
                    )
                    const responseIcBack = await axios.post(
                        '/api/files',
                        icBackFormData,
                        headers,
                    )

                    console.log('upload ok')
                    console.log(responseIcFront)
                    console.log(responseIcBack)

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

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Customer
                </h2>
            }>
            <Head>
                <title>Create Customer</title>
            </Head>
            <MainBody>
                <form className='mx-auto max-w-screen-sm' onSubmit={submitForm}>
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
                        onIcDetailsChange={onIcDetailsChangeHandler}
                        onCustomerChange={onExistingCustomerHandler}
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
                        onAddressChange={onAddressChangeHandler}
                        errors={errors}
                    />

                    <div className="mt-4">
                        <Label htmlFor="icFront">Ic Front</Label>

                        <Input
                            id="icFront"
                            type="file"
                            className="block mt-1 w-full"
                            required
                            onChange={onIcFrontChangeHandler}
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="icBack">Ic Back</Label>

                        <Input
                            id="icBack"
                            type="file"
                            className="block mt-1 w-full"
                            required
                            onChange={onIcBackChangeHandler}
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ml-4">Create</Button>
                    </div>
                </form>
            </MainBody>
        </AppLayout>
    )
}

export default Create
