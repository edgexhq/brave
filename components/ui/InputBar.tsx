

import { X } from "lucide-react"

export default function InputBar({ emails, setEmails }: any) {
    const handleDelete = (id: any) => {
        setEmails(emails.filter((email: any) => email.id !== id))
    }
    console.log(emails)
    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-wrap gap-4">
                {
                    emails.length === 0 ? (
                        <p className="text-gray-500 text-center w-full">No emails added</p>
                    ) : null
                }
                {emails.map((email: any) => (
                    <div
                        key={email.id}
                        className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="relative p-4 pr-8">
                            <p className="text-gray-500">{email.receiver}</p>
                            <button
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                onClick={() => handleDelete(email.id)}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}