import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import MainBody from '@/components/MainBody'
import NavLink from '@/components/NavLink'
import Head from 'next/head'
import ImsiBulkUpload from '@/components/forms/imsi/ImsiBulkUpload'
import ImsiNav from '@/components/Layouts/imsi/ImsiNav'

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
                <ImsiNav></ImsiNav>
                ß<div className="flex flex-row">
                    <ImsiBulkUpload></ImsiBulkUpload>
                </div>
            </MainBody>
        </AppLayout>
    )
}

export default BulkUpload
