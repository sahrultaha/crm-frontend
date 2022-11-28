import AppLayout from '@/components/Layouts/AppLayout'
import { useRouter } from 'next/router'
import Button from '@/components/Button'
import Head from 'next/head'
import Label from '@/components/Label'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import { useState } from 'react'
import axios from '@/lib/axios'
import MainBody from '@/components/MainBody'
import NavLink from '@/components/NavLink'

const Create = () => {
    const router = useRouter()
    const [number, setNumber] = useState('')
    const [numberTypeId, setNumberTypeId] = useState('')
    const [numberStatusId, setNumberStatusId] = useState('')
    const [numberCategoryId, setNumberCategoryId] = useState('')
    const [errors, setErrors] = useState('')

    const onNumberChange = event => setNumber(event.target.value)
    const onNumberTypeIdChange = event => setNumberTypeId(event.target.value)
    const onNumberStatusIdChange = event => setNumberStatusId(event.target.value)
    const onNumberCategoryIdChange = event => setNumberCategoryId(event.target.value)
    
    const submitForm = async event => {
        event.preventDefault()

        const data = {
            number: number,
            number_type_id: numberTypeId,
            number_status_id: numberStatusId,
            number_category_id: numberCategoryId,
        }

        let dataHasEmptyProperty = false;
        for(let property in data) {
            if(data[property] === null || data[property] === '') {
                dataHasEmptyProperty = true;
                break
            }
        }
        
        if(dataHasEmptyProperty) {
            console.error('data has empty property', data)
            return
        }

        await axios
            .post('/api/msisdn', data)
            .then(async res => {
                console.log('new number id is', res.data.id)
                router.push('/msisdn')
            })
            .catch(error => {
                console.log('error!')
                if (error.response) {
                    console.log('error in response', error.response.data.errors)
                    setErrors(error.response.data.errors)
                } else if (error.request) {
                    console.log('error in request', error.request)
                } else {
                    console.log(
                        'error not in response or request',
                        error.message,
                    )
                }
                console.log('error config', error.config)
            })
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    New MSISDN
                </h2>
            }>
            <Head>
                <title>New MSISDN</title>
            </Head>

            <MainBody>
                <div className="flex">
                    <div className="mr-4">
                        <NavLink
                            href="/msisdn"
                            active={router.pathname === '/msisdn'}>
                            MSISDN
                        </NavLink>
                    </div>
                    <div className="mr-4">
                        <NavLink
                            href="/msisdn/create"
                            active={router.pathname === '/msisdn/create'}>
                            Create New MSISDN
                        </NavLink>
                    </div>
                </div>
                <div className="flex">
                    <form className='mx-auto max-w-screen-sm' onSubmit={submitForm}>
                        <div>
                            <Label htmlFor="number">Number</Label>
                            <Input
                                id="number"
                                type="text"
                                value={number}
                                className="block mt-1 w-full"
                                onChange={onNumberChange}
                                required
                            />
                            <InputError
                                messages={errors.number}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="numberTypeId">Number Type</Label>

                            <select
                                id="numberTypeId"
                                value={numberTypeId}
                                onChange={onNumberTypeIdChange}>
                                <option>Select One</option>
                                <option value={1}>Prepaid</option>
                                <option value={2}>Postpaid</option>
                            </select>

                            <InputError
                                messages={errors.numberTypeId}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="numberStatusId">Number Status</Label>

                            <select
                                id="numberStatusId"
                                value={numberStatusId}
                                onChange={onNumberStatusIdChange}>
                                <option>Select One</option>
                                <option value={1}>Available</option>
                                <option value={2}>Active</option>
                                <option value={3}>Terminated</option>
                            </select>

                            <InputError
                                messages={errors.numberStatusId}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="numberCategoryId">Number Category</Label>

                            <select
                                id="numberCategoryId"
                                value={numberCategoryId}
                                onChange={onNumberCategoryIdChange}>
                                <option>Select One</option>
                                <option value={1}>Normal</option>
                                <option value={2}>Gold</option>
                            </select>

                            <InputError
                                messages={errors.numberCategoryId}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <Button className="ml-4">Create</Button>
                        </div>
                    </form>
                </div>
            </MainBody>
        </AppLayout>
    )
}

export default Create
