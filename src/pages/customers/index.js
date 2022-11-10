import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Label from '@/components/Label'
import axios from '@/lib/axios'
import CustomerTable from '@/components/CustomerTable'
import Link from 'next/link'

const AdvanceInputText = ({
    label,
    data,
    setData,
    type = 'text',
    id = null,
}) => {
    const handleChange = event => {
        if (setData) setData(event.target.value)
    }
    return (
        <div className="mr-4">
            <Label>{label}</Label>
            <input
                type={type}
                value={data}
                onChange={handleChange}
                autoComplete="off"
                id={id ? id : null}
            />
        </div>
    )
}

const AdvanceForm = ({
    custName,
    setCustName,
    custEmail,
    setCustEmail,
    custIc,
    setCustIc,
}) => {
    return (
        <div className="flex items">
            <AdvanceInputText
                id="custName"
                label="Name"
                data={custName}
                setData={setCustName}
            />
            <AdvanceInputText
                id="custIc"
                label="IC Number"
                data={custIc}
                setData={setCustIc}
            />
            <AdvanceInputText
                id="custEmail"
                label="Email"
                data={custEmail}
                setData={setCustEmail}
                type="email"
            />
        </div>
    )
}

const Index = () => {
    const [data, setData] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLastPage, setCurrentLastPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(10)
    const [currentSort, setCurrentSort] = useState('desc')
    const [isLoading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [advanced, setAdvanced] = useState(false)
    const [custName, setCustName] = useState('')
    const [custEmail, setCustEmail] = useState('')
    const [custIc, setCustIc] = useState('')

    const onSortChangeHandler = event => {
        setCurrentSort(event.target.value)
    }

    const onLimitChangeHandler = event => {
        setCurrentLimit(event.target.value)
    }

    const onPageChangeHandler = newPageNumber => {
        setCurrentPage(newPageNumber)
    }

    const getCustomersList = () => {
        if (isLoading) return
        let usp = new URLSearchParams(
            `page=${currentPage}&limit=${currentLimit}&sort=${currentSort}`,
        )
        if (search) {
            usp.append('search', search)
        }
        if (custName) {
            usp.append('name', custName)
        }
        if (custEmail) {
            usp.append('email', custEmail)
        }
        if (custName) {
            usp.append('name', custName)
        }
        if (custIc) {
            usp.append('ic', custIc)
        }
        axios(`/api/customers?` + usp.toString())
            .then(res => {
                setData(res.data.data)
                setCurrentLastPage(res.data.meta.last_page)
            })
            .catch(error => {
                setData(null)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const onSearchChange = event => {
        setSearch(event.target.value)
    }

    const handleSearchSubmit = event => {
        event.preventDefault()
        getCustomersList()
    }

    const onAdvancedClick = event => {
        if (event.target.checked) {
            setSearch('')
            setCustName('')
            setCustEmail('')
            setCustIc('')
        }
        setAdvanced(event.target.checked)
    }

    useEffect(() => {
        getCustomersList()
    }, [currentPage, currentLimit, currentSort, currentLastPage])

    const pageLinks = []
    for (let i = 1; i <= currentLastPage; i++) {
        pageLinks.push(
            <li
                key={i}
                id={'page-link-' + i}
                className="mr-2 cursor-pointer"
                onClick={() => onPageChangeHandler(i)}>
                {i}
            </li>,
        )
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Customers Index
                </h2>
            }>
            <Head>
                <title>Laravel - Customers Index</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-12 bg-white border-b border-gray-200">
                            <form onSubmit={handleSearchSubmit}>
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="col-span-3">
                                        <div className="flex">
                                            <div className="mr-4">
                                                <Label htmlFor="sort">
                                                    Sort
                                                </Label>

                                                <select
                                                    id="sort"
                                                    value={currentSort}
                                                    required
                                                    onChange={
                                                        onSortChangeHandler
                                                    }>
                                                    <option value="asc">
                                                        Asc
                                                    </option>
                                                    <option value="desc">
                                                        Desc
                                                    </option>
                                                </select>
                                            </div>

                                            <div className="mr-4">
                                                <Label htmlFor="limit">
                                                    Limit
                                                </Label>
                                                <select
                                                    id="limit"
                                                    value={currentLimit}
                                                    required
                                                    onChange={
                                                        onLimitChangeHandler
                                                    }>
                                                    <option value={1}>1</option>
                                                    <option value={5}>5</option>
                                                    <option value={10}>
                                                        10
                                                    </option>
                                                    <option value={20}>
                                                        20
                                                    </option>
                                                    <option value={30}>
                                                        30
                                                    </option>
                                                </select>
                                            </div>
                                            <div>
                                                <Label htmlFor="simple-search">
                                                    Search
                                                </Label>
                                                <input
                                                    className="mr-4"
                                                    type="text"
                                                    id="search"
                                                    placeholder="Search (minimum 4 letters)"
                                                    value={search}
                                                    onChange={onSearchChange}
                                                    minLength="4"
                                                    autoComplete="off"
                                                />
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                                                    {' '}
                                                    Search
                                                </button>
                                                <input
                                                    type="checkbox"
                                                    name="advanced"
                                                    value={advanced}
                                                    onClick={onAdvancedClick}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="flex flex-row-reverse">
                                            <div className="flex-row-reverse">
                                                <Link href="/customers/create">
                                                    New
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {advanced ? (
                                    <AdvanceForm
                                        custName={custName}
                                        setCustName={setCustName}
                                        custEmail={custEmail}
                                        setCustEmail={setCustEmail}
                                        custIc={custIc}
                                        setCustIc={setCustIc}
                                    />
                                ) : null}
                            </form>

                            <CustomerTable
                                data={data}
                                loading={isLoading}></CustomerTable>

                            <div>
                                <h2>Pages</h2>
                                <ul className="flex items-center">
                                    {pageLinks}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Index
