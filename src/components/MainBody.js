import { Children } from 'react'

const MainBody = ({ children }) => (
    <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-12 bg-white border-b border-gray-200">
                    {children}
                </div>
            </div>
        </div>
    </div>
)

export default MainBody
