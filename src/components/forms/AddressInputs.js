import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useState } from 'react'
import axios from '@/lib/axios'
import MyCombobox from '@/components/MyCombobox'

const AddressInputs = ({ onAddressChange, errors, ...props }) => {
    const [district, setDistrict] = useState('-----')
    const [mukim, setMukim] = useState('-----')
    const [village, setVillage] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [houseNumber, setHouseNumber] = useState('')
    const [simpang, setSimpang] = useState('')
    const [street, setStreet] = useState('')
    const [buildingName, setBuildingName] = useState('')
    const [block, setBlock] = useState('')
    const [floor, setFloor] = useState('')
    const [unit, setUnit] = useState('')

    const onHouseNumberChangeHandler = event => {
        const value = event.target.value
        setHouseNumber(value)
        emitNewAddress({ houseNumber: value })
    }
    const onSimpangChangeHandler = event => {
        const value = event.target.value
        setSimpang(value)
        emitNewAddress({ simpang: value })
    }
    const onStreetChangeHandler = event => {
        const value = event.target.value
        setStreet(value)
        emitNewAddress({ street: value })
    }
    const onBuildingNameChangeHandler = event => {
        const value = event.target.value
        setBuildingName(value)
        emitNewAddress({ buildingName: value })
    }
    const onBlockChangeHandler = event => {
        const value = event.target.value
        setBlock(value)
        emitNewAddress({ block: value })
    }
    const onFloorChangeHandler = event => {
        const value = event.target.value
        setFloor(value)
        emitNewAddress({ floor: value })
    }
    const onUnitChangeHandler = event => {
        const value = event.target.value
        setUnit(value)
        emitNewAddress({ unit: value })
    }

    const onPostalCodeChangeHandler = event => {
        const value = event.target.value.trim()
        setPostalCode(value)
        emitNewAddress({ postalCode: value })
    }

    const onVillageSelected = value => {
        setVillage(value.name)
        setMukim(value.mukim.name)
        setDistrict(value.mukim.district.name)
        emitNewAddress({
            village: value.name,
            mukim: value.mukim.name,
            district: value.mukim.district.name,
        })
        if (value.id != '') {
            axios
                .get(`/api/postalcode?search=${value.id}`)
                .then(res => {
                    const newPostalCode = res.data[0].name
                    setPostalCode(newPostalCode)
                    emitNewAddress({ postalCode: newPostalCode })
                })
                .catch(error => {
                    console.error(`Error: ${error}`)
                })
        }
    }

    const emitNewAddress = (overrides = {}) => {
        onAddressChange({
            district,
            mukim,
            village,
            postalCode,
            houseNumber,
            simpang,
            street,
            buildingName,
            block,
            floor,
            unit,
            ...overrides,
        })
    }

    return (
        <div className="mt-4">
            <div>
                <Label htmlFor="addressLabel">Kampung</Label>

                <div id="addressLabel">
                    <MyCombobox onSelected={onVillageSelected} />
                </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                    <Label htmlFor="districtId">District</Label>
                    <p id="districtId" className="text-sm">{district}</p>
                </div>
                <div>
                    <Label htmlFor="mukimId">Mukim</Label>
                    <p id="mukimId" className="text-sm">{mukim}</p>
                </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                    <Label htmlFor="postal_code_id">Postal Code</Label>

                    <Input
                        id="postal_code_id"
                        type="text"
                        value={postalCode}
                        className="block mt-1 w-full"
                        onChange={onPostalCodeChangeHandler}
                    />
                </div>
                <div>
                    <Label htmlFor="house_number">House Number</Label>

                    <Input
                        id="house_number"
                        type="text"
                        value={houseNumber}
                        placeholder="e.g. No 10"
                        className="block mt-1 w-full"
                        onChange={onHouseNumberChangeHandler}
                    />

                    <InputError
                        messages={errors.house_number}
                        className="mt-2"
                    />
                </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                    <Label htmlFor="simpang">Simpang</Label>

                    <Input
                        id="simpang"
                        type="text"
                        value={simpang}
                        placeholder="e.g. Simpang 51-1"
                        className="block mt-1 w-full"
                        onChange={onSimpangChangeHandler}
                    />

                    <InputError messages={errors.simpang} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="street">Street</Label>

                    <Input
                        id="street"
                        type="text"
                        value={street}
                        className="block mt-1 w-full"
                        placeholder="e.g. Jalan Pasir Berakas"
                        onChange={onStreetChangeHandler}
                    />

                    <InputError messages={errors.street} className="mt-2" />
                </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                    <Label htmlFor="building_name">Building Name</Label>

                    <Input
                        id="building_name"
                        type="text"
                        value={buildingName}
                        className="block mt-1 w-full"
                        placeholder="e.g. 118 Residence"
                        onChange={onBuildingNameChangeHandler}
                    />

                    <InputError
                        messages={errors.building_name}
                        className="mt-2"
                    />
                </div>
                <div>
                    <Label htmlFor="block">Block</Label>

                    <Input
                        id="block"
                        type="text"
                        value={block}
                        placeholder="e.g. Block B"
                        className="block mt-1 w-full"
                        onChange={onBlockChangeHandler}
                    />

                    <InputError messages={errors.block} className="mt-2" />
                </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                    <Label htmlFor="floor">Floor</Label>

                    <Input
                        id="floor"
                        type="text"
                        value={floor}
                        placeholder="e.g. 1st Floor"
                        className="block mt-1 w-full"
                        onChange={onFloorChangeHandler}
                    />

                    <InputError messages={errors.floor} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="unit">Unit</Label>

                    <Input
                        id="unit"
                        type="text"
                        value={unit}
                        className="block mt-1 w-full"
                        placeholder="e.g. Unit 2A"
                        onChange={onUnitChangeHandler}
                    />

                    <InputError messages={errors.unit} className="mt-2" />
                </div>
            </div>
        </div>
    )
}

export default AddressInputs
