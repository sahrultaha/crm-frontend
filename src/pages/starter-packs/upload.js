import { useRouter } from 'next/router'
import * as React from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import MainBody from '@/components/MainBody'
import Head from 'next/head'
import PackNav from '@/components/forms/packs/PackNav'
import FileUpload from '@/components/forms/FileUpload'
import Link from 'next/link'

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
                <div className="flex">
                    <Link href="/templates/starter-pack-template.csv">
                        <a
                            className="flex-shrink-0 flex items-center border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 mb-10"
                            id="file-template">
                            File Template
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 hover:border-gray-700 hover:stroke-gray-700 hover:border-solid">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                />
                            </svg>
                        </a>
                    </Link>
                </div>
                <div className="flex flex-row">
                    <FileUpload
                        relation_id="1"
                        relation_type_id="1"
                        file_category_id="4"></FileUpload>
                </div>
            </MainBody>
        </AppLayout>
    )
}

export default Upload
