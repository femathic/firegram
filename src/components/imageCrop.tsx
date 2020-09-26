// import React, { useState, useEffect, createRef } from 'react';
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';
// import {
//   base64StringToFile,
//   downloadBase64File,
//   extractImageFileExtensionFromBase64,
//   image64ToCanvasRef,
//   ImageFileToBase64,
//   getCroppedImg,
// } from '../utils/canvasTools';

// const ImageCrop = ({ file, setFile }: { file: object, setFile: Function }) => {
//   const [crop, setCrop] = useState({ aspect: 1 / 1 });
//   const [imageString, setImageString] = useState(null);
//   const [cropString, setCropString] = useState('');
//   const [croppedAvailable, setCroppedAvailable] = useState(false);
//   const imageCanvasRef: any = createRef();

//   useEffect(() => {
//     if (file) {
//       ImageFileToBase64(file).then((result: any) => setImageString(result));
//     } else {
//       setImageString(null);
//     }
//     return () => setImageString(null);
//   }, [file]);

//   const handleChangeCrop = (newCrop) => {
//     setCrop(newCrop);
//     if (newCrop.width) {
//       setCroppedAvailable(true);
//     } else {
//       setCroppedAvailable(false);
//     }
//     console.log('crop', newCrop);
//   };

//   const handleCropComplete = (newCrop, cropPixel) => {
//     console.log('pixel crop', cropPixel);
//     const canvasRef = imageCanvasRef.current;
//     image64ToCanvasRef(canvasRef, imageString, cropPixel);
//     getCroppedImg(file, crop, 'newFile.jpeg').then((img: any) => setCropString(img));
//   };

//   const uploadCroppedImage = () => {
//     const canvasRef = imageCanvasRef.current;
//     const fileExtension = extractImageFileExtensionFromBase64(imageString);
//     const fileName = `previewFile.${fileExtension}`;
//     const croppedImageData64 = canvasRef.toDataURL(`image/${fileExtension}`);
//     // file to upload
//     const newCroppedFile = base64StringToFile(croppedImageData64, fileName);
//     console.log(newCroppedFile);
//     // file to download
//     downloadBase64File(croppedImageData64, fileName);
//   };

//   return (
//     <div className="fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center" style={{ background: 'rgba(0,0,0,.7)' }}>
//       <div className="border border-red-100 shadow-lg modal-container bg-white w-11/12 md:max-w-lg mx-auto rounded shadow-lg z-50 overflow-y-auto">
//         <div className="py-4 text-left px-6">
//           <div className="flex justify-between items-center pb-3">
//             <p className="text-2xl font-bold">Crop your image</p>
//             <button type="button" className="cursor-pointer focus:outline-none z-50" onClick={() => setFile(null)}>
//               <i className="fas fa-times" />
//             </button>
//           </div>
//           <div className="m-0 md:m-8 h-full h-10/12 lg:h-1/2">
//             <ReactCrop
//               src={imageString}
//               crop={crop}
//               onComplete={handleCropComplete}
//               onChange={handleChangeCrop}
//             />
//             {cropString && (
//               <img alt="Crop" style={{ maxWidth: '100%' }} src={cropString} />
//             )}
//             <canvas ref={imageCanvasRef}> </canvas>
//           </div>
//           <div className="flex justify-center pt-2">
//             {croppedAvailable
//               && (
//               <button type="button" onClick={uploadCroppedImage} className="focus:outline-none shadow text-white px-4 bg-red-500 p-3 rounded hover:bg-red-400">
//                 Upload Image
//               </button>
//               )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { getCroppedImg } from '../utils/canvasTools';

const ImageCrop = ({ file, setFile }: { file: any, setFile: Function }) => {
  const [src, setSrc] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [cropDetails, setCropDetails] = useState({
    unit: '%',
    width: 30,
    aspect: 1 / 1,
  });
  const [croppedImageUrl, setCroppedImageUrl] = useState('');

  useEffect(() => {
    if (file) {
      const reader: any = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(file);
    } else {
      setSrc(null);
    }
    return () => setSrc(null);
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

  const uploadCroppedImage = () => { };

  return (
    <div className="fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center" style={{ background: 'rgba(0,0,0,.7)' }}>
      <div className="border border-red-100 shadow-lg modal-container bg-white w-11/12 md:max-w-lg mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Crop your image</p>
            <button type="button" className="cursor-pointer focus:outline-none z-50" onClick={() => setFile(null)}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="m-0 md:m-8 h-full h-10/12 lg:h-1/2">
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
              <img alt="Crop" className="mw-100 hidden" src={croppedImageUrl} />
            )}
          </div>
          <div className="flex justify-center pt-2">
            {(imageRef && cropDetails.width)
              ? (
                <button type="button" onClick={uploadCroppedImage} className="focus:outline-none shadow text-white px-4 bg-red-500 p-3 rounded hover:bg-red-400">
                  Upload Image
                </button>
              )
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImageCrop;
