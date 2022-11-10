import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
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

const Update = () => {
    function handleRoute() {
        router.push('create')
      }


    const [data, setData] = useState(null)

    const [name, setName] = useState('')
    const [custid, setID] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [icNumber, setIcNumber] = useState('')
    const [icTypeId, setIcTypeId] = useState('')
    const [icColorId, setIcColorId] = useState('')
    const [icExpiryDate, setIcExpiryDate] = useState('')
    const [countryId, setCountryId] = useState(1)
    const [customerTitleId, setCustomerTitleId] = useState('')
    const [accountCategoryId, setAccountCategoryId] = useState(1)
    const [birthDate, setBirthDate] = useState('')
    const [icFront, setIcFront] = useState('')
    const [icBack, setIcBack] = useState('')
    const [errors, setErrors] = useState([])
    const [checkIcExist, setIcCheckExist] = useState(null)
    const [icUrls, setIcUrls] = useState([])
    const router = useRouter()
    const { id } = router.query

    const [icTypeIdOrig, setIcTypeIdOrig] = useState('')
    const [icNumberOrig, setIcNumberOrig] = useState('')
    const [imageID, setImageID] = useState([])

    useEffect(() => {
        if (!router.isReady) return
        const { id: CustomerId } = router.query
        console.log("customer id : " + CustomerId)
        
        axios(`/api/customers/get?id=${CustomerId}`)
            .then(res => {
                setData(res.data)
                setName(res.data['name'])
                setEmail(res.data['email'] ?? "")
                setMobileNumber(res.data['mobile_number'] ?? "")
                setIcNumber(res.data['ic_number'])
                setIcTypeId(res.data['ic_type_id'])

                setIcNumberOrig(res.data['ic_number'])
                setIcTypeIdOrig(res.data['ic_type_id'])

                setIcColorId(res.data['ic_color_id'] ?? "")
                setIcExpiryDate(res.data['ic_expiry_date'])
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
            console.log("The data is :" + data)
            console.log('no data, abort fetching images...')
            return
        }
        try {
            console.log("image files:", data.file_ids[0])

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


    const onNameChangeHandler = event => setName(event.target.value)
    const onEmailChangeHandler = event => setEmail(event.target.value.trim())
    const onMobileNumberChangeHandler = event =>
        setMobileNumber(event.target.value.trim())


    const onIcNumberChangeHandler = event => {
        if (icNumberOrig != event.target.value) {
            console.log(icNumberOrig, event.target.value)
            axios
                .get(
                    `/api/customers/search?ic_number=${event.target.value}&ic_type_id=${icTypeId}`,
                )
                .then(res => {
                    if (res.data.length > 0) {
                        setIcCheckExist(res.data[0]['id'])
                    } else {
                        setIcCheckExist(null);
                        setIcNumber(event.target.value)
                    }
                })
                .catch(error => {
                })


            setIcNumber(event.target.value.trim())
        }else{
            setIcNumber(event.target.value.trim())
        }
    }
    const onIcTypeIdChangeHandler = event => {
        if (icTypeIdOrig != event.target.value || icNumberOrig != icNumber) {
            console.log("hello")
            console.log(icTypeIdOrig, event.target.value)
            axios
                .get(
                    `/api/customers/search?ic_number=${icNumber}&ic_type_id=${event.target.value}`,
                )
                .then(res => {
                    if (res.data.length > 0) {
                        setIcCheckExist(res.data[0]['id'])
                        setIcTypeId('')
                        setIcNumber('')
                    } else {
                        setIcCheckExist(null);
                        setIcTypeId(event.target.value)

                    }
                })
                .catch(error => {

                })
            setIcTypeId(event.target.value)
        }else{
            setIcTypeId(event.target.value)
        }
    }
    const onIcColorIdChangeHandler = event => setIcColorId(event.target.value)
    const onIcExpiryDateChangeHandler = event =>
        setIcExpiryDate(event.target.value.trim())
    const onCountryIdChangeHandler = event => setCountryId(event.target.value)
    const onCustomerTitleIdChangeHandler = event =>
        setCustomerTitleId(event.target.value)
    const onAccountCategoryIdChangeHandler = event =>
        setAccountCategoryId(event.target.value)
    const onBirthDateChangeHandler = event =>
        setBirthDate(event.target.value.trim())
    const onIcFrontChangeHandler = event => setIcFront(event.target.files[0])
    const onIcBackChangeHandler = event => setIcBack(event.target.files[0])

    const updateForm = async event => {
        event.preventDefault()

        // TODO: validation
        // if (icFront === '' || icFront === null) {
        //     alert('No ic front provided')
        // }

        // if (icBack === '' || icBack === null) {
        //     alert('No ic back provided')
        // }

        const response = await axios
            .put(`/api/customers/update?id=${id}`, {
                id: id,
                name: name,
                email: email === '' ? null : email,
                mobile_number: mobileNumber === '' ? null : mobileNumber,
                ic_number: icNumber,
                ic_type_id: icTypeId,
                ic_color_id: icColorId === '' ? null : icColorId,
                ic_expiry_date: icExpiryDate,
                country_id: countryId,
                customer_title_id:
                customerTitleId === '' ? null : customerTitleId,
                account_category_id: accountCategoryId,
                birth_date: birthDate,
            })
            .then(async res => {
                const id = res.data.id
                console.log("Picture",icUrls)
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

                console.log(imageID[0])

                try {
                    
                    if (icFrontFormData != "" || icFrontFormData != null) {
                        const responseIcFront = await axios.patch(
                            `/api/files/update?id=${imageID[0]}`,
                            icFrontFormData,
                            headers,
                        )
                        console.log('upload ok')
                        console.log(responseIcFront)
                    }
                    if (icBackFormData != "" || icBackFormData != null) {
                        const responseIcBack = await axios.put(
                            '/api/files',
                            icBackFormData,
                            headers,
                        )
                        console.log('upload ok')
                        console.log(responseIcBack)
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
                                Customer with ID does not exist!  <Button className="ml-4" onClick={handleRoute}>Create Customer</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        )

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <a>
                            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                        </a>
                    </Link>
                }>
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

                    <div className="mt-4">
                        <Label htmlFor="icNumber">Ic Number</Label>

                        <Input
                            id="icNumber"
                            type="text"
                            value={icNumber}
                            pattern="[a-zA-Z0-9]{2}[0-9]{6}"
                            className="block mt-1 w-full"
                            required
                            onChange={onIcNumberChangeHandler}
                        />
                        {checkIcExist != null ? <p className="mt-2">Customer already exist! Click <a href={checkIcExist}>here</a> to view</p> : <p></p>}
                        <InputError
                            messages={errors.ic_number}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="icTypeId">Ic Type</Label>

                        <select
                            id="icTypeId"
                            value={icTypeId}
                            required
                            onChange={onIcTypeIdChangeHandler}>
                            <option value="">Select One</option>
                            <option value={1}>Personal</option>
                            <option value={2}>Company</option>
                            <option value={3}>Passport</option>
                        </select>

                        <InputError
                            messages={errors.ic_type_id}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="icColorId">Ic Color (Optional)</Label>

                        <select
                            id="icColorId"
                            value={icColorId}
                            onChange={onIcColorIdChangeHandler}>
                            <option value="">Select One</option>
                            <option value={1}>Yellow</option>
                            <option value={2}>Green</option>
                            <option value={3}>Purple</option>
                        </select>

                        <InputError
                            messages={errors.ic_color_id}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="icExpiryDate">Ic Expiry Date</Label>

                        <Input
                            id="icExpiryDate"
                            type="date"
                            value={icExpiryDate}
                            className="block mt-1 w-full"
                            required
                            onChange={onIcExpiryDateChangeHandler}
                        />

                        <InputError
                            messages={errors.ic_expiry_date}
                            className="mt-2"
                        />
                    </div>

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
                                className="inline-block w-20 h-20 mr-4"
                            />
                        ))}
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <Button className="ml-4">Update</Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Update
