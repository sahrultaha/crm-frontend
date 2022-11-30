import Button from '@/components/Button'
import Link from 'next/link'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import InputFile from './InputFile'

const FileUpload = ({ relation_id, relation_type_id, file_category_id }) => {
    const [file, setFile] = useState(null)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const headers = {
        headers: {
            accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    }
    const submitForm = async event => {
        event.preventDefault()
        event.target.value = null
        setSuccess(false)
        setError(null)
        const formData = new FormData()
        formData.append('relation_id', relation_id)
        formData.append('relation_type_id', relation_type_id)
        formData.append('file_category_id', file_category_id)
        formData.append('file', file)
        await axios.post('/api/files', formData, headers).then(
            async res => {
                if (res.status == 201) {
                    console.log('success')
                    console.log(file)
                    setSuccess(true)
                }
            },
            async error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    if (error.response.data) {
                        if (error.response.data.errors) {
                            if (
                                error.response.data.errors.hasOwnProperty(
                                    'file',
                                ) &&
                                error.response.data.errors.file.includes(
                                    'validation.file_category',
                                )
                            ) {
                                setError('Invalid file type')
                                return
                            }
                        }
                        setError(error.response.data.message)
                    } else {
                        setError(JSON.stringify(error.response))
                    }
                    return
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    setError(error.request)
                    return
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setError(error.message)
                    return
                }
            },
        )
    }
    return (
        <div>
            <form onSubmit={submitForm}>
                <InputFile
                    setFileHandler={setFile}
                    required="required"
                    name="fileUpload"></InputFile>
                <Button>Submit</Button>
            </form>
            {success && (
                <div className="w-full" id="uploadBulkInfo">
                    Successfully upload {file.name}{' '}
                </div>
            )}
            {error && (
                <div className="w-full text-red-400" id="uploadBulkInfo">
                    {error}
                </div>
            )}
        </div>
    )
}

export default FileUpload
