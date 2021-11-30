// see https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/ for help

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FileUpload(props) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isFileAnalyzed, setIsFileAnalyzed] = useState(false);
  const [loaded, setLoaded] = useState(0);

  // window.onload = () => {
  //   fetch('http://localhost:7000/clean');
  // };

  const changeHandler = (event) => {
    // event.target.files is an object that contains the details of the files selected
    const files = event.target.files;
    if (checkFileType(event)) {
      setSelectedFile(files);
      setIsFilePicked(true);
    }
  };

  const handleSubmission = () => {
    if (isFileUploaded) {
      toast.error('Already uploaded a file');
    } else if (isFilePicked) {
      const data = new FormData();
      for (var i = 0; i < selectedFile.length; i++) {
        data.append('file', selectedFile[i]);
      }
      axios.post("http://localhost:7000/upload", data, {
        onUploadProgress: ProgressEvent => {
          setLoaded(ProgressEvent.loaded / ProgressEvent.total*100);
        }
      })
      .then(res => {toast.success('Upload success'); setIsFileUploaded(true);})
      .catch(err => {toast.error('Upload fail')});      
    } else {
      toast.error('Please select a file first');
    }
  };

  const handleAnalysis = () => {
    if (isFileAnalyzed) {
      toast.error('Already analyzed the file');
    } else if (isFileUploaded) {
      toast.success('Start analyzing');
      fetch('http://localhost:7000/')
      .then(res => {toast.success('Analysis done'); setIsFileAnalyzed(true)})
      .catch(err => {toast.error('A error occured.')});
    } else {
      toast.error('Please upload a file first');
    }
  };

  const checkFileType = (event) => {
    const files = event.target.files;
    let err = '';
    for (var i = 0; i < files.length; i++) {
      if (files[i].name.split('.').pop() !== "vcf") {
        err = 'please upload vcf files';
      }
    }

    if (err !== '') {
      event.target.value = null;
      toast.error('Please upload vcf files');
      return false;
    }
    return true;
  }

  // clean './public' when refreshing the page
  useEffect(() => {
    fetch('http://localhost:7000/clean');
  }, [])

  return (
    <div className="container">
      <h3>Upload your vcf file here</h3>
      <div className="form-group">
        <ToastContainer />
      </div>
      <div className="row">
        <div className="offset-md-3 col-md-6">

          <div className="form-group files">
            <input type="file" name="file" multiple
                   className="form-contr" onChange={changeHandler} />
          </div>

          <Progress max="100" 
                      color="success" 
                      value={loaded}>
              {Math.round(loaded,2)}%
            </Progress>

          <button type="button" 
                  className="btn btn-success btn-block"
                  onClick={handleSubmission}>
            Upload
          </button>

        </div>
      </div>

      <button type="button" 
              className="btn btn-primary btn-block"
              onClick={handleAnalysis}>
            Start analysis
      </button>

    </div>
  );
}

export default FileUpload;