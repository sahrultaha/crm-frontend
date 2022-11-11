import Input from '@/components/Input'
import Label from '@/components/Label'
import axios from '@/lib/axios'
import VillageComboBox from '@/components/forms/VillageComboBox'

const AddressInputs = ({
    district,
    mukim,
    village,
    postalCode,
    village_id,
    district_id,
    mukim_id,
    postal_code_id,
    houseNumber,
    simpang,
    street,
    buildingName,
    block,
    floor,
    unit,
    setDistrict,
    setMukim,
    setVillage,
    setPostalCode,
    setVillageId,
    setDistrictId,
    setMukimId,
    setPostalCodeId,
    setHouseNumber,
    setSimpang,
    setStreet,
    setBuildingName,
    setBlock,
    setFloor,
    setUnit,
    ...props
}) => {
    
    const onHouseNumberChangeHandler = event => setHouseNumber(event.target.value)
    const onSimpangChangeHandler = event => setSimpang(event.target.value)
    const onStreetChangeHandler = event => setStreet(event.target.value)
    const onBuildingNameChangeHandler = event => setBuildingName(event.target.value)
    const onBlockChangeHandler = event => setBlock(event.target.value)
    const onFloorChangeHandler = event => setFloor(event.target.value)
    const onUnitChangeHandler = event => setUnit(event.target.value)
    const onPostalCodeChangeHandler = event => setPostalCode(event.target.value.trim())

    const onVillageChange = value => {
        setVillage(value.name)
        setVillageId(value.id)
        setMukim(value.mukim.name)
        setMukimId(value.mukim.id)
        setDistrict(value.mukim.district.name)
        setDistrictId(value.mukim.district.id)
        if (value.id != '') {
            axios
                .get(`/api/postalcode?search=${value.id}`)
                .then(res => {
                    const newPostalCode = res.data[0].name
                    const newPostalCodeId = res.data[0].id
                    setPostalCode(newPostalCode)
                    setPostalCodeId(newPostalCodeId)
                })
                .catch(error => {
                    console.error(`Error: ${error}`)
                })
        }
    }

    return (
        <div className="mt-4">
            <div>
                <Label htmlFor="addressLabel">Kampung</Label>

                <div id="addressLabel">
                    <VillageComboBox 
                        village={village} onVillageChange={onVillageChange} />
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
                </div>
            </div>
        </div>
    )
}

export default AddressInputs
