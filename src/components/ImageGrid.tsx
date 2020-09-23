import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { ImageInterface } from '../utils/interface';

const ImageGrid = ({ setSelectedImage }: { setSelectedImage : Function }) => {
  const { docs }: { docs: ImageInterface[] } = useFirestore('images');
  return (
    <div className="flex flex-wrap max-w-screen-lg my-8 mx-auto rounded-lg">
      {docs ? (
        docs.map((image) => (
          <div key={image.id} className="w-full md:w-1/2 lg:w-1/3 h-full p-6 pb-64 hover:opacity-75 overflow-hidden relative">
            <button type="button" onClick={(): void => setSelectedImage(image)}>
              <img className="min-w-full min-h-full absolute top-0 left-0 m-8" src={image.url} alt={image.name} />
            </button>
          </div>
        ))
      ) : (
        <p className="w-full text-center text-red-200 font-medium text-sm">
          loading...
        </p>
      )}
    </div>
  );
};

export default ImageGrid;
