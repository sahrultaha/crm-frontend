import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useState } from 'react'
import MainBody from '@/components/MainBody'
import IcCheckingInputsLite from '@/components/forms/subscriptions/IcCheckingInputsLite'
import SearchPackByNumber from '@/components/forms/subscriptions/SearchPackByNumber'

const Create = () => {
    const [customer, setCustomer] = useState({})
    const [pack, setPack] = useState({})

    const isEmptyObject = c => Object.keys(c).length === 0

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

                {!isEmptyObject(customer) ? (
                    <SearchPackByNumber onPackChange={setPack} />
                ) : (
                    ''
                )}

                {!isEmptyObject(pack) ? (
                    <div>
                        <p>Pack id is {pack.id}</p>
                        <p>Product id is {pack.product_id}</p>
                        <p>Imsi id is {pack.imsi_id}</p>
                    </div>
                ) : (
                    ''
                )}
            </MainBody>
        </AppLayout>
    )
}

export default Create
