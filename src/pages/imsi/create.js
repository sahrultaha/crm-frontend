import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useState } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import AppLayout from '@/components/Layouts/AppLayout'
import MainBody from '@/components/MainBody'
import Head from 'next/head'

const Create = () => {
    const router = useRouter()
    const [imsi, setImsi] = useState('')
    const [imsiStatusId, setImsiStatusId] = useState('')
    const [imsiTypeId, setImsiTypeId] = useState('')
    const [pin, setPin] = useState('')
    const [puk1, setPuk1] = useState('')
    const [puk2, setPuk2] = useState('')
    const [errors, setErrors] = useState('')

    const onImsiChange = event => setImsi(event.target.value)
    const onImsiStatusIdChange = event => setImsiStatusId(event.target.value)
    const onImsiTypeIdChange = event => setImsiTypeId(event.target.value)
    const onPinChange = event => setPin(event.target.value)
    const onPuk1Change = event => setPuk1(event.target.value)
    const onPuk2Change = event => setPuk2(event.target.value)

    const submitForm = async event => {
        event.preventDefault()

        const data = {
            imsi: imsi,
            imsi_status_id: imsiStatusId,
            imsi_type_id: imsiTypeId,
            pin: pin,
            puk_1: puk1,
            puk_2: puk2,
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
            .post('/api/imsi', data)
            .then(async res => {
                console.log('new imsi id is', res.data.id)
                router.push('/imsi')
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
                    Create Imsi
                </h2>
            }>
            <Head>
                <title>Create Imsi</title>
            </Head>
            <MainBody>
                <form className="mx-auto max-w-screen-sm" onSubmit={submitForm}>
                    <div>
                        <Label htmlFor="imsi">Imsi</Label>

                        <Input
                            id="imsi"
                            type="text"
                            value={imsi}
                            className="block mt-1 w-full"
                            onChange={onImsiChange}
                            required
                            pattern="[0-9]+"
                            autoFocus
                        />

                        {errors.imsi && (
                            <InputError
                                messages={errors.imsi}
                                className="mt-2"
                            />
                        )}
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="imsiStatusId">Imsi Status</Label>

                        <select
                            id="imsiStatusId"
                            value={imsiStatusId}
                            onChange={onImsiStatusIdChange}>
                            <option>Select One</option>
                            <option value={1}>Available</option>
                            <option value={2}>Active</option>
                            <option value={3}>Terminated</option>
                        </select>

                        {errors.imsi_status_id && (
                            <InputError
                                messages={errors.imsi_status_id}
                                className="mt-2"
                            />
                        )}
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="imsiTypeId">Imsi Type</Label>

                        <select
                            id="imsiTypeId"
                            value={imsiTypeId}
                            onChange={onImsiTypeIdChange}>
                            <option>Select One</option>
                            <option value={1}>3G</option>
                            <option value={2}>4G</option>
                        </select>

                        {errors.imsi_type_id && (
                            <InputError
                                messages={errors.imsi_type_id}
                                className="mt-2"
                            />
                        )}
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="pin">Pin</Label>

                        <Input
                            id="pin"
                            type="text"
                            value={pin}
                            className="block mt-1 w-full"
                            onChange={onPinChange}
                            required
                            pattern="[0-9]{4,5}"
                        />

                        {errors.pin && (
                            <InputError
                                messages={errors.pin}
                                className="mt-2"
                            />
                        )}
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="puk1">Puk 1</Label>

                        <Input
                            id="puk1"
                            type="text"
                            value={puk1}
                            className="block mt-1 w-full"
                            onChange={onPuk1Change}
                            required
                            pattern="[0-9]+"
                        />

                        {errors.puk_1 && (
                            <InputError
                                messages={errors.puk_1}
                                className="mt-2"
                            />
                        )}
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="puk2">Puk 2</Label>

                        <Input
                            id="puk2"
                            type="text"
                            value={puk2}
                            className="block mt-1 w-full"
                            onChange={onPuk2Change}
                            required
                            pattern="[0-9]+"
                        />

                        {errors.puk_2 && (
                            <InputError
                                messages={errors.puk_2}
                                className="mt-2"
                            />
                        )}
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ml-4">Create</Button>
                    </div>
                </form>
            </MainBody>
        </AppLayout>
    )
}

export default Create
