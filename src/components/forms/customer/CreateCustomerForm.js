import Label from '@/components/Label'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import { useState } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import AddressInputs from '@/components/forms/AddressInputs'
import FileInputs from '@/components/forms/FileInputs'
import Button from '@/components/Button'

const CreateCustomerForm = ({ icDetails, onCustomerCreated = null }) => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [countryId, setCountryId] = useState(1)
    const [customerTitleId, setCustomerTitleId] = useState('')
    const [accountCategoryId, setAccountCategoryId] = useState(1)
    const [birthDate, setBirthDate] = useState('')

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
    const [district_id, setDistrictId] = useState('')
    const [mukim_id, setMukimId] = useState('')
    const [village_id, setVillageId] = useState('')
    const [postal_code_id, setPostalCodeId] = useState('')

    const [icFront, setIcFront] = useState('')
    const [icBack, setIcBack] = useState('')
    const [errors, setErrors] = useState([])

    const submitForm = async event => {
        event.preventDefault()

        if (icFront === '' || icFront === null) {
            alert('No ic front provided')
        }

        if (icBack === '' || icBack === null) {
            alert('No ic back provided')
        }

        if (!icDetails) {
            alert('No ic details provided')
        }

        const data = {
            name: name,
            email: email === '' ? null : email,
            mobile_number: mobileNumber === '' ? null : mobileNumber,
            country_id: countryId,
            customer_title_id: customerTitleId === '' ? null : customerTitleId,
            account_category_id: accountCategoryId,
            birth_date: birthDate,
            ic_number: icDetails.number,
            ic_type_id: icDetails.typeId,
            ic_color_id: icDetails.colorId,
            ic_expiry_date: icDetails.expiryDate,
            village_id: village_id ?? '',
            district_id: district_id ?? '',
            mukim_id: mukim_id ?? '',
            postal_code_id: postal_code_id ?? '',
            house_number: houseNumber ?? '',
            simpang: simpang ?? '',
            street: street ?? '',
            building_name: buildingName ?? '',
            block: block ?? '',
            floor: floor ?? '',
            unit: unit ?? '',
            address_type_id: 1,
        }

        console.log('about to send data', data)

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

                    if (onCustomerCreated === null) {
                        console.log(
                            'onCustomerCreated is null, defaulting to router push',
                        )
                        router.push(`/customers/${id}`)
                        return
                    }

                    onCustomerCreated(id)
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
        <form onSubmit={submitForm}>
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    value={name}
                    className="block mt-1 w-full"
                    onChange={ev => setName(ev.target.value)}
                    required
                    pattern="[^\s][a-zA-Z\s]+"
                    autoFocus
                />
                {errors.name && (
                    <InputError messages={errors.name} className="mt-2" />
                )}
            </div>

            <div>
                <Label htmlFor="email">Email (optional)</Label>

                <Input
                    id="email"
                    type="email"
                    value={email}
                    pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                    className="block mt-1 w-full"
                    onChange={ev => setEmail(ev.target.value)}
                />

                {errors.email && (
                    <InputError messages={errors.email} className="mt-2" />
                )}
            </div>

            <div>
                <Label htmlFor="mobileNumber">Mobile Number (optional)</Label>

                <Input
                    id="mobileNumber"
                    type="text"
                    value={mobileNumber}
                    pattern="[0-9]{7,10}"
                    className="block mt-1 w-full"
                    onChange={ev => setMobileNumber(ev.target.value)}
                />

                {errors.mobile_number && (
                    <InputError
                        messages={errors.mobile_number}
                        className="mt-2"
                    />
                )}
            </div>

            <div>
                <Label htmlFor="countryId">Country</Label>

                <select
                    id="countryId"
                    value={countryId}
                    required
                    onChange={ev => setCountryId(ev.target.value)}>
                    <option value={1}>Brunei</option>
                    <option value={2}>Malaysia</option>
                </select>

                {errors.country_id && (
                    <InputError messages={errors.country_id} className="mt-2" />
                )}
            </div>

            <div>
                <Label htmlFor="customerTitleId">
                    Customer Title (optional)
                </Label>

                <select
                    id="customerTitleId"
                    value={customerTitleId}
                    onChange={ev => setCustomerTitleId(ev.target.value)}>
                    <option>Select One</option>
                    <option value={1}>Mr</option>
                    <option value={2}>Ms</option>
                    <option value={3}>Mrs</option>
                    <option value={4}>Haji</option>
                    <option value={5}>Hajah</option>
                    <option value={6}>Dr</option>
                </select>

                {errors.customer_title_id && (
                    <InputError
                        messages={errors.customer_title_id}
                        className="mt-2"
                    />
                )}
            </div>

            <div>
                <Label htmlFor="accountCategoryId">Account Category</Label>

                <select
                    id="accountCategoryId"
                    value={accountCategoryId}
                    required
                    onChange={ev => setAccountCategoryId(ev.target.value)}>
                    <option value={1}>Brunei Personal</option>
                    <option value={2}>Foreign Personal</option>
                    <option value={3}>Company</option>
                    <option value={4}>Embassy</option>
                    <option value={5}>Government</option>
                </select>

                {errors.account_category_id && (
                    <InputError
                        messages={errors.account_category_id}
                        className="mt-2"
                    />
                )}
            </div>

            <div>
                <Label htmlFor="birthDate">Birth Date</Label>

                <Input
                    id="birthDate"
                    type="date"
                    value={birthDate}
                    className="block mt-1 w-full"
                    required
                    onChange={ev => setBirthDate(ev.target.value)}
                />

                {errors.birth_date && (
                    <InputError messages={errors.birth_date} className="mt-2" />
                )}
            </div>

            <AddressInputs
                district={district}
                mukim={mukim}
                village={village}
                postalCode={postalCode}
                village_id={village_id}
                district_id={district_id}
                mukim_id={mukim_id}
                postal_code_id={postal_code_id}
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
                setVillageId={setVillageId}
                setDistrictId={setDistrictId}
                setMukimId={setMukimId}
                setPostalCodeId={setPostalCodeId}
                setHouseNumber={setHouseNumber}
                setSimpang={setSimpang}
                setStreet={setStreet}
                setBuildingName={setBuildingName}
                setBlock={setBlock}
                setFloor={setFloor}
                setUnit={setUnit}
            />

            <FileInputs setIcFront={setIcFront} setIcBack={setIcBack} />

            <div className="flex items-center justify-end mt-4">
                <Button className="ml-4">Create</Button>
            </div>
        </form>
    )
}

export default CreateCustomerForm
