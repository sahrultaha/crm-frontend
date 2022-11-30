import IndexTable from '@/components/Layouts/IndexTable'
import TimestampDiv from '@/components/TimestampDiv'

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
        render: (created_at) => <TimestampDiv time={created_at}></TimestampDiv>
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

const ImsiUploadTable = () => (
    <IndexTable url="/api/imsi/bulk" columns={columns}></IndexTable>
)

export default ImsiUploadTable
