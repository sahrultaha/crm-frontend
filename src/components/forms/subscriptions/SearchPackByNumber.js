import Input from '@/components/Input'
import Label from '@/components/Label'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'

const SearchPackByNumber = ({ onPackChange, ...props }) => {
    const [number, setNumber] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            if (number === '') {
                return
            }

            const endpoint = '/api/packs?'
            const queryString = new URLSearchParams('number')

            queryString.set('number', number)

            axios
                .get(`${endpoint}${queryString}`)
                .then(res => {
                    if (res.data.data.length > 0) {
                        const firstResult = res.data.data[0]
                        onPackChange({ ...firstResult })
                        return
                    }
                })
                .catch(e => console.error('Pack search failed', e))
        }, 500)

        return () => clearTimeout(timer)
    }, [number])

    const onNumberChangeHandler = event => {
        const value = event.target.value.trim()
        setNumber(value)
    }

    return (
        <div>
            <div>
                <Label htmlFor="number">MSISDN(Number)</Label>

                <Input
                    id="number"
                    type="text"
                    value={number}
                    className="block w-full"
                    required
                    onChange={onNumberChangeHandler}
                />
            </div>
        </div>
    )
}

export default SearchPackByNumber
