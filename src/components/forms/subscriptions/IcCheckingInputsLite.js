import Input from '@/components/Input'
import Label from '@/components/Label'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'

const IcCheckingInputsLite = ({ onCustomerChange, ...props }) => {
    const [icNumber, setIcNumber] = useState('')
    const [icTypeId, setIcTypeId] = useState('')
    const [customer, setCustomer] = useState(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (icNumber === '' || icTypeId === '') {
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
                        return
                    }
                    setCustomer(null)
                })
                .catch(e => console.error('IC number search failed', e))
        }, 500)

        return () => clearTimeout(timer)
    }, [icNumber, icTypeId])

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
        </div>
    )
}

export default IcCheckingInputsLite
