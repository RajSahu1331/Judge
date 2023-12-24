import { useRef, useState } from 'react';

const FileUploadButton = ({ onFileSelected }) => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        console.log("File input change event triggered");
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            console.log("Selected file:", file);
            setSelectedFile(file);
            onFileSelected(file);
            setError(null); // Reset any previous errors
        } else {
            setError('Please select a file.'); // Set an error message for no file selected
        }
    };

    return (
        <div className="mt-4">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            {error && (
                <div className="text-red-500">{error}</div> // Display error message
            )}
            {selectedFile && (
                <div className="mt-2 mb-3">
                    <h6>Selected File {selectedFile.name}</h6>
                </div>
            )}
        </div>
    );
};

export default FileUploadButton;
