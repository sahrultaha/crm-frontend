import React from 'react'
const InputFile = React.forwardRef(
    ({ setFileHandler, className, ...props }, ref) => {
        const onChangeHandler = event => setFileHandler(event.target.files[0])
        return (
            <input
                ref={ref}
                onChange={onChangeHandler}
                className={`${className} rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                type="file"
                {...props}
            />
        )
    },
)

export default InputFile
