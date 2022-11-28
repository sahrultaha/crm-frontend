import React, { useState, useEffect } from 'react'
import { Input, Select, DatePicker } from 'antd'
import axios from '@/lib/axios'

const IcCheckingInputsLite = ({
    onCustomerChange,
    onIcDetailsChange,
    ...props
}) => {
    const [icNumber, setIcNumber] = useState('')
    const [icNumberTouched, setIcNumberTouched] = useState(false)
    const [icTypeId, setIcTypeId] = useState(1)
    const [icColorId, setIcColorId] = useState('')
    const [icExpiryDate, setIcExpiryDate] = useState('')
    const [customer, setCustomer] = useState(null)
    const [icDetails, setIcDetails] = useState({})
    const [errors, setErrors] = useState({})

    const isIcYellow = ic => ic.startsWith('00') || ic.startsWith('01')
    const isIcRed = ic => ic.startsWith('30') || ic.startsWith('31')
    const isIcGreen = ic => ic.startsWith('50') || ic.startsWith('51')

    useEffect(() => {
        const timer = setTimeout(() => {
            // onIcDetailsChange({
            //     number: icNumber,
            //     typeId: icTypeId,
            //     colorId: icColorId,
            //     expiryDate: icExpiryDate,
            // })

            if (customer !== null) {
                console.log('has customer')
                return
            }

            if (Object.keys(icDetails).length < 4) {
                console.log('icDetails is incomplete!')
                return
            }

            let hasData = true
            console.log('icdetails is', icDetails)
            for (const prop in icDetails) {
                console.log('ic details for', prop, icDetails[prop])
                if (
                    icDetails[prop] === null ||
                    icDetails[prop] === undefined ||
                    icDetails[prop] === ''
                ) {
                    hasData = false
                }
            }

            if (!hasData) {
                console.log('no data yet.')
                return
            }

            console.log('has data!')

            const endpoint = '/api/customers/search?'
            const queryString = new URLSearchParams('ic_number&ic_type_id')

            queryString.set('ic_number', icDetails.number)
            queryString.set('ic_type_id', icDetails.typeId)

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
                        onCustomerChange({ ...customer })
                        onIcDetailsChange(null)
                        return
                    }
                    setCustomer(null)
                    onIcDetailsChange({ ...icDetails })
                })
                .catch(e => console.error('IC number search failed', e))
        }, 500)

        return () => clearTimeout(timer)
    }, [icDetails, customer])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!icNumberTouched) {
                return
            }

            if (!icNumber || icNumber.length === 0) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    icNumber: 'IC cannot be empty!',
                }))
                setCustomer(null)
                setIcDetails(prevIcDetails => ({
                    ...prevIcDetails,
                    number: null,
                }))
                return
            }

            switch (icTypeId) {
                case 1:
                    if (icNumber.length !== 8) {
                        setErrors(prevErrors => ({
                            ...prevErrors,
                            icNumber: 'IC must be 8 characters long.',
                        }))
                        setCustomer(null)
                        setIcDetails(prevIcDetails => ({
                            ...prevIcDetails,
                            number: null,
                        }))
                        return
                    }

                    if (
                        isIcYellow(icNumber) ||
                        isIcRed(icNumber) ||
                        isIcGreen(icNumber)
                    ) {
                        setErrors(prevErrors => ({
                            ...prevErrors,
                            icNumber: null,
                        }))
                        setCustomer(null)
                        setIcDetails(prevIcDetails => ({
                            ...prevIcDetails,
                            number: icNumber,
                        }))
                    } else {
                        setErrors(prevErrors => ({
                            ...prevErrors,
                            icNumber:
                                'IC can only start with: 00, 01, 30, 31, 50, 51.',
                        }))
                        setCustomer(null)
                        setIcDetails(prevIcDetails => ({
                            ...prevIcDetails,
                            number: null,
                        }))
                    }
                    break
                default:
                    if (icNumber.length < 3) {
                        setErrors(prevErrors => ({
                            ...prevErrors,
                            icNumber: 'IC must have 3 or more characters.',
                        }))
                        setCustomer(null)
                        setIcDetails(prevIcDetails => ({
                            ...prevIcDetails,
                            number: null,
                        }))
                    }
            }
        }, 1000)
        return () => clearTimeout(timer)
    }, [icTypeId, icNumber])

    useEffect(() => {
        setIcDetails(prevIcDetails => ({
            ...prevIcDetails,
            typeId: icTypeId,
        }))
        setCustomer(null)
    }, [icTypeId])

    useEffect(() => {
        setIcDetails(prevIcDetails => ({
            ...prevIcDetails,
            colorId: icColorId,
        }))
        setCustomer(null)
    }, [icColorId])

    useEffect(() => {
        const expiryDate = new Date(icExpiryDate.toString()).setHours(
            0,
            0,
            0,
            0,
        )
        const todayDate = new Date().setHours(0, 0, 0, 0)

        if (expiryDate >= 0 && expiryDate <= todayDate) {
            // alert('Expiry date cannot be today or in the past')
            // setIcExpiryDate('')
            setErrors(prevErrors => ({
                ...prevErrors,
                icExpiryDate: 'Expiry date cannot be today or in the past!',
            }))
            setIcDetails(prevIcDetails => ({
                ...prevIcDetails,
                expiryDate: null,
            }))
            setCustomer(null)
            return
        }

        // setIcExpiryDate(value)
        setErrors(prevErrors => ({
            ...prevErrors,
            icExpiryDate: null,
        }))
        setIcDetails(prevIcDetails => ({
            ...prevIcDetails,
            expiryDate: icExpiryDate.toString(),
        }))
        setCustomer(null)
    }, [icExpiryDate])

    useEffect(() => {
        if (icTypeId !== 1) {
            return
        }

        if (!icNumber || icNumber.length !== 8) {
            return
        }

        if (isIcYellow(icNumber)) {
            setIcColorId(1)
            return
        }

        if (isIcRed(icNumber)) {
            setIcColorId(2)
            return
        }

        if (isIcGreen(icNumber)) {
            setIcColorId(3)
            return
        }
    }, [icColorId, icNumber, icTypeId])

    const onIcNumberChangeHandler = event => {
        if (!icNumberTouched) {
            setIcNumberTouched(true)
        }
        setIcNumber(event.target.value)
    }
    const onIcTypeIdChangeHandler = value => setIcTypeId(value)
    const onIcColorIdChangeHandler = value => setIcColorId(value)
    const onIcExpiryDateChangeHandler = value => setIcExpiryDate(value)

    return (
        <div>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <p>Ic Number</p>
                    <Input
                        id="icNumber"
                        type="text"
                        value={icNumber}
                        required
                        onChange={onIcNumberChangeHandler}
                        status={
                            errors &&
                            errors.icNumber !== undefined &&
                            errors.icNumber !== null
                                ? 'error'
                                : ''
                        }
                    />
                    {errors.icNumber && <p>{errors.icNumber}</p>}
                </div>

                <div id="icTypeId">
                    <p>Ic Type</p>
                    <Select
                        value={icTypeId}
                        onChange={onIcTypeIdChangeHandler}
                        required
                        options={[
                            { value: 1, label: 'Personal' },
                            { value: 2, label: 'Company' },
                            { value: 3, label: 'Passport' },
                        ]}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div id="icColorId">
                    <p>Ic Color</p>
                    <Select
                        defaultValue={icColorId}
                        value={icColorId}
                        required
                        onChange={onIcColorIdChangeHandler}
                        options={[
                            { value: 1, label: 'Yellow' },
                            { value: 2, label: 'Green' },
                            { value: 3, label: 'Red' },
                        ]}
                    />
                </div>
                <div>
                    <p>Expiry Date</p>
                    <DatePicker
                        id="icExpiryDate"
                        value={icExpiryDate}
                        onChange={onIcExpiryDateChangeHandler}
                        required
                        status={
                            errors &&
                            errors.icExpiryDate !== undefined &&
                            errors.icExpiryDate !== null
                                ? 'error'
                                : ''
                        }
                    />
                    {errors.icExpiryDate && <p>{errors.icExpiryDate}</p>}
                </div>
            </div>
        </div>
    )
}

export default IcCheckingInputsLite
