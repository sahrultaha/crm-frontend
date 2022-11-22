import { useRouter } from 'next/router'
import IcCheckingInputsLite from '@/components/forms/subscriptions/IcCheckingInputsLite'
import AppLayout from '@/components/Layouts/AppLayout'
import MainBody from '@/components/MainBody'
import Head from 'next/head'
import { useState } from 'react'
import CustomerAlreadyExists from '@/components/forms/customer/CustomerAlreadyExists'
import CreateCustomerForm from '@/components/forms/customer/CreateCustomerForm'

const Create = () => {
    const router = useRouter()
    const [customer, setCustomer] = useState(null)
    const [icDetails, setIcDetails] = useState(null)

    let componentToReturn = <p>Please enter ic details.</p>

    if (customer === null && icDetails !== null) {
        componentToReturn = <CreateCustomerForm icDetails={icDetails} />
    }

    if (customer !== null && icDetails === null) {
        componentToReturn = <CustomerAlreadyExists customer={customer} />
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Customer
                </h2>
            }>
            <Head>
                <title>Create Customer</title>
            </Head>
            <MainBody>
                <IcCheckingInputsLite
                    onCustomerChange={setCustomer}
                    onIcDetailsChange={setIcDetails}
                />

                {componentToReturn}
            </MainBody>
        </AppLayout>
    )
}

export default Create
