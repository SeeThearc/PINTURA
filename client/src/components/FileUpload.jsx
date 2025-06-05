import axios from "axios";
import { useState } from "react";

const PINATA_API = import.meta.env.VITE_PINATA_API_KEY;
const PINATA_SECRET_API_KEY = import.meta.env.VITE_PINATA_SECRET_API_KEY;

const FileUpload = ({ con, acc }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No Image Selected");
    const [isUploading, setIsUploading] = useState(false);
    const contract = con.state.contract;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            setIsUploading(true);
            try {
                const formData = new FormData();
                formData.append("file", file);
                
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: PINATA_API,
                        pinata_secret_api_key: PINATA_SECRET_API_KEY,
                        "Content-Type": "multipart/form-data",
                    },
                });
                
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                await contract.add(acc, ImgHash);
                alert("Successfully Image Uploaded");
                setFileName("No image selected");
                setFile(null);
            } catch (error) {
                console.error("Unable to connect to Pinata:", error);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const retriveFile = async(e) =>{
        const data = e.target.files[0];
        console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };

    return (
        <form className="file-upload-form" onSubmit={handleSubmit}>
            <div className="file-input-wrapper">
                <input 
                    type="file" 
                    disabled={!acc} 
                    id="fileupload" 
                    name="data" 
                    className="file-input"
                    onChange={retriveFile}
                    accept="image/*"
                />
                <label htmlFor="fileupload" className="file-input-label">
                    {file ? "Change Image" : "Choose Image to Upload"}
                </label>
            </div>
            
            <div className="file-name">
                📁 {fileName}
            </div>
            
            <button 
                type="submit" 
                disabled={!file || isUploading} 
                className="btn btn-primary"
            >
                {isUploading ? (
                    <>
                        <span className="loading"></span>
                        Uploading...
                    </>
                ) : (
                    "Upload to IPFS"
                )}
            </button>
        </form>
    );
};

export default FileUpload;