import { useState, useEffect } from 'react'
import Button from '@/components/Button'
import { useRouter } from 'next/router'
import Input from '@/components/Input'
import Label from '@/components/Label'
import axios from '@/lib/axios'
import PackCreationConfirmation from '@/components/forms/packs/PackCreationConfirmation'

const CreatePackForm = ({ number, onPackCreated }) => {
    const router = useRouter()
    const [wantsNewPack, setWantsNewPack] = useState(false)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const [imsi, setImsi] = useState('')
    const [pin, setPin] = useState('')
    const [puk1, setPuk1] = useState('')
    const [puk2, setPuk2] = useState('')
    const [productId, setProductId] = useState('')
    const [installationDate, setInstallationDate] = useState('')
    const [expiryDate, setExpiryDate] = useState('')

    const onImsiChangeHandler = ev => setImsi(ev.target.value)
    const onPinChangeHandler = ev => setPin(ev.target.value)
    const onPuk1ChangeHandler = ev => setPuk1(ev.target.value)
    const onPuk2ChangeHandler = ev => setPuk2(ev.target.value)
    const onProductIdChangeHandler = ev => setProductId(ev.target.value)

    useEffect(() => {
        setLoading(true)
        axios
            .get('/api/products')
            .then(resp => {
                setProducts(resp.data.data)
            })
            .catch(err => console.error('error fetching products', err))
            .finally(() => setLoading(false))
    }, [])

    const onSubmitHandler = async ev => {
        ev.preventDefault()
        if (loading) return

        if (
            number === '' ||
            imsi === '' ||
            pin === '' ||
            puk1 === '' ||
            puk2 === '' ||
            productId === '' ||
            installationDate === '' ||
            expiryDate === ''
        ) {
            console.error('Form is not completed...')
            return
        }

        const data = {
            number: number,
            imsi: imsi,
            pin: pin,
            puk_1: puk1,
            puk_2: puk2,
            product_id: productId,
            installation_date: installationDate,
            expiry_date: expiryDate,
        }

        setLoading(true)

        try {
            const response = await axios.post('/api/packs', data)
            console.log('response is', response)

            const packId = response.data.id
            const packDetailsResponse = await axios.get(`/api/packs/${packId}`)
            console.log('pack details is', packDetailsResponse)
            onPackCreated(packDetailsResponse.data)
        } catch (e) {
            console.error('error creating pack', e)
            setLoading(false)
        }
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (!wantsNewPack) {
        return <PackCreationConfirmation onConfirm={setWantsNewPack} />
    }

    if (products.length === 0) {
        return <p>No products found</p>
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <Label htmlFor="imsi">IMSI</Label>

                <Input
                    id="imsi"
                    type="text"
                    value={imsi}
                    className="block w-full"
                    required
                    onChange={onImsiChangeHandler}
                />
            </div>

            <div>
                <Label htmlFor="pin">PIN</Label>

                <Input
                    id="pin"
                    type="text"
                    value={pin}
                    className="block w-full"
                    required
                    onChange={onPinChangeHandler}
                />
            </div>

            <div>
                <Label htmlFor="puk1">Puk 1</Label>

                <Input
                    id="puk1"
                    type="text"
                    value={puk1}
                    className="block w-full"
                    required
                    onChange={onPuk1ChangeHandler}
                />
            </div>

            <div>
                <Label htmlFor="puk2">Puk 2</Label>

                <Input
                    id="puk2"
                    type="text"
                    value={puk2}
                    className="block w-full"
                    required
                    onChange={onPuk2ChangeHandler}
                />
            </div>

            <div>
                <Label htmlFor="productId"></Label>

                <select
                    id="productId"
                    value={productId}
                    onChange={onProductIdChangeHandler}
                    required>
                    <option>Select A Product</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <Label htmlFor="installationDate">Installation Date</Label>

                <Input
                    id="installationDate"
                    type="date"
                    value={installationDate}
                    className="block mt-1 w-full"
                    required
                    onChange={ev => setInstallationDate(ev.target.value)}
                />
            </div>

            <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>

                <Input
                    id="expiryDate"
                    type="date"
                    value={expiryDate}
                    className="block mt-1 w-full"
                    required
                    onChange={ev => setExpiryDate(ev.target.value)}
                />
            </div>

            <Button>Create Pack</Button>
        </form>
    )
}

export default CreatePackForm
