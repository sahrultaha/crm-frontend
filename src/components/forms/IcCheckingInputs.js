import Input from '@/components/Input'
import Label from '@/components/Label'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import axios from '@/lib/axios'

const IcCheckingInputs = ({
    onIcDetailsChange,
    onCustomerChange,
    currentIcNumber = '',
    currentIcTypeId = '',
    currentIcColorId = '',
    currentIcExpiryDate = '',
    ...props
}) => {
    const defaultIcDetails = {
        icNumber: '',
        icTypeId: '',
        icColorId: '',
        icExpiryDate: '',
    }
    const [icNumber, setIcNumber] = useState(currentIcNumber)
    const [icTypeId, setIcTypeId] = useState(currentIcTypeId)
    const [icColorId, setIcColorId] = useState(currentIcColorId)
    const [icExpiryDate, setIcExpiryDate] = useState(currentIcExpiryDate)
    const [icDetails, setIcDetails] = useState(defaultIcDetails)
    const [customer, setCustomer] = useState(null)
    const icNumberRef = useRef()

    useEffect(() => {
        const timer = setTimeout(() => {
            if (icNumberRef.current.value === '' || icTypeId === '') {
                console.log('ic number or ic type id is empty...')
                return
            }

            const endpoint = '/api/customers/search?'
            const queryString = new URLSearchParams('ic_number&ic_type_id')

            queryString.set('ic_number', icNumberRef.current.value)
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
                        setIcDetails(defaultIcDetails)

                        return
                    }
                    setCustomer(null)
                })
                .catch(e => console.error('IC number search failed', e))
        }, 500)

        return () => clearTimeout(timer)
    }, [icNumber, icTypeId, defaultIcDetails])

    useEffect(() => {
        onIcDetailsChange({ ...icDetails })
    }, [icDetails])

    useEffect(() => {
        onCustomerChange({ ...customer })
    }, [customer])

    const onIcNumberChangeHandler = event => {
        const value = event.target.value.trim()

        setIcNumber(value)
        setIcDetails(prevDetails => ({ ...prevDetails, icNumber: value }))
        setCustomer(null)
    }

    const onIcTypeIdChangeHandler = event => {
        const value = event.target.value.trim()

        setIcTypeId(value)
        setIcDetails(prevDetails => ({ ...prevDetails, icTypeId: value }))
        setCustomer(null)
    }

    const onIcColorIdChangeHandler = event => {
        const value = event.target.value.trim()
        setIcColorId(value)
        setIcDetails(prevDetails => ({ ...prevDetails, icColorId: value }))
    }

    const onIcExpiryDateChangeHandler = event => {
        const value = event.target.value.trim()
        setIcExpiryDate(value)
        setIcDetails(prevDetails => ({ ...prevDetails, icExpiryDate: value }))
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
                        ref={icNumberRef}
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
