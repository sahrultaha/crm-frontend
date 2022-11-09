import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Label from '@/components/Label'
import axios from '@/lib/axios'

const Create = () => {
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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-12 bg-white border-b border-gray-200"></div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Create
