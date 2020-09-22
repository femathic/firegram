import React, { useState, useEffect } from 'react';
import useStorage from '../hooks/useStorage';

const ProgressBar = (props: any):JSX.Element => {
  const { file, setFile } = props;
  const { url, progress } = useStorage(file);

  useEffect(() => {
    if (url) setFile(null);
  }, [url, setFile]);
  return (
    <div className="shadow w-full bg-grey-light rounded-lg h-2">
      <div
        className="py-1 rounded-lg bg-red-500 h-2"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const UploadForm = ():JSX.Element => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  const chooseImage = (e:any) => {
    const selected = e.target.files[0];
    if (selected && allowedImageTypes.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setError('Please select a valid image file (png or jpeg)');
      setFile(null);
    }
  };

  return (
    <form className="max-w-screen-lg mx-auto">
      <div className="flex justify-center">
        <label htmlFor="upload" className="inline cursor-pointer">
          <i className="fas fa-plus-circle text-red-500 fa-lg my-3" />
          <input id="upload" type="file" accept=".jpeg, .png, .jpg" onChange={chooseImage} className="hidden" />
        </label>
      </div>
      <div>
        {error && <p className="error">{error}</p>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
