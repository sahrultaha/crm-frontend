import { useGetData } from '@/hooks/getData'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from '@/lib/axios'

const SubscriptionList = () => {
    const router = useRouter()
    const [data, setData] = useState([[]])
    // const {
    //     id,
    //     data,
    //     loading,
    // } = useGetData(`/api/subscription/${id}`)
    // console.log(data)

    useEffect(() => {
        if (!router.isReady) return
        const { id: CustomerId } = router.query
        axios
            .get(`/api/subscription/${CustomerId}`)
            .then(response => {
                setData(response.data[0])
            })
            .catch(error => {
                console.log('Error fetching subscription details...', error)
            })
    }, [router.isReady])

    let listItems = []
    // if (!data) {
        listItems = data.map(d => {
            return (
                <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.subscription_id}</td>
                    <td>{d.number_id}</td>
                    <td>{d.imsi_id}</td>
                </tr>
            )
        })
    // }

    return (
        <div>
            <table className="w-full table-fixed">
                <thead>
                    <tr className="text-left">
                        <th>ID</th>
                        <th>Subscription ID</th>
                        <th>Number ID</th>
                        <th>IMSI ID</th>
                    </tr>
                </thead>
                <tbody>{listItems}</tbody>
            </table>
        </div>
    )
}

export default SubscriptionList
