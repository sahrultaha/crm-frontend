import { Table } from 'antd'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'

const getQueryParams = params => {
    const queryParams = new URLSearchParams(
        `page=${params.pagination?.current}&limit=${
            params.pagination?.pageSize
        }&sort=${params?.order === 'ascend' ? 'asc' : 'desc'}`,
    )

    return queryParams.toString()
}
const IndexTable = ({ url, columns }) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    })
    const fetchData = () => {
        setLoading(true)
        axios.get(`${url}?${getQueryParams(tableParams)}`).then(response => {
            setData(response.data.data)
            setLoading(false)
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: response.data.meta.total,
                },
            })
        })
    }

    useEffect(() => {
        fetchData()
    }, [JSON.stringify(tableParams)])
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        })
    }
    return (
        <Table
            columns={columns}
            rowKey={record => record.id}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    )
}

export default IndexTable
