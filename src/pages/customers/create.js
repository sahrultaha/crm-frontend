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

const Create = () => {
    const router = useRouter()
    const [name, setName] = useState('')
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
    const [errors, setErrors] = useState([])

    const submitForm = async event => {
        event.preventDefault();

        // TODO: validation

        const response = await axios
            .post('/api/customers', {
                name: name,
                email: email === '' ? null : email,
                mobile_number: mobileNumber === '' ? null : email,
                ic_number: icNumber,
                ic_type_id: icTypeId,
                ic_color_id: icColorId === '' ? null : icColorId,
                ic_expiry_date: icExpiryDate,
                country_id: countryId,
                customer_title_id: customerTitleId === '' ? null : customerTitleId,
                account_category_id: accountCategoryId,
                birth_date: birthDate,
            })
            .then(res => {
                console.log('success')
                const id = res.data.id
                router.push(`/customers/${id}`)
            })
            .catch(error => {
                console.log('error')
                console.error(error)
            })
    }

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
                <form onSubmit={submitForm}>
                    <div>
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            type="text"
                            value={name}
                            className="block mt-1 w-full"
                            onChange={event => setName(event.target.value)}
                            required
                            autoFocus
                        />

                        <InputError messages={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="email">Email (optional)</Label>

                        <Input
                            id="email"
                            type="text"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={event => setEmail(event.target.value)}
                        />

                        <InputError messages={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="mobileNumber">Mobile Number (optional)</Label>

                        <Input
                            id="mobileNumber"
                            type="text"
                            value={mobileNumber}
                            className="block mt-1 w-full"
                            onChange={event => setMobileNumber(event.target.value)}
                        />

                        <InputError messages={errors.mobileNumber} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="icNumber">Ic Number</Label>

                        <Input
                            id="icNumber"
                            type="text"
                            value={icNumber}
                            className="block mt-1 w-full"
                            required
                            onChange={event => setIcNumber(event.target.value)}
                        />

                        <InputError
                            messages={errors.icNumber}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="icTypeId">Ic Type Id</Label>

                        <select
                            id="icTypeId"
                            value={icTypeId}
                            required
                            onChange={event => setIcTypeId(event.target.value)}>
                            <option value="">Select One</option>
                            <option value={1}>Personal</option>
                            <option value={2}>Company</option>
                            <option value={3}>Passport</option>
                        </select>

                        <InputError
                            messages={errors.icTypeId}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="icColorId">Ic Color Id (Optional)</Label>

                        <select
                            id="icColorId"
                            value={icColorId}
                            onChange={event => setIcColorId(event.target.value)}>
                            <option value="">Select One</option>
                            <option value={1}>Yellow</option>
                            <option value={2}>Green</option>
                        </select>

                        <InputError
                            messages={errors.icColorId}
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
                            onChange={event =>
                                setIcExpiryDate(event.target.value)
                            }
                        />

                        <InputError
                            messages={errors.icExpiryDate}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="countryId">Country Id</Label>

                        <select
                            id="countryId"
                            value={countryId}
                            required
                            onChange={event => setCountryId(event.target.value)}>
                            <option value={1}>Brunei</option>
                            <option value={2}>Malaysia</option>
                        </select>

                        <InputError
                            messages={errors.countryId}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="customerTitleId">
                            Customer Title Id (optional)
                        </Label>

                        <select
                            id="customerTitleId"
                            value={customerTitleId}
                            required
                            onChange={event => setCustomerTitleId(event.target.value)}>
                            <option>Select One</option>
                            <option value={1}>Mr</option>
                            <option value={2}>Ms</option>
                            <option value={3}>Mrs</option>
                            <option value={4}>Haji</option>
                            <option value={5}>Hajah</option>
                            <option value={6}>Dr</option>
                        </select>

                        <InputError
                            messages={errors.customerTitleId}
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
                            onChange={event => setAccountCategoryId(event.target.value)}>
                            <option value={1}>Brunei Personal</option>
                            <option value={2}>Foreign Personal</option>
                            <option value={3}>Company</option>
                            <option value={4}>Embassy</option>
                            <option value={5}>Government</option>
                        </select>

                        <InputError
                            messages={errors.accountCategoryId}
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
                            onChange={event => setBirthDate(event.target.value)}
                        />

                        <InputError
                            messages={errors.birthDate}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ml-4">Create</Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Create
