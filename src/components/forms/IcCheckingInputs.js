import Input from '@/components/Input'
import Label from '@/components/Label'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'

const IcCheckingInputs = ({
    updateMode,
    icNumber,
    icTypeId,
    icColorId,
    icExpiryDate,
    oriIcNumber,
    oriIcTypeId,
    oriExpiryDate,
    oriIcColorId,

    setIcNumber,
    setIcTypeId,
    setIcColorId,
    setIcExpiryDate,
    onCustomerChange,
    ...props
}) => {

    const [customer, setCustomer] = useState(null)
    useEffect(() => {
        if (oriIcNumber !== icNumber) {
            updateMode = true
        }
        // console.log(icNumber,"changed")
    }, [icNumber, icTypeId])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (icNumber === '' || icTypeId === '') {
                console.log('ic number or ic type id is empty...')
                return
            }
            if (updateMode == false) return

            if (oriIcNumber == icNumber && oriIcTypeId == icTypeId) {
                setIcNumber(oriIcNumber)
                setIcTypeId(oriIcTypeId)
                return
            }

            if (oriExpiryDate != icExpiryDate || icColorId != oriIcColorId) {
                setIcExpiryDate(icExpiryDate)
                setIcColorId(icColorId)
                return
            }

            const endpoint = '/api/customers/search?'
            const queryString = new URLSearchParams('ic_number&ic_type_id')

            queryString.set('ic_number', icNumber)
            queryString.set('ic_type_id', icTypeId)

            axios
                .get(`${endpoint}${queryString}`)
                .then(res => {
                    if (res.data.length > 0) {
                        const customer = res.data[0]
                        setCustomer(customer)
                        setIcNumber('')
                        setIcTypeId('')
                        setIcColorId('')
                        setIcExpiryDate('')

                        return
                    }
                    setCustomer(null)
                })
                .catch(e => console.error('IC number search failed', e))

        }, 500)


        return () => clearTimeout(timer)
    }, [icNumber, icTypeId, updateMode, oriIcNumber, oriIcTypeId, icExpiryDate, icColorId])


    useEffect(() => {
        onCustomerChange({ ...customer })
    }, [customer])

    const onIcNumberChangeHandler = event => {
        const value = event.target.value.trim()

        setIcNumber(value)
        setCustomer(null)
    }

    const onIcTypeIdChangeHandler = event => {
        const value = event.target.value.trim()

        setIcTypeId(value)
        setCustomer(null)
    }

    const onIcColorIdChangeHandler = event => {
        const value = event.target.value.trim()
        setIcColorId(value)
    }

    const onIcExpiryDateChangeHandler = event => {
        const value = event.target.value.trim()
        const expiry_date = new Date(value).setHours(0, 0, 0, 0)
        const todayDate = new Date().setHours(0, 0, 0, 0)

        // console.log("Today", todayDate)
        // console.log("expiry", expiry_date)
        // console.log()

        if ((expiry_date >= 0) && (expiry_date <= todayDate)) {
            alert("Expiry date cannot be today or in the past")
            setIcExpiryDate(oriExpiryDate)
            return
        }
        console.log(value)
        setIcExpiryDate(value)
        setCustomer(null)
    }

    let message = null
    if (customer !== null) {
        const href = '/customers/' + customer.id
        message = (
            <div className="my-2 py-2 px-4 bg-red-100 text-sm">
                <p>
                    Customer already exist! Click{' '}
                    <Link href={href}>
                        <a className="text-blue-500">here</a>
                    </Link>{' '}
                    to view
                </p>
            </div>
        )
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <Label htmlFor="icNumber">Ic Number</Label>

                    <Input
                        id="icNumber"
                        type="text"
                        value={icNumber}
                        placeholder="01234567"
                        pattern="[a-zA-Z0-9]{2}[0-9]{6}"
                        className="block w-full"
                        required
                        onChange={onIcNumberChangeHandler}
                    />
                </div>
                <div>
                    <Label htmlFor="icTypeId">Ic Type</Label>

                    <select
                        id="icTypeId"
                        value={icTypeId}
                        className="w-full"
                        required
                        onChange={onIcTypeIdChangeHandler}>
                        <option value="">Select One</option>
                        <option value={1}>Personal</option>
                        <option value={2}>Company</option>
                        <option value={3}>Passport</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <Label htmlFor="icExpiryDate">Ic Expiry Date</Label>

                    <Input
                        id="icExpiryDate"
                        type="date"
                        value={icExpiryDate}
                        className="block mt-1 w-full"
                        required
                        onChange={onIcExpiryDateChangeHandler}
                    />
                </div>
                <div>
                    <Label htmlFor="icColorId">Ic Color (Optional)</Label>

                    <select
                        id="icColorId"
                        value={icColorId}
                        className="w-full"
                        onChange={onIcColorIdChangeHandler}>
                        <option value="">Select One</option>
                        <option value={1}>Yellow</option>
                        <option value={2}>Green</option>
                        <option value={3}>Purple</option>
                    </select>
                </div>
            </div>
            {message ?? ''}
        </div>
    )
}

export default IcCheckingInputs
