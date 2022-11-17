import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import axios from '@/lib/axios'

const VillageComboBox = ({ selectedVillage, onVillageChange }) => {
    const [data, setData] = useState([])
    const [query, setQuery] = useState('')

    const queryHandler = event => {
        setQuery(event.target.value)
        axios
            .get(`/api/autocomplete?search=${query}`)
            .then(res => {
                setData(res.data)
            })
            .catch(error => {
                console.error(`Error: ${error}`)
            })
    }

    const displayValueHandler = value => {
        if (value !== null && value !== '') {
            return value.name
        }
        return ''
    }

    const filteredData =
        query === ''
            ? data
            : data.filter(v => {
                  return v.name.toLowerCase().includes(query.toLowerCase())
              })

    return (
        <Combobox value={selectedVillage} onChange={onVillageChange}>
            <Combobox.Input
                className="w-full"
                displayValue={displayValueHandler}
                onChange={queryHandler}
            />
            <Combobox.Options>
                {filteredData.map(v => (
                    <Combobox.Option key={v.id} value={v}>
                        {v.name}
                    </Combobox.Option>
                ))}
            </Combobox.Options>
        </Combobox>
    )
}

export default VillageComboBox
