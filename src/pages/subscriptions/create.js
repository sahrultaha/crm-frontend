import AppLayout from '@/components/Layouts/AppLayout'
import { useRouter } from 'next/router'
import Button from '@/components/Button'
import Head from 'next/head'
import { useState } from 'react'
import axios from '@/lib/axios'
import MainBody from '@/components/MainBody'
import NavLink from '@/components/NavLink'
import IcCheckingInputsLite from '@/components/forms/subscriptions/IcCheckingInputsLite'
import SearchPackByNumber from '@/components/forms/subscriptions/SearchPackByNumber'

const Create = () => {
    const [customer, setCustomer] = useState({})
    const [pack, setPack] = useState({})
    const [loading, setLoading] = useState(false)
    const [subCreated, setSubCreated] = useState(false)
    const router = useRouter()

    const isEmptyObject = c => Object.keys(c).length === 0

    const createSubscription = _ => {
        if (loading) return
        if (isEmptyObject(pack)) return

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

            <MainBody>
            <div className="flex">
                    <div className="mr-4">
                        <NavLink
                            href="/subscriptions"
                            active={router.pathname === '/subscriptions'}>
                            Subscriptions
                        </NavLink>
                    </div>
                    <div className="mr-4">
                        <NavLink
                            href="/subscriptions/create"
                            active={router.pathname === '/subscriptions/create'}>
                            Create New Subcription
                        </NavLink>
                    </div>
                </div>

                {isEmptyObject(customer) ? (
                    <IcCheckingInputsLite onCustomerChange={setCustomer} />
                ) : (
                    ''
                )}

                {!isEmptyObject(customer) ? (
                    <p>Customer id is {customer.id}</p>
                ) : (
                    ''
                )}

                {!isEmptyObject(customer) && isEmptyObject(pack) ? (
                    <SearchPackByNumber onPackChange={setPack} />
                ) : (
                    ''
                )}

                {!isEmptyObject(pack) ? (
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
                ) : (
                    ''
                )}
            </MainBody>
        </AppLayout>
    )
}

export default Create
