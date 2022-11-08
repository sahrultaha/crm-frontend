import Input from '@/components/Input'
import Label from '@/components/Label'
import Link from 'next/link'
import { useState } from 'react'
import axios from '@/lib/axios'

const IcCheckingInputs = ({
    onIcNumberChange,
    onIcTypeIdChange,
    onCustomerChange,
    ...props
}) => {
    const [icNumber, setIcNumber] = useState('')
    const [icTypeId, setIcTypeId] = useState('')
    const [customer, setCustomer] = useState(null)

    const endpoint = '/api/customers/search?'
    const queryString = new URLSearchParams('ic_number&ic_type_id')

    const setQueryParamIcNumber = val => {
        queryString.set('ic_number', val)
    }

    const setQueryParamIcTypeId = val => {
        queryString.set('ic_type_id', val)
    }

    const onIcNumberChangeHandler = event => {
        const value = event.target.value.trim()

        setQueryParamIcNumber(value)
        setQueryParamIcTypeId(icTypeId)

        setIcNumber(value)
        setCustomer(null)
        onIcNumberChange(value)
        onCustomerChange(null)

        if (icTypeId === '') {
            return
        }

        axios
            .get(`${endpoint}${queryString}`)
            .then(res => {
                if (res.data.length > 0) {
                    const customer = res.data[0]
                    setCustomer(customer)
                    onCustomerChange(customer)
                    return
                }
                setCustomer(null)
                onCustomerChange(null)
            })
            .catch(e => console.error('IC number search failed', e))
    }

    const onIcTypeIdChangeHandler = event => {
        const value = event.target.value.trim()

        setQueryParamIcNumber(icNumber)
        setQueryParamIcTypeId(value)

        setIcTypeId(value)
        setCustomer(null)
        onIcTypeIdChange(value)
        onCustomerChange(null)

        if (icNumber === '') {
            return
        }

        axios
            .get(`${endpoint}${queryString}`)
            .then(res => {
                if (res.data.length > 0) {
                    const customer = res.data[0]
                    setCustomer(customer)
                    setIcNumber('')
                    setIcTypeId('')

                    onCustomerChange(customer)
                    onIcNumberChange('')
                    onIcTypeIdChange('')
                    return
                }
                setCustomer(null)
                onCustomerChange(null)
            })
            .catch(e => console.error('IC type id search failed', e))
    }

    let message = null
    if (customer !== null) {
        const href = '/customers/' + customer.id
        message = (
            <div className='my-2 py-2 px-4 bg-red-100 text-sm'>
                <p>
                    Customer already exist! Click <Link href={href}><a className="text-blue-500">here</a></Link>{' '}
                    to view
                </p>
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-stretch">
                <div className='mr-2 w-3/4'>
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
                        required
                        onChange={onIcTypeIdChangeHandler}>
                        <option value="">Select One</option>
                        <option value={1}>Personal</option>
                        <option value={2}>Company</option>
                        <option value={3}>Passport</option>
                    </select>
                </div>
            </div>
            {message ?? ''}
        </div>
    )
}

export default IcCheckingInputs
