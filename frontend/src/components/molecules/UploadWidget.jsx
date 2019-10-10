import React, { useState } from "react";

import axios from "axios";

function UploadWidget() {
  const [file, setFile] = useState(null);

  const onChange = e => {
    setFile(e.target.files[0]);
  };

  const onClick = e => {
    const data = new FormData();
    data.append("file", file);
    axios.post("/upload", data, {}).then(res => {
      console.log(res.statusText);
    });
  };

  return (
    <div>
      <input type="file" name="file" onChange={onChange} />
      <button type="button" onClick={onClick}>
        Upload
      </button>
    </div>
  );
}

export default UploadWidget;
