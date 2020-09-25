import React, { useState } from 'react';
// import ProgressBar from './progressBar';
import ImageCrop from './imageCrop';

const UploadForm = () => {
  const [file, setFile] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);
  const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  const chooseImage = (e: React.SyntheticEvent<EventTarget>): void => {
    const selected: any = (e.target as HTMLFormElement).files[0];
    if (selected && allowedImageTypes.includes(selected.type)) {
      setFile(selected);
      setError(null);
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
        {error && <p className="text-center text-xs text-red-200">{error}</p>}
        {/* {file && <ProgressBar file={file} setFile={setFile} />} */}
        {file && <ImageCrop file={file} setFile={setFile} />}
        {/* <ImageCrop file={{}} setFile={setFile} /> */}
      </div>
    </form>
  );
};

export default UploadForm;
