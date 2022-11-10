import React from 'react'
const Input = React.forwardRef(
    ({ disabled = false, className, ...props }, ref) => (
        <input
            ref={ref}
            disabled={disabled}
            className={`${className} rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
            {...props}
        />
    ),
)

export default Input
