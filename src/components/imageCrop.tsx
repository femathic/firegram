import React, { useState, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { getCroppedImg, base64StringToFile, imageBlobToBase64 } from '../utils/canvasTools';

const ImageCrop = (props: any) => {
  const { file, setCroppedFile, closeCrop }
    : { file: any, setCroppedFile: Function, closeCrop: Function } = props;

  const [src, setSrc] = useState('');
  const [imageRef, setImageRef] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState('');
  const [cropDetails, setCropDetails] = useState({ unit: '%', width: 30, aspect: 1 / 1 });

  useEffect(() => {
    if (file) {
      const reader: any = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(file);
    } else {
      setSrc('');
    }
    return () => setSrc('');
  }, [file]);

  const onImageLoaded = (image) => {
    setImageRef(image);
  };

  const onCropComplete = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const cropUrl: any = await getCroppedImg(imageRef, crop, 'newFile.jpeg');
      setCroppedImageUrl(cropUrl);
    }
  };

  const onCropChange = (crop) => {
    setCropDetails(crop);
  };

  const getCroppedImageFile = async () => {
    const croppedImageBase64 = await imageBlobToBase64(croppedImageUrl);
    // file to upload
    const croppedImageFile = base64StringToFile(croppedImageBase64, `${Date.now()}.jpg`);
    setCroppedFile(croppedImageFile);
    closeCrop();
    // file to download
    // downloadBase64File(croppedImageBase64, `${Date.now()}.jpg`);
  };

  return (
    <div className="py-4 text-left px-4">
      <div className="flex justify-between items-center pb-3">
        <p className="text-lg text-center font-medium text-red-400 border-b-2 border-gray-300">Crop your image</p>
        <button type="button" className="cursor-pointer focus:outline-none z-50" onClick={() => closeCrop()}>
          <i className="fas fa-times" />
        </button>
      </div>
      <div className="flex justify-center m-0 md:m-8 h-10/12 lg:h-5/12">
        {src && (
        <ReactCrop
          src={src}
          crop={cropDetails}
          ruleOfThirds
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
        />
        )}
        {croppedImageUrl && (
        <img alt="Crop" className="mw-100 hidden" src={window.URL.createObjectURL(croppedImageUrl)} />
        )}
      </div>
      <div className="flex justify-center text-white pt-2">
        {(imageRef && cropDetails.width)
          ? (
            <button type="button" onClick={getCroppedImageFile} className="focus:outline-none shadow px-3 bg-red-500 py-2 text-sm rounded hover:bg-red-400">
              Upload Image
            </button>
          )
          : null}
      </div>
    </div>
  );
};
export default ImageCrop;
