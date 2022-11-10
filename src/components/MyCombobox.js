import { useState, useEffect } from 'react'
import { Combobox } from '@headlessui/react'
import axios from '@/lib/axios'

const MyCombobox = (props) => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [selectedData, setSelectedData] = useState('')

    const setSelectedDataHandler = (value) => {
        setSelectedData(value)
        props.onSelected(value);
    }

    const searchHandler = (event) => {
        setSearch(event.target.value)
        axios
            .get(`/api/autocomplete?search=${search}`)
            .then(res => {
                setData(res.data)
            })                
            .catch(error=> {
                console.error(`Error: ${error}`)
            })
    }

    const filteredData = 
        search === ''
        ? data
        : data.filter((village) => {
            return village.name.toLowerCase().includes(search.toLowerCase())
            })

        
    return (
        <Combobox value={selectedData} onChange={setSelectedDataHandler}>
            <Combobox.Input className='w-full' displayValue={(village) => village.name} value={search} onChange={searchHandler}/>
                <Combobox.Options>
                    {filteredData.map((village) => (
                        <Combobox.Option key={village.id} value={village}>
                            {village.name}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
        </Combobox>
    )
}

export default MyCombobox
