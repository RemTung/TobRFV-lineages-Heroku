// see https://www.pluralsight.com/guides/uploading-files-with-reactjs for help

import React, {useState} from 'react'

function FileUpload(props) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    // event.target.files is an object that contains the details of the files selected
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {};

  return (
    <div>
      <h3>Upload your fasta file here</h3>
      <input type="file" name="file" onChange={changeHandler} />
      {isFilePicked && (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size: {selectedFile.size} bytes</p>
        </div>
      )}
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  );
}

export default FileUpload;