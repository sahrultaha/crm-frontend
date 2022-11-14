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

const Index = () => {
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
                <div className="flex">
                    <div className="mr-4">
                        <NavLink
                            href="/imsi"
                            active={router.pathname === '/imsi'}>
                            IMSI
                        </NavLink>
                    </div>
                    <div className="mr-4">
                        <NavLink
                            href="/imsi/create"
                            active={router.pathname === '/imsi/create'}>
                            Create New IMSI
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
            </MainBody>
        </AppLayout>
    )
}

export default Index
