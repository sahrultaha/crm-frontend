import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Router, { useRouter } from 'next/router'
import * as React from 'react';
import MyCombobox from '@/components/MyCombobox'

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
    const [district, setDistrict] = useState('')
    const [mukim, setMukim] = useState('')
    const [village, setVillage] = useState('')
    const [house_number, setHouseNumber] = useState('')
    const [simpang, setSimpang] = useState('')
    const [street, setStreet] = useState('')
    const [building_name, setBuildingName] = useState('')
    const [block, setBlock] = useState('')
    const [floor, setFloor] = useState('')
    const [unit, setUnit] = useState('')
    const [errors, setErrors] = useState([])

    const onNameChangeHandler = event => setName(event.target.value.trim())
    const onEmailChangeHandler = event => setEmail(event.target.value.trim())
    const onMobileNumberChangeHandler = event => setMobileNumber(event.target.value.trim())
    const onIcNumberChangeHandler = event => setIcNumber(event.target.value.trim())
    const onIcTypeIdChangeHandler = event => setIcTypeId(event.target.value)
    const onIcColorIdChangeHandler = event => setIcColorId(event.target.value)
    const onIcExpiryDateChangeHandler = event => setIcExpiryDate(event.target.value.trim())
    const onCountryIdChangeHandler = event => setCountryId(event.target.value)
    const onCustomerTitleIdChangeHandler = event => setCustomerTitleId(event.target.value)
    const onAccountCategoryIdChangeHandler = event => setAccountCategoryId(event.target.value)
    const onBirthDateChangeHandler = event => setBirthDate(event.target.value.trim())
    const onHouseNumberChangeHandler = event => setHouseNumber(event.target.value.trim())
    const onSimpangChangeHandler = event => setSimpang(event.target.value.trim())
    const onStreetChangeHandler = event => setStreet(event.target.value.trim())
    const onBuildingNameChangeHandler = event => setBuildingName(event.target.value.trim())
    const onBlockChangeHandler = event => setBlock(event.target.value.trim())
    const onFloorChangeHandler = event => setFloor(event.target.value.trim())
    const onUnitChangeHandler = event => setUnit(event.target.value.trim())
    const onVillageSelected = value => {
        console.log('Village selected was ', value);
        setVillage(value.name)
        setMukim(value.mukim.name)
        setDistrict(value.mukim.district.name);
    }


    const submitForm = async event => {
        event.preventDefault()

        // TODO: validation

        const response = await axios
            .post('/api/customers', {
                name: name,
                email: email === '' ? null : email,
                mobile_number: mobileNumber === '' ? null : mobileNumber,
                ic_number: icNumber,
                ic_type_id: icTypeId,
                ic_color_id: icColorId === '' ? null : icColorId,
                ic_expiry_date: icExpiryDate,
                country_id: countryId,
                customer_title_id: customerTitleId === '' ? null : customerTitleId,
                account_category_id: accountCategoryId,
                birth_date: birthDate,
                districtId: districtId,
                mukimId: mukimId,
                villageId: villageId,
                house_number: house_number,
                simpang: simpang,
                street: street,
                building_name: building_name,
                block: block,
                floor: floor,
                unit: unit,
            })
            .then(res => {
                const id = res.data.id
                router.push(`/customers/${id}`)
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

                    <div className="mt-4">
                        <Label htmlFor="icNumber">Ic Number</Label>

                        <Input
                            id="icNumber"
                            type="text"
                            value={icNumber}
                            placeholder="01234567"
                            pattern="[a-zA-Z0-9]{2}[0-9]{6}"
                            className="block mt-1 w-full"
                            required
                            onChange={onIcNumberChangeHandler}
                        />

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
                        <Label htmlFor="icColorId">
                            Ic Color (Optional)
                        </Label>

                        <select
                            id="icColorId"
                            value={icColorId}
                            onChange={onIcColorIdChangeHandler}>
                            <option value="">Select One</option>
                            <option value={1}>Yellow</option>
                            <option value={2}>Green</option>
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
                        <Label htmlFor="addressLabel">
                            Kampung
                        </Label>

                        <div className="mt-4">
                            <MyCombobox onSelected={onVillageSelected}/>
                            
                            
                        </div>


                        <div className="mt-4">
                            <Label htmlFor="districtId">
                                District
                            </Label>

                            <Label>{district}</Label>

                            <InputError
                                messages={errors.districtId}
                                className="mt-2"
                            />
                        </div>
                        
                        <div className="mt-4">
                            <Label htmlFor="mukimId">
                                Mukim
                            </Label>

                            <Label>{mukim}</Label>

                            <InputError
                                messages={errors.mukimId}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="house_number">House Number</Label>

                            <Input
                                id="house_number"
                                type="text"
                                value={house_number}
                                placeholder="e.g. No 10"
                                className="block mt-1 w-full"
                                required
                                onChange={onHouseNumberChangeHandler}
                            />

                            <InputError
                                messages={errors.house_number}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="simpang">Simpang</Label>

                            <Input
                                id="simpang"
                                type="text"
                                value={simpang}
                                placeholder="e.g. Simpang 51-1"
                                className="block mt-1 w-full"
                                required
                                onChange={onSimpangChangeHandler}
                            />

                            <InputError
                                messages={errors.simpang}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="street">Street</Label>

                            <Input
                                id="street"
                                type="text"
                                value={street}
                                className="block mt-1 w-full"
                                placeholder="e.g. Jalan Pasir Berakas"
                                required
                                onChange={onStreetChangeHandler}
                            />

                            <InputError
                                messages={errors.street}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="building_name">Building Name</Label>

                            <Input
                                id="building_name"
                                type="text"
                                value={building_name}
                                className="block mt-1 w-full"
                                placeholder="e.g. 118 Residence"
                                onChange={onBuildingNameChangeHandler}
                            />

                            <InputError
                                messages={errors.building_name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="block">Block</Label>

                            <Input
                                id="block"
                                type="text"
                                value={block}
                                placeholder="e.g. Block B"
                                className="block mt-1 w-full"
                                onChange={onBlockChangeHandler}
                            />

                            <InputError
                                messages={errors.block}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="floor">Floor</Label>

                            <Input
                                id="floor"
                                type="text"
                                value={floor}
                                placeholder="e.g. 1st Floor"
                                className="block mt-1 w-full"
                                onChange={onFloorChangeHandler}
                            />

                            <InputError
                                messages={errors.floor}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="unit">Unit</Label>

                            <Input
                                id="unit"
                                type="text"
                                value={unit}
                                className="block mt-1 w-full"
                                placeholder="e.g. Unit 2A"
                                onChange={onUnitChangeHandler}
                            />

                            <InputError
                                messages={errors.unit}
                                className="mt-2"
                            />
                        </div>
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
