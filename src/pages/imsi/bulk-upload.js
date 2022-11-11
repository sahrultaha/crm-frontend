import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import * as React from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import MainBody from '@/components/MainBody'
import NavLink from '@/components/NavLink'
import Head from 'next/head'

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
                    <Link href="/templates/bulk-imsi-template.csv">
                        <div className="flex-shrink-0 flex items-center hover:text-gray-700 hover:border-gray-700">
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
                        </div>
                    </Link>
                </div>
            </MainBody>
        </AppLayout>
    )
}

export default BulkUpload
