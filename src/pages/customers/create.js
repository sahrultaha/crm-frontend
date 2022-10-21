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
    const [icNumber, setIcNumber] = useState('')
    const [icTypeId, setIcTypeId] = useState('')
    const [icColorId, setIcColorId] = useState('')
    const [icExpiryDate, setIcExpiryDate] = useState('')
    const [countryId, setCountryId] = useState('')
    const [customerTitleId, setCustomerTitleId] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [errors, setErrors] = useState([])

    const submitForm = async event => {
        event.preventDefault();
        const response = await axios
            .post('/api/customers', {
                name: 'Lorem',
                ic_number: '00011223',
                ic_type_id: 1,
                ic_color_id: 1,
                ic_expiry_date: '01/01/2001',
                country_id: 1,
                customer_title_id: 1,
                birth_date: '01/01/2002',
            })
            .then(res => {
                console.log('success');
                const id = res.data;
                router.push(`/customers/${id}`);
            })
            .catch(error => {
                console.log('error');
                console.error(error);
            });
        
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
                            autoFocus
                        />

                        <InputError messages={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="icNumber">Ic Number</Label>

                        <Input
                            id="icNumber"
                            type="text"
                            value={icNumber}
                            className="block mt-1 w-full"
                            onChange={event => setIcNumber(event.target.value)}
                        />

                        <InputError messages={errors.icNumber} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="icTypeId">Ic Type Id</Label>

                        <Input
                            id="icTypeId"
                            type="text"
                            value={icTypeId}
                            className="block mt-1 w-full"
                            onChange={event => setIcTypeId(event.target.value)}
                        />

                        <InputError messages={errors.icTypeId} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="icColorId">
                            Ic Color Id
                        </Label>

                        <Input
                            id="icColorId"
                            type="text"
                            value={icColorId}
                            className="block mt-1 w-full"
                            onChange={event => setIcColorId(event.target.value)}
                        />

                        <InputError messages={errors.icColorId} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="icExpiryDate">
                            Ic Expiry Date
                        </Label>

                        <Input
                            id="icExpiryDate"
                            type="text"
                            value={icExpiryDate}
                            className="block mt-1 w-full"
                            onChange={event => setIcExpiryDate(event.target.value)}
                        />

                        <InputError messages={errors.icExpiryDate} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="countryId">
                            Country Id
                        </Label>

                        <Input
                            id="countryId"
                            type="text"
                            value={countryId}
                            className="block mt-1 w-full"
                            onChange={event => setCountryId(event.target.value)}
                        />

                        <InputError messages={errors.countryId} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="customerTitleId">
                            Customer Title Id
                        </Label>

                        <Input
                            id="customerTitleId"
                            type="text"
                            value={customerTitleId}
                            className="block mt-1 w-full"
                            onChange={event => setCustomerTitleId(event.target.value)}
                        />

                        <InputError messages={errors.customerTitleId} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="birthDate">
                            Birth Date
                        </Label>

                        <Input
                            id="birthDate"
                            type="date"
                            value={birthDate}
                            className="block mt-1 w-full"
                            onChange={event => setBirthDate(event.target.value)}
                        />

                        <InputError messages={errors.birthDate} className="mt-2" />
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
