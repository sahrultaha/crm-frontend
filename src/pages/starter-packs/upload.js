
import { useRouter } from 'next/router'
import * as React from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import MainBody from '@/components/MainBody'
import Head from 'next/head'
import PackNav from '@/components/forms/packs/PackNav'
import FileUpload from '@/components/forms/FileUpload'

const Upload = () => {
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
                    <FileUpload relation_id='1' relation_type_id='1' file_category_id="1"></FileUpload>
                </div>
            </MainBody>
        </AppLayout>
    )
}

export default Upload
