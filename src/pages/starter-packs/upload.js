import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import MainBody from '@/components/MainBody'
import NavLink from '@/components/NavLink'
import Head from 'next/head'
import ImsiBulkUpload from '@/components/forms/imsi/ImsiBulkUpload'
import PackNav from '@/components/forms/packs/PackNav'

const BulkUpload = () => {
    const router = useRouter()
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Starter Pack Upload
                </h2>
            }>
            <Head>
                <title>Starter Pack Upload</title>
            </Head>
            <MainBody>
                <div className="flex mb-10">
                    <PackNav></PackNav>
                </div>
                <div className="flex flex-row">
                </div>
            </MainBody>
        </AppLayout>
    )
}

export default BulkUpload
