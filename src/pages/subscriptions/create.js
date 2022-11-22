import AppLayout from '@/components/Layouts/AppLayout'
import { useRouter } from 'next/router'
import Button from '@/components/Button'
import Head from 'next/head'
import { useState } from 'react'
import axios from '@/lib/axios'
import MainBody from '@/components/MainBody'
import NavLink from '@/components/NavLink'
import IcCheckingInputsLite from '@/components/forms/subscriptions/IcCheckingInputsLite'
import CreateCustomerForm from '@/components/forms/customer/CreateCustomerForm'
import SearchPackByNumber from '@/components/forms/subscriptions/SearchPackByNumber'

const Create = () => {
    const [customer, setCustomer] = useState(null)
    const [pack, setPack] = useState(null)
    const [icDetails, setIcDetails] = useState(null)
    const [loading, setLoading] = useState(false)
    const [subCreated, setSubCreated] = useState(false)
    const router = useRouter()

    const onCustomerCreated = id => {
        if (loading) return
        console.log('on customer created id', id)
        setLoading(true)
        axios
            .get(`/api/customers/${id}`)
            .then(resp => {
                console.log('Customer created...', resp)
                setCustomer({ ...resp.data })
            })
            .catch(e => {
                console.error('Something went wrong...', e)
            })
            .finally(_ => {
                setLoading(false)
            })
    }

    const createSubscription = _ => {
        if (loading) return
        if (pack === null) return

        setLoading(true)
        axios
            .post('/api/subscriptions', {
                customer_id: customer.id,
                registration_date: '2022-11-01',
                subscription_status_id: 1,
                subscription_type_id: 1,
                number_id: pack.number_id,
                imsi_id: pack.imsi_id,
                activation_date: '2022-11-01',
            })
            .then(resp => {
                console.log('Subscription created...', resp)
                setSubCreated(true)
            })
            .catch(e => {
                console.error('Something went wrong...', e)
            })
            .finally(_ => {
                setLoading(false)
            })
    }

    let componentToDisplay = <p>Loading...</p>

    if (customer === null) {
        componentToDisplay = (
            <div>
                <IcCheckingInputsLite
                    onCustomerChange={setCustomer}
                    onIcDetailsChange={setIcDetails}
                />
                {icDetails !== null && (
                    <CreateCustomerForm
                        icDetails={icDetails}
                        onCustomerCreated={onCustomerCreated}
                    />
                )}
            </div>
        )
    }

    if (customer !== null && pack === null) {
        componentToDisplay = (
            <div>
                <p>Customer id is {customer.id}</p>
                <SearchPackByNumber onPackChange={setPack} />
            </div>
        )
    }

    if (customer !== null && pack !== null) {
        componentToDisplay = (
            <div>
                <p>Pack id is {pack.id}</p>
                <p>Product id is {pack.product_id}</p>
                <p>Imsi id is {pack.imsi_id}</p>
                {!loading && !subCreated && (
                    <Button onClick={createSubscription}>
                        Create Subscription
                    </Button>
                )}
                {!loading && subCreated && (
                    <p className="text-green-500">
                        A new subscription has been created.
                    </p>
                )}
            </div>
        )
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    New Subscription
                </h2>
            }>
            <Head>
                <title>New Subscription</title>
            </Head>

            <MainBody>{componentToDisplay}</MainBody>
        </AppLayout>
    )
}

export default Create
