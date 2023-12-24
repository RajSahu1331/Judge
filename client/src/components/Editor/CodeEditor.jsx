import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from "react-router-dom";
import MonacoEditor from '../MonacoEditor/MonacoEditor.jsx'
// import FileUploadButton from '../FileUpload/FileUpload.jsx';
import axios from 'axios'
import NavBar from '../Headers/Navbar.jsx'
import { useSelector } from 'react-redux';

function CodeEditor({ id }) {

    const { userInfo, name } = useSelector((state) => state.auth);
    console.log(userInfo, name)

    const [problemData, setproblemData] = useState('')
    const [language, setLanguage] = useState("cpp");
    const [selectedFile, setSelectedFile] = useState(null);
    const [editorValue, setEditorValue] = useState(" // Write your code here...");
    const [code, setCode] = useState("");
    const [customInput, setCustomInput] = useState("");
    const [customOutput, setCustomOutput] = useState("");
    const [status, setStatus] = useState("");
    const [jobID, setJobId] = useState("");
    const [jobDetails, setJobDetails] = useState(null);
    const [output, setOutput] = useState("");
    const [problemName, setProblemName] = useState("");
    // const [problemInput, setproblemInput] = useStaet("")

    const navigate = useNavigate();


    async function fetchData() {
        try {
            const url = `http://localhost:8000/api/problems/${id}`;
            let problem = await axios.get(url)
            const fetchedData = problem.data
            // console.log("fetchedData ->", fetchedData)
            setproblemData(fetchedData);
            setProblemName(fetchedData.problem.title);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        const defalutLang = localStorage.getItem("Default-Lang") || "cpp";
        setLanguage(defalutLang);
    }, []);

    const setDefaultLanguage = () => {
        localStorage.setItem("Default-Lang", language);
    };


    const runClickHandler = async (e) => {

        e.preventDefault();
        try {
            setStatus("");
            setJobId("");
            setOutput("");
            setJobDetails(null);

            // const problemName = "xxxxx";
            const requestBody = {
                problemName,
                language,
                code,
                userInput: customInput,
                // Add other non-file data here
            };

            // Perform a POST request sending JSON data
            console.log("userInput", customInput);
            const { data } = await axios.post("http://localhost:8000/run", requestBody);
            // console.log(data);

            setCustomOutput("Compiling...");

            setJobId(data.jobId);

            let intervalId;
            const deleteId = data.jobId;
            intervalId = setInterval(async () => {
                try {
                    const { data: dataRes } = await axios.get("http://localhost:8000/status", {
                        params: { id: data.jobId },
                    });
                    console.log("data", dataRes);

                    if (dataRes.success) {
                        const job = dataRes.job;
                        const jobOutput = job;
                        console.log("Output", jobOutput);

                        if (job.status === "pending") return;

                        let formattedOutput = jobOutput.replace(/\r?\n/g, "\n");

                        // Check if jobOutput is an object and convert it to a string
                        if (typeof jobOutput === 'object') {
                            formattedOutput = JSON.stringify(jobOutput);
                        }

                        setCustomOutput(formattedOutput);
                        clearInterval(intervalId);
                        await axios.delete('http://localhost:8000/deleteJob', {
                            data: {
                                id: deleteId,
                            }
                        });

                    } else {
                        setStatus("Error, please try again!");
                        console.error(dataRes.error);
                        clearInterval(intervalId);
                        setOutput(dataRes.error);
                    }
                } catch (error) {
                    console.error("Error fetching job status:", error);
                    setStatus("Error fetching job status");
                    clearInterval(intervalId);
                }
            }, 1000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.err && error.response.data.err.stderr) {
                const errMsg = error.response.data.err.stderr;
                console.log(errMsg);
                setOutput(errMsg);
            } else {
                console.error("Error connecting to server", error);
                setOutput("Error connecting to server");
            }
        }

    }

    const submitClickHandler = async (e) => {

        e.preventDefault();
        try {
            setStatus("");
            setJobId("");
            setOutput("");
            setJobDetails(null);

            // const problemName = "xxxxx";
            const requestBody = {
                problemName,
                language,
                code,
                // Add other non-file data here
            };

            // Perform a POST request sending JSON data
            const { data } = await axios.post("http://localhost:8000/submit", requestBody);


            setCustomOutput("Compiling...");

            setJobId(data.jobId);

            let intervalId;
            intervalId = setInterval(async () => {
                try {
                    const { data: dataRes } = await axios.get("http://localhost:8000/submit/status", {
                        params: { id: data.jobId },
                    });
                    console.log("data", dataRes);

                    if (dataRes.success) {
                        const job = dataRes.job;
                        const jobOutput = job;
                        console.log("Output", jobOutput);

                        if (job.status === "pending") return;

                        let formattedOutput = jobOutput.replace(/\r?\n/g, "\n");

                        console.log("formattedOutput", formattedOutput);

                        // Check if jobOutput is an object and convert it to a string
                        if (typeof jobOutput === 'object') {
                            formattedOutput = JSON.stringify(jobOutput);
                        }

                        setCustomOutput(formattedOutput);
                        clearInterval(intervalId);
                        navigate(`/submit/${problemName}`, { state: { problemName } });
                    } else {
                        setStatus("Error, please try again!");
                        console.error(dataRes.error);
                        clearInterval(intervalId);
                        setOutput(dataRes.error);
                    }


                } catch (error) {
                    console.error("Error fetching job status:", error);
                    setStatus("Error fetching job status");
                    clearInterval(intervalId);
                }
            }, 1000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.err && error.response.data.err.stderr) {
                const errMsg = error.response.data.err.stderr;
                console.log(errMsg);
                setOutput(errMsg);
            } else {
                console.error("Error connecting to server", error);
                setOutput("Error connecting to server");
            }
        }

    }




    return (
        <>
            <NavBar />
            <div className="flex justify-between bg-gray-100 dark:bg-gray-800 p-8">
                {/* Left Half */}
                {problemData && (
                    <div className="w-1/2 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                        {/* Problem Details */}
                        <h1 className="text-2xl font-semibold mb-4">{problemData.problem.title}</h1>
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Description</h2>
                            <p className="text-gray-700 dark:text-gray-300">{problemData.problem.description}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Examples</h2>
                            {/* Examples Rendering */}
                            {problemData.problem.examples.map((example, index) => (
                                <div key={index} className="border rounded-md p-2 mb-2">
                                    <p><strong>Input:</strong> {example.input}</p>
                                    <p><strong>Output:</strong> {example.output}</p>
                                    <p><strong>Explanation:</strong> {example.explanation}</p>
                                </div>
                            ))}
                        </div>
                        {/* Difficulty */}
                        <div className="mt-4">
                            <button
                                className={`px-4 py-2 rounded-full ${problemData.problem.difficulty === 'easy'
                                    ? 'bg-green-500 text-white'
                                    : problemData.problem.difficulty === 'medium'
                                        ? 'bg-yellow-500 text-white'
                                        : 'bg-red-500 text-white'
                                    }`}
                            >
                                {problemData.problem.difficulty}
                            </button>
                        </div>
                    </div>
                )}

                {/* Right Half */}
                <div className="w-1/2 p-4">
                    <div className="mt-4 my-8">
                        {userInfo && (
                            <Link
                                to={`/submit/${problemName}`}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                            >
                                All Submissions
                            </Link>
                        )}
                    </div>
                    {/* Language Selector */}

                    <div className="mb-4">
                        {/* ... (your language selector and button) */}
                        <div className="mb-4">
                            <label htmlFor="language-select" className="block text-gray-700 text-sm font-bold mb-2">
                                Select Language
                            </label>
                            <div className="relative">
                                <select
                                    id="form-control language-select"
                                    className="w-md p-2 border rounded-md"
                                    value={language}
                                    onChange={(e) => {
                                        let response = window.confirm(
                                            "WARNING: Changing the language will change the saved code"
                                        );
                                        if (response) setLanguage(e.target.value);
                                    }}
                                >
                                    <option value={"cpp"}>C++</option>
                                    <option value={"py"}>Python</option>
                                    <option value={"java"}>Java</option>
                                </select>
                                <button
                                    className="absolute -mt-2.5 mx-3 top-2 bg-blue-500 text-white px-2 py-2 rounded-md"
                                    onClick={setDefaultLanguage}
                                >
                                    Set Default
                                </button>



                                {/* <FileUploadButton onFileSelected={(selectedFile) => setSelectedFile(selectedFile)} /> */}
                            </div>
                        </div>

                        {/* Code Editor */}
                        <div className="mb-4">
                            {/* ... (your code editor component) */}
                            <label htmlFor="code-editor" className="block text-gray-700 text-sm font-bold mb-2">
                                Code Editor
                            </label>
                            <MonacoEditor
                                language={language}
                                value={editorValue}
                                onChange={(newValue) => {
                                    // console.log(newValue)
                                    setEditorValue(newValue);
                                    setCode(newValue); // Update the code state with the editor content
                                }}
                            />
                        </div>

                        {/* Input and Output Textareas */}
                        <div className="flex mb-4">
                            {/* ... (your input and output textareas) */}
                            <div className="w-1/2 pr-2">
                                <label htmlFor="input-text" className="block text-gray-700 text-sm font-bold mb-2">
                                    Input
                                </label>
                                <textarea
                                    id="input-text"
                                    className="w-full h-20 p-2 border rounded-md"
                                    placeholder="Input text..."
                                    value={customInput} // Bind value to the state
                                    onChange={(e) => setCustomInput(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="w-1/2 pl-2">
                                <label htmlFor="output-text" className="block text-gray-700 text-sm font-bold mb-2">
                                    Output
                                </label>
                                <textarea
                                    id="output-text"
                                    className="w-full h-20 p-2 border rounded-md"
                                    placeholder="Output text..."
                                    readOnly
                                    value={customOutput}
                                ></textarea>
                            </div>

                        </div>

                        {/* Submit and Run Buttons */}
                        <div className="mt-4">
                            {userInfo ? ( // Conditionally render based on userInfo existence
                                <>
                                    <button
                                        type="button"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-4"
                                        onClick={submitClickHandler}
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                                        onClick={runClickHandler}
                                    >
                                        Run
                                    </button>
                                </>
                            ) : (
                                <span className="text-red-500">Please log in to use this functionality.</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CodeEditor;