import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Label from '@/components/Label'
import axios from '@/lib/axios'

function Customer(props) {
    const data = props.data || []
    if (props.isLoading) return "Loading..."
    if (data.length === 0) return "Empty result."
    return <ul className="my-8">
        {data.map(customer => (
            <li key={customer.id}>
                {customer.id} - {customer.name}
            </li>
        ))}
    </ul>
}

const Index = () => {
    const [data, setData] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLastPage, setCurrentLastPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(10)
    const [currentSort, setCurrentSort] = useState('desc')
    const [isLoading, setLoading] = useState(false)
    const [search, setSearch] = useState('')

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

        axios(
            `/api/customers?page=${currentPage}&limit=${currentLimit}&sort=${currentSort}&search=${search}`
        )
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
    const onSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        getCustomersList()
    }

    useEffect(() => {
        getCustomersList()
    }, [currentPage, currentLimit, currentSort, currentLastPage])

    if (isLoading) return <p>Loading...</p>

    const pageLinks = []
    for (let i = 1; i <= currentLastPage; i++) {
        pageLinks.push(
            <li
                key={i}
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
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center">
                                <form className="flex items-center" onSubmit={handleSearchSubmit}>
                                    <div className="mr-4">
                                        <Label htmlFor="sort">Sort</Label>

                                        <select
                                            id="sort"
                                            value={currentSort}
                                            required
                                            onChange={onSortChangeHandler}>
                                            <option value="asc">Asc</option>
                                            <option value="desc">Desc</option>
                                        </select>
                                    </div>

                                    <div className="mr-4">
                                        <Label htmlFor="limit">Limit</Label>
                                        <select
                                            id="limit"
                                            value={currentLimit}
                                            required
                                            onChange={onLimitChangeHandler}>
                                            <option value={1}>1</option>
                                            <option value={5}>5</option>
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                            <option value={30}>30</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label htmlFor="simple-search">Search</Label>
                                        <input className="mr-4" type="text" id="search" placeholder="Search (minimum 4 letters)" value={search} onChange={onSearchChange} minLength="4"/>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Search</button>
                                    </div>
                                </form>
                            </div>
                            <Customer data={data} loading={isLoading}></Customer>

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
