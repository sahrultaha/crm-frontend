import { useRouter } from 'next/router'
import Button from '@/components/Button'
const PackCreationConfirmation = ({ onConfirm }) => {
    const router = useRouter()
    return (
        <div>
            <p>Do you want to create a new pack?</p>
            <div className="flex">
                <Button
                    onClick={() => router.push('/customers')}
                    className="mr-2">
                    No
                </Button>
                <Button onClick={() => onConfirm(true)}>Yes</Button>
            </div>
        </div>
    )
}

export default PackCreationConfirmation
