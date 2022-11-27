import Button from '@/components/Button'
import Link from 'next/link'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import InputFile from './InputFile'

const FileUpload = ({ relation_id, relation_type_id, file_category_id }) => {
    const [file, setFile] = useState(null)
    const [success, setSuccess] = useState(false)
    const headers = {
        headers: {
            accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    }
    const submitForm = async event => {
        event.preventDefault()
        setSuccess(false)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('relation_id', relation_id)
        formData.append('relation_type_id', relation_type_id)
        formData.append('file_category_id', file_category_id)
        await axios.post('/api/files', formData, headers).then(async res => {
            if (res.status == 201) {
                console.log('success')
                console.log(file)
                setSuccess(true)
            }
        })
    }
    return (
        <div>
            <form className="" onSubmit={submitForm}>
                <InputFile
                    setFileHandler={setFile}
                    className=""
                    required="required"></InputFile>
                <Button>Submit</Button>
            </form>
            {success && (
                <div className="w-full" id="uploadBulkInfo">
                    Successfully upload {file.name}{' '}
                </div>
            )}
        </div>
    )
}

export default FileUpload
