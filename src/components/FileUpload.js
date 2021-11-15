// see https://www.pluralsight.com/guides/uploading-files-with-reactjs for help
// see https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/ for help

import React, {useState} from 'react';
import axios from 'axios';
import {Progress} from 'reactstrap';

function FileUpload(props) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [loaded, setLoaded] = useState(0);

  const changeHandler = (event) => {
    // event.target.files is an object that contains the details of the files selected
    setSelectedFile(event.target.files);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    if (isFilePicked) {
      const data = new FormData();
      for (var i = 0; i < selectedFile.length; i++) {
        data.append('file', selectedFile[i]);
      }
      axios.post("http://localhost:8000/upload", data, {
        onUploadProgress: ProgressEvent => {
          setLoaded(ProgressEvent.loaded / ProgressEvent.total*100);
        }
      })
      .then(res => {console.log(res.statusText)})
    }
  };

  return (
    <div className="container">
      <h3>Upload your fasta file here</h3>
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
                  className="btn btn-primary btn-block"
                  onClick={handleSubmission}>
            Upload
          </button>

        </div>
      </div>
    </div>
  );
}

export default FileUpload;