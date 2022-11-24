import Input from '@/components/Input'
import Label from '@/components/Label'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'

const SearchPackByNumber = ({
    onPackChange,
    onPackSearchCompleteChange,
    onNumberChange,
    ...props
}) => {
    const [number, setNumber] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            if (number === '' || number.length < 7) {
                return
            }

            onNumberChange(number)

            const endpoint = '/api/packs?'
            const queryString = new URLSearchParams('number')

            queryString.set('number', number)

            axios
                .get(`${endpoint}${queryString}`)
                .then(res => {
                    if (res.data.data.length > 0) {
                        const firstResult = res.data.data[0]
                        onPackChange({ ...firstResult })
                    }
                })
                .catch(e => console.error('Pack search failed', e))
                .finally(() => onPackSearchCompleteChange(true))
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
