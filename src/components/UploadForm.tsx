import React, { useState, useEffect } from 'react';
import swal from '@sweetalert/with-react';
import ProgressBar from './progressBar';
import ImageCrop from './imageCrop';

const UploadForm = () => {
  const [file, setFile] = useState<object | null>(null);
  const [croppedFile, setCroppedFile] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageInputKey, setImageInputKey] = useState<number>(0);
  const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  useEffect(() => {
    const closeCrop = () => {
      swal.close();
      setFile(null);
      setImageInputKey(imageInputKey + 1);
    };

    if (file) {
      swal({
        content: (<ImageCrop file={file} setCroppedFile={setCroppedFile} closeCrop={closeCrop} />),
        buttons: false,
        closeOnClickOutside: false,
      });
    }
    return () => setFile(null);
  }, [file, imageInputKey]);

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
          <i className="fas fa-plus-circle text-red-400 dark:text-gray-300 fa-lg my-3 hover:opacity-75" />
          <input key={imageInputKey} id="upload" type="file" accept=".jpeg, .png, .jpg" onChange={chooseImage} className="hidden" aria-hidden="true" />
        </label>
      </div>
      <div>
        {error && <p className="text-center text-xs text-red-200">{error}</p>}
        {croppedFile && <ProgressBar croppedFile={croppedFile} setCroppedFile={setCroppedFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
