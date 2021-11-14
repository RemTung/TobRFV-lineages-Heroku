// see https://www.pluralsight.com/guides/uploading-files-with-reactjs for help
// see https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/ for help

import React, {useState} from 'react';

function FileUpload(props) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    // event.target.files is an object that contains the details of the files selected
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    // const data = new FormData();
    // data.append('file', selectedFile);
  };


  return (
    <div className="container">
      <h3>Upload your fasta file here</h3>
      <div className="row">
        <div className="offset-md-3 col-md-6">

          <div className="form-group files">
            <input type="file" name="file" 
                   className="form-contr" onChange={changeHandler} />
          </div>
          <button type="button" 
                  className="btn btn-success btn-block"
                  onClick={handleSubmission}>
            Upload
          </button>

        </div>
      </div>
    </div>
  );
}

export default FileUpload;