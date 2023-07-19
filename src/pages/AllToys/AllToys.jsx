import { useEffect, useState } from "react";
import ToyRow from "./ToyRow";
import { FaSearch } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import LoadingPage from "../LoadingPage/LoadingPage";

const AllToys = () => {
    const [toys, setToys] = useState([])
    const [searchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://motive-toy-server.up.railway.app/all-toys')
            .then(res => res.json())
            .then(data => {
                setToys(data)
                setLoading(false)
            })
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()

        fetch(`https://motive-toy-server.up.railway.app/getToys-byText?search=${searchText}`)
            .then(res => res.json())
            .then(data => {
                setToys(data)
                setLoading(false)
            })
    }

    if (loading) {
        return <LoadingPage />
    }

    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-10 mt-12 mb-20 overflow-x-auto">
            <Helmet>
                <title>Motive Toy | All Toys</title>
            </Helmet>
            <div className="mb-10 space-y-6">
                <h3 className="font-bold text-3xl text-center text-[#333E48]">Search Toy By Name</h3>
                <form onSubmit={handleSearch} className="w-full md:w-1/2 mx-auto">
                    <div className="relative w-full">
                        <input onChange={(e) => setSearchText(e.target.value)} type="search" id="search-dropdown" className="block px-4 py-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-full border-2 border-[#0787EA] focus:outline-none placeholder:black" placeholder="Search" required />
                        <button type="submit" className="h-full absolute top-0 right-0 p-2.5 px-6 text-sm font-medium text-white bg-[#0787EA] rounded-r-full border-2 border-[#0787EA]">
                            <FaSearch className="text-xl" />
                        </button>
                    </div>
                </form>
            </div>

            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Seller</th>
                        <th>Toy Name</th>
                        <th>Sub-Category</th>
                        <th>Price</th>
                        <th>Available Quantity</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        toys.map((toy, index) => <ToyRow
                            key={toy._id}
                            toy={toy}
                            sl={index}
                        ></ToyRow>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllToys;