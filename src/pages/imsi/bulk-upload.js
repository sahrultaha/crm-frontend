import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import MainBody from '@/components/MainBody'
import NavLink from '@/components/NavLink'
import Head from 'next/head'
import ImsiBulkUpload from '@/components/forms/imsi/ImsiBulkUpload'

const BulkUpload = () => {
    const router = useRouter()
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    IMSI
                </h2>
            }>
            <Head>
                <title>Imsi List</title>
            </Head>
            <MainBody>
                <div className="flex mb-10">
                    <div className="mr-4">
                        <NavLink
                            href="/imsi"
                            active={router.pathname === '/imsi'}>
                            IMSI
                        </NavLink>
                    </div>
                    <div>
                        <NavLink
                            href="/imsi/bulk-upload"
                            active={router.pathname === '/imsi/bulk-upload'}>
                            Bulk Upload
                        </NavLink>
                    </div>
                </div>
                <div className="flex flex-row">
                    <ImsiBulkUpload></ImsiBulkUpload>
                </div>
            </MainBody>
        </AppLayout>
    )
}

export default BulkUpload
