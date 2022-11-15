import { useIndex } from '@/hooks'

const ImsiList = () => {
    const { data, loading, currentLastPage, setCurrentPage } = useIndex('/api/imsi')

    let listItems = []
    if (!loading && data.length > 0) {
        listItems = data.map(d => {
            return (
                <li key={d.id} className='grid grid-cols-5 gap-4'>
                    <p>{d.id}</p>
                    <p>{d.imsi}</p>
                    <p>{d.pin}</p>
                    <p>{d.puk_1}</p>
                    <p>{d.puk_2}</p>
                </li>
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
            <div>
                <ul className='grid grid-cols-5 gap-4'>
                    <li>ID</li>
                    <li>Imsi</li>
                    <li>Pin</li>
                    <li>PUK1</li>
                    <li>PUK2</li>
                </ul>
                <ul className="mb-4">{listItems}</ul>
            </div>
            

            <div>
                <h2>Pages</h2>
                <ul className="flex items-center">{pageLinks}</ul>
            </div>
        </div>
    )
}

export default ImsiList
