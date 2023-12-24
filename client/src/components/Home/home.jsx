import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import NavBar from '../Headers/Navbar.jsx'
import ReactPaginate from "react-paginate";
import ProblemPage from "../Problem/ProblemPage.jsx";

export default function AllProblems() {

    const [data, setData] = useState([]);

    async function fetchData() {
        try {
            let response = await axios.get("http://localhost:8000/api/problems");
            const fetchedData = response.data
            console.log(fetchedData, "abcd");
            setData(fetchedData)
        } catch (err) {
            console.log("Eror :", err)
        }
    }
    useEffect(() => {
        console.log(data)
        fetchData();
    }, []);



    // Pagination Start
    const [pageCount, setPageCount] = useState(0);
    // console.log("Page Count:", pageCount);

    const itemPerPage = 50;
    let pageVisited = pageCount * itemPerPage;

    const totalPages = Math.ceil(data.length / itemPerPage);
    const pageChange = ({ selected }) => {
        setPageCount(selected);
    };

    // pagination end

    return (

        <div>
            <NavBar />
            <div className="m-8 relative overflow-x-auto ">
                <table className="w-3/4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                Problem Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Difficulty
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data
                            .slice(pageVisited, pageVisited + itemPerPage)
                            .map((data) => (
                                <tr key={data._id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <td className='text-center py-2'>
                                        <Link to={`/problem/${data._id}`} className="text-blue-600 hover:underline">
                                            {data.title}
                                        </Link>
                                    </td>
                                    <td className='text-center py-2'>
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold 
                                    ${data.difficulty === "easy" ? "bg-green-500 text-white" :
                                                data.difficulty === "medium" ? "bg-yellow-500 text-gray-900" :
                                                    data.difficulty === "hard" ? "bg-red-500 text-white" : ""
                                            }`}>
                                            {data.difficulty}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <br />
                <br />
                {/* Pagination */}
                <ReactPaginate
                    pageCount={totalPages}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={1}
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    containerClassName={'flex items-center justify-center space-x-2 my-2'}
                    previousClassName={'px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200'}
                    nextClassName={'px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200'}
                    activeClassName={'px-4 py-2 rounded-md border border-blue-500 bg-blue-500 text-white'}
                    breakClassName={'mx-2 text-gray-600'}
                    disabledClassName={'opacity-50 cursor-not-allowed'}
                    renderOnZeroPageCount={null}
                    onPageChange={pageChange}
                />
            </div>
        </div>

    );
}