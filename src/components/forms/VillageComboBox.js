import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import axios from '@/lib/axios'

const VillageComboBox = ({ village, onVillageChange }) => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState(village.name)
    const [selectedData, setSelectedData] = useState('')


    const setSelectedDataHandler = value => {
        setSelectedData(value)
        onVillageChange(value)
    }

    const searchHandler = event => {
        setSearch(event.target.value)
        axios
            .get(`/api/autocomplete?search=${search}`)
            .then(res => {
                setData(res.data)
            })
            .catch(error => {
                console.error(`Error: ${error}`)
            })
    }

    const filteredData =
        search === ''
            ? data
            : data.filter(v => {
                  return v.name
                      .toLowerCase()
                      .includes(search.toLowerCase())
              })

    return (
        <Combobox value={selectedData} onChange={setSelectedDataHandler}>
            <Combobox.Input
                className="w-full"
                displayValue={v => v.name}
                value={search}
                onChange={searchHandler}
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
