import React, { useState } from 'react';
import Title from './components/title';
import UploadForm from './components/UploadForm';
import ImageGrid from './components/ImageGrid';
import Modal from './components/imageModal';
import { ImageInterface } from './utils/interface';

const App = () => {
  const [selectedImage, setSelectedImage] = useState<ImageInterface | null>(null);
  return (
    <div>
      <Title />
      <UploadForm />
      <ImageGrid setSelectedImage={setSelectedImage} />
      <Modal selectedImage={selectedImage} />
    </div>
  );
};

export default App;
