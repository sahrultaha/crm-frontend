import Link from 'next/link'

const CustomerAlreadyExists = ({ customer }) => {
    const href = '/customers/' + customer.id
    return (
        <div className="my-2 py-2 px-4 bg-red-100 text-sm">
            <p>
                Customer already exist! Click{' '}
                <Link href={href}>
                    <a className="text-blue-500">here</a>
                </Link>{' '}
                to view
            </p>
        </div>
    )
}

export default CustomerAlreadyExists
