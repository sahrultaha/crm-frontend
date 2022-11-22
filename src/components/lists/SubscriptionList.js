import { useGetData } from '@/hooks/getData'
import Button from '@/components/Button'

const SubscriptionList = () => {
    const {
        data,
        loading,
        currentLastPage,
        setCurrentPage,
    } = useGetData('/api/subscription')


    let listItems = []
    if (!loading && data.length > 0) {
        listItems = data.map(d => {
            return (
                <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.subscription_id}</td>
                    <td>{d.subscription.customer.name}</td>
                    <td>{d.number.number}</td>
                    <td>{d.imsi.imsi}</td>
                </tr>
            )
        })
    }

    const pageLinks = []
    for (let i = 1; i <= currentLastPage; i++) {
        pageLinks.push(
            <li
                key={i}
                id={'page-link-' + i}
                className="mr-2 cursor-pointer"
                onClick={() => setCurrentPage(i)}>
                {i}
            </li>,
        )
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <table className="w-full table-fixed">
                <thead>
                    <tr className="text-left">
                        <th>ID</th>
                        <th>Subscription ID</th>
                        <th>Customer</th>
                        <th>Number</th>
                        <th>IMSI</th>
                    </tr>
                </thead>
                <tbody>{listItems}</tbody>
            </table>

            <div>
                <h2>Pages</h2>
                <ul className="flex items-center">{pageLinks}</ul>
            </div>
        </div>
    )
}

export default SubscriptionList
