import axios from '@/lib/axios'
import { useState, useEffect, useCallback } from 'react'

export const useIndex = (url, defaultLimit = 10, defaultSort = 'desc') => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLastPage, setCurrentLastPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(defaultLimit)
    const [currentSort, setCurrentSort] = useState(defaultSort)

    const getList = useCallback(() => {
        if (loading) return

        console.log('getting list...')
        setLoading(true)
        let queryParams = new URLSearchParams(
            `page=${currentPage}&limit=${currentLimit}&sort=${currentSort}`,
        )

        axios
            .get(url + `?${queryParams.toString()}`)
            .then(resp => {
                setData(resp.data.data)
                setCurrentLastPage(resp.data.meta.last_page)
            })
            .catch(e => {
                console.error('error fetching data', e)
                setData([])
                setError(e)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [loading, currentPage, currentLimit, currentSort])

    useEffect(() => {
        getList()
    }, [currentPage, currentLimit, currentSort, currentLastPage])

    return {
        data,
        loading,
        error,
        currentPage,
        currentLastPage,
        currentLimit,
        currentSort,
        setCurrentPage,
        setCurrentLimit,
        setCurrentSort,
    }
}
