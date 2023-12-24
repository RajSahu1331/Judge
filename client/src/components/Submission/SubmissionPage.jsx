import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"
import NavBar from '../Headers/Navbar.jsx'
import ReactPaginate from "react-paginate";
import { useSelector } from 'react-redux';


export default function AllSubmissions() {

    const { userInfo, name } = useSelector((state) => state.auth);
    console.log(userInfo, name)

    const { problemName } = useParams();
    const [data, setData] = useState([]);
    const [fileContent, setfileContent] = useState("")

    async function fetchData() {
        try {
            let response = await axios.get(`http://localhost:8000/submission/${problemName}`);
            const fetchedData = response.data
            // console.log(fetchedData, "abcd");
            fetchedData.reverse();
            setData(fetchedData)
        } catch (err) {
            console.log("Eror :", err)
        }
    }
    useEffect(() => {
        fetchData();

    }, []);

    // Function to convert UTC to Indian Standard Time
    const convertToIndianTime = (utcDate) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };

        const indianDate = new Date(utcDate).toLocaleString('en-IN', options);
        return indianDate;
    };
    const handleRowClick = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/getJobInfo/${id}`);
            const content = response.data;
            setfileContent(content);

            // Create a Blob with the content
            const blob = new Blob([content], { type: "text/plain" });

            // Create a URL for the Blob
            const url = URL.createObjectURL(blob);

            // Open the URL in a new tab
            window.open(url);
        } catch (error) {
            console.error("Error handling row click:", error);
        }
    };

    // Pagination Start
    const [pageCount, setPageCount] = useState(0);
    // console.log("Page Count:", pageCount);

    const itemPerPage = 10;
    let pageVisited = pageCount * itemPerPage;

    const totalPages = Math.ceil(data.length / itemPerPage);
    const pageChange = ({ selected }) => {
        setPageCount(selected);
    };

    // pagination end

    return (

        <div>
            <NavBar />
            <div className="m-8 relative overflow-x-auto">
                <table className="w-3/4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        {/* Table headers */}
                        <tr>
                            {/* Add other table headers */}
                            <th scope="col" className="px-6 py-3 text-center">
                                UserName
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Submitted At
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Language
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Verdict
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data
                            .slice(pageVisited, pageVisited + itemPerPage)
                            .map((data) => (
                                <tr key={data._id} className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                                    onClick={() => handleRowClick(data._id)}>
                                    <td className='text-center'>
                                        {/* Style the problem name */}
                                        <span className="rounded-md px-2 py-1 bg-blue-500 text-white">
                                            {name}
                                        </span>
                                    </td>
                                    {/* Add other table data */}
                                    <td className='text-center'>
                                        {convertToIndianTime(data.submittedAt)}
                                    </td>
                                    <td className='text-center'>
                                        {/* Encapsulated language */}
                                        <span className="rounded-md px-2 py-1 bg-black text-white">
                                            {data.language}
                                        </span>
                                    </td>
                                    <td className='text-center'>
                                        {/* Button for verdict */}
                                        <button
                                            className={`rounded-md px-2 py-1 ${data.verdict === "correct" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                                        >
                                            {data.verdict}
                                        </button>
                                    </td>

                                    {/* Other table data */}
                                </tr>
                            ))}
                    </tbody>
                </table>
                <br />
                <br />

                {/* pagination */}
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

