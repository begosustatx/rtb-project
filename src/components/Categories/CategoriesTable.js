import axios from "axios"
import { useState, useEffect } from "react";

export default function Example() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res =  await axios.get("http://localhost:8000/categories");
            setCategories(res.data.map(cat => ({ ...cat, "selected": false })))
        }
        fetchData();
        console.log(categories)
        },[]);
    return (
    <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                    <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Topic ID
                    </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {categories.map((category) => (
                    <tr key={category._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {category.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category.topics_id}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    </div>
    )
}
