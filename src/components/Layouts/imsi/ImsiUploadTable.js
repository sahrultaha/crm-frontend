import { Table } from 'antd'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
    },
    {
        title: 'Filename',
        dataIndex: 'filename',
    },
    {
        title: 'Created at',
        dataIndex: 'created_at',
    },
    {
        title: 'Unprocessed',
        dataIndex: 'file_bulk_imsi_count_new',
    },
    {
        title: 'Fail',
        dataIndex: 'file_bulk_imsi_count_fail',
    },
    {
        title: 'Success',
        dataIndex: 'file_bulk_imsi_count_success',
    },
]
const getQueryParams = params => {
    const queryParams = new URLSearchParams(
        `page=${params.pagination?.current}&limit=${
            params.pagination?.pageSize
        }&sort=${params?.order === 'ascend' ? 'asc' : 'desc'}`,
    )

    return queryParams.toString()
}

const ImsiUploadTable = () => {
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
        axios
            .get(`/api/imsi/bulk?${getQueryParams(tableParams)}`)
            .then(response => {
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

export default ImsiUploadTable
