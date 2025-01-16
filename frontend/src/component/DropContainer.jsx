import React, { useRef ,useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { CiFileOn } from "react-icons/ci";
import axios from "axios";
import "./DropContainer.css";



export default function DropContainer() {
  const [draging, setdraging] = useState(false);
  const [file, setfile] = useState(null);
  const [fileDetails, setfileDetails] = useState({name:"" , type: ""})
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const dloadref = useRef(null);
  const progref = useRef(null);
  const [downloadUrl ,setdownloadUrl] = useState(null);



  const draghandler = (e) => {
    e.preventDefault();
    setdraging(true);
  };

  const dragleavehandler = (e) => {
    e.preventDefault();
    setdraging(false);
  };
  const drophandler = (e) => {
    e.preventDefault();
    setdraging(false);
    const droppedFile = e.dataTransfer.files[0];

    if (!droppedFile) return;
    setfileDetails({name: droppedFile.name, type:droppedFile.name});
    setfile(droppedFile);
    uploadfile(droppedFile);
  };

  const handlefilechange = (e) => {
    const selectedfile = e.target.files[0];
    if (!selectedfile) return;

    // Limit file size to 100 MB
    if (selectedfile.size > 100 * 1024 * 1024) {
      alert("File size exceeds 100 MB!");
      return;
    }
    setfileDetails({name:selectedfile.name,type:selectedfile.type});
    setfile(selectedfile);
    uploadfile(selectedfile);
  };

  const uploadfile = async (FileToUpload) => {
    if(uploadProgress != 0){
      progref.current.style.display = "none"? "flex": "none";
    }
    if(dloadref){
      dloadref.current.style.display ="none";
    }
    if (!FileToUpload) {
      alert("no file is selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", FileToUpload);

    try {
      // const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post('http://localhost:5000/api/files', formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentComplete = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          slowProgressUpdate(percentComplete);
          // console.log(`Upload Progress: ${percentComplete}%`);
        },
      });
      const downloadlnk = response.data.file
      setdownloadUrl(downloadlnk);
                           
      // console.log("File uploaded successfully:", response.data.file);
    } catch (error) {
      console.error("upload failed", error);
      alert("upload failed");
    }
  };
  const slowProgressUpdate = (percentComplete) => {
    let currentProgress = uploadProgress;

    const interval = setInterval(() => {
      if (currentProgress < percentComplete) {
        currentProgress += 1; // Adjust this value to control speed
        setUploadProgress(currentProgress);
      } else {
        setUploadProgress(0);
        progref.current.style.display = "none";
        dloadref.current.style.display = "flex";
        clearInterval(interval);
      }
    }, 35); 
  };

  const copyToClipboard = () => {
    if (downloadUrl) {
      navigator.clipboard.writeText(downloadUrl)
      .catch(err => {
        alert(err.message)
      });
    }
  };

  return (
    <>
      <div className="main h-screen w-screen flex items-center justify-center">
        <div className="drop-container h-auto w-1/2 relative flex flex-col items-center rounded-[20px] bg-white p-[2vw] shadow-[10px_10px_14px_rgba(0,0,0,0.2)]">
          <div
            className={`drop-area h-[250px] w-full border-blue-500 border-dashed border-[2px] rounded-[calc(20px-1vw)] p-4 flex flex-col items-center justify-center gap-4 ${
              draging ? "drag bg-blue-50" : ""
            } `}
            onDragOver={draghandler}
            onDragLeave={dragleavehandler}
            onDrop={drophandler}
            aria-label="Drag and drop file area"
          >
            <div className="icon">
              <svg
                width="100px"
                height="100px"
                viewBox="0 0 1024 1024"
                className="icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="animatepath front"
                  d="M242.3 743.4h603.4c27.8 0 50.3-22.5 50.3-50.3V192H192v501.1c0 27.8 22.5 50.3 50.3 50.3z"
                  fill="#FFEA00"
                />
                <path
                  className="animatepath back"
                  d="M178.3 807.4h603.4c27.8 0 50.3-22.5 50.3-50.3V256H128v501.1c0 27.8 22.5 50.3 50.3 50.3z"
                  fill="#FFFF8D"
                />
                <path
                  d="M960 515v384c0 35.3-28.7 64-64 64H128c-35.3 0-64-28.7-64-64V383.8c0-35.3 28.7-64 64-64h344.1c24.5 0 46.8 13.9 57.5 35.9l46.5 95.3H896c35.3 0 64 28.7 64 64z"
                  fill="#3D5AFE"
                />
                <path
                  d="M704 512c0-20.7-1.4-41.1-4.1-61H576.1l-46.5-95.3c-10.7-22-33.1-35.9-57.5-35.9H128c-35.3 0-64 28.7-64 64V899c0 6.7 1 13.2 3 19.3C124.4 945 188.5 960 256 960c247.4 0 448-200.6 448-448z"
                  fill="#536DFE"
                />
              </svg>
            </div>
            <h3>
              Drag and Drop file here or{" "}
              <span
                className="text-blue-500 underline cursor-pointer"
                onClick={() => {
                  fileInputRef.current.click();
                }}
              >
                Choose file
              </span>
            </h3>
            <input
              type="file"
              id="fileinput"
              ref={fileInputRef} 
              className="hidden"
              onChange={handlefilechange}
            />
          </div>
          <dir className="response-container h-auto w-full m-[1vw] ">
            <div ref={progref} className=" hidden progress-container relative p-[1vw] items-center h-[70px] w-full border-[2px] border-blue-200  rounded-[20px] overflow-hidden ">
              <div style={{width:`${uploadProgress}% `, transitionProperty:"width", transition:"ease .4s"}} className=" h-full w-full absolute left-0 bg-blue-50 z-[0]"></div>
                <div className="progress-left flex items-center justify-center h-full w-fit mr-2 z-[1]"><CiFileOn className="text-[30px] font-thin" /></div>
                <div className="progress-Right w-full z-[1]">
                  <p className="text-{4em}">{fileDetails.name}</p>
                  <p className="text-sm text-stone-600">Uploading...{uploadProgress}</p>
                <div style={{width:`${uploadProgress}% `, transitionProperty:"width", transition:"ease .4s"}} className="progressbar h-[3px] bg-blue-300"></div>
                </div>
            </div>
            <div ref={dloadref} className="hidden download-link-container h-auto flex-col items-center">
              <h3 className="mb-[10px]">Link expires in 24 hrs</h3>
              <div className="download-link h-[35px] w-full border-[2px] flex items-center justify-between  rounded-[10px] p-[1vw] border-dashed bg-blue-50 text-stone-600 border-blue-400"><p className="truncate" >{downloadUrl}</p><MdOutlineContentCopy onClick={copyToClipboard()} className="text-lg cursor-pointer"/></div>
            </div>
          </dir>
        </div>
      </div>
    </>
  );
}