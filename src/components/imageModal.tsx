import React from 'react';
import { ImageInterface } from '../utils/interface';

const Modal = ({ selectedImage }: { selectedImage: ImageInterface | null }) => {
  return (
    <div>
      {selectedImage && <img src={selectedImage.url} alt={selectedImage.name} />}
    </div>
  );
};

export default Modal;


