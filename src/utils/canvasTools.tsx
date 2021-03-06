// Download a Base64-encoded file
export function downloadBase64File(base64Data, filename) {
  const element = document.createElement('a');
  element.setAttribute('href', base64Data);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Convert a Base64-encoded string to a File object
export function base64StringToFile(base64String, filename) {
  const arr = base64String.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    n -= 1;
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

// Extract n Base64 Image's File Extension
export function extractImageFileExtensionFromBase64(base64Data) {
  return base64Data.substring(
    'data:image/'.length,
    base64Data.indexOf(';base64'),
  );
}

// Base64 Image to Canvas
export function image64ToCanvasRef(canvasRef, image64, pixelCrop) {
  const canvas = canvasRef; // document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');
  const image = new Image();
  image.src = image64;
  image.onload = () => {
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );
  };
}

// Image file to url
export function imageFileToBlob(file) {
  const url = URL.createObjectURL(file);
  return url;
}

// Image file to url
export function imageFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// Image blob to  base64
export function imageBlobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// Get cropped image
// export const getCroppedImg = (image, crop, fileName) => {
//   console.log(image)
//   const canvas = document.createElement('canvas');
//   const scaleX = image.naturalWidth / image.width;
//   const scaleY = image.naturalHeight / image.height;
//   canvas.width = crop.width;
//   canvas.height = crop.height;
//   const ctx = canvas.getContext('2d');

//   if (ctx) {
//     ctx.drawImage(
//       image,
//       crop.x * scaleX,
//       crop.y * scaleY,
//       crop.width * scaleX,
//       crop.height * scaleY,
//       0,
//       0,
//       crop.width,
//       crop.height,
//     );
//   }

//   return new Promise((resolve, reject) => {
//     canvas.toBlob((blob: any) => {
//       if (!blob) {
//         reject(new Error('Canvas is empty'));
//         return;
//       }
//       blob.name = fileName;
//       // resolve(window.URL.createObjectURL(blob));
//       resolve(blob);
//     }, 'image/jpeg', 1);
//   });
// };

export const getCroppedImg = (image, crop, fileName) => {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const originWidth = crop.width * scaleX;
  const originHeight = crop.height * scaleY;
  // maximum width/height
  const maxWidth = 700;
  const maxHeight = 700 / (16 / 9);
  let targetWidth = originWidth;
  let targetHeight = originHeight;
  if (originWidth > maxWidth || originHeight > maxHeight) {
    if (originWidth / originHeight > maxWidth / maxHeight) {
      targetWidth = maxWidth;
      targetHeight = Math.round(maxWidth * (originHeight / originWidth));
    } else {
      targetHeight = maxHeight;
      targetWidth = Math.round(maxHeight * (originWidth / originHeight));
    }
  }
  // set canvas size
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      targetWidth,
      targetHeight,
    );
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob: any) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        blob.name = fileName;
        // window.URL.revokeObjectURL(this.fileUrl);
        // this.fileUrl = window.URL.createObjectURL(blob);
        resolve(blob);
      },
      'image/webp',
      1,
    );
  });
};
