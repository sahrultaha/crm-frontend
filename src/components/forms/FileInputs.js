import Input from '@/components/Input'
import Label from '@/components/Label'

const FileInputs = ({
    setIcFront,
    setIcBack,
}) => {
    const onIcFrontChangeHandler = event => setIcFront(event.target.files[0])
    const onIcBackChangeHandler = event => setIcBack(event.target.files[0])

    return (
        <div>
            <div className="mt-4">
                <Label htmlFor="icFront">Ic Front</Label>

                <Input
                    id="icFront"
                    type="file"
                    className="block mt-1 w-full"
                    required
                    onChange={onIcFrontChangeHandler}
                />
            </div>

            <div className="mt-4">
                <Label htmlFor="icBack">Ic Back</Label>

                <Input
                    id="icBack"
                    type="file"
                    className="block mt-1 w-full"
                    required
                    onChange={onIcBackChangeHandler}
                />
            </div>
        </div>
    )
}

export default FileInputs
