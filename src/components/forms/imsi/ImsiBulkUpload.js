import Button from '@/components/Button'
import Link from 'next/link'
import axios from '@/lib/axios'

import { useEffect, useState } from 'react'
import InputFile from '../InputFile'
const ImsiBulkUpload = () => {
    const [file, setFile] = useState(null)
    const [success, setSuccess] = useState(false)
    const submitForm = async event => {
        event.preventDefault()

        const headers = {
            headers: {
                accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        }
        setSuccess(false)
        const icFrontFormData = new FormData()
        icFrontFormData.append('file', file)
        icFrontFormData.append('relation_id', 1)
        icFrontFormData.append('relation_type_id', 1)
        icFrontFormData.append('file_category_id', 3)
        await axios
            .post('/api/files', icFrontFormData, headers)
            .then(async res => {
                if (res.status == 201) {
                    console.log('success')
                    console.log(file)
                    setSuccess(true)
                }
            })
    }
    return (
        <div className="grid grid-cols-1">
            <div>
                <Link href="/templates/bulk-imsi-template.csv">
                    <a
                        className="flex-shrink-0 flex items-center border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 mb-10"
                        id="file-template">
                        File Template
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 hover:border-gray-700 hover:stroke-gray-700 hover:border-solid">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                        </svg>
                    </a>
                </Link>
                <form className="" onSubmit={submitForm}>
                    <InputFile
                        setFileHandler={setFile}
                        className=""
                        required="required"
                        id="bulkUploadImsiFile"></InputFile>
                    <Button>Submit</Button>
                </form>
            </div>

            {success && (
                <div className="w-full" id="uploadBulkInfo">
                    Successfully upload {file.name}{' '}
                </div>
            )}
        </div>
    )
}

export default ImsiBulkUpload
