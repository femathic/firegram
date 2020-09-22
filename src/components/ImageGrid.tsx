import React from 'react';
import useFirestore from '../hooks/useFirestore';

const ImageGrid = ():JSX.Element => {
  const { docs }: { docs: any } = useFirestore('images');
  console.log(docs);
  return (
    <div className="flex flex-wrap max-w-screen-lg my-8 mx-auto rounded-lg">
      {docs
        ? docs.map((image: any) => (
          <div key={image.id} className="w-full md:w-1/2 lg:w-1/3 h-full p-6 pb-64 hover:opacity-75 overflow-hidden relative">
            <img className="min-w-full min-h-full absolute" src={image.url} alt={image.name} />
          </div>
        ))
        : <p className="w-full text-center text-red-200 font-medium text-sm">loading...</p>}
    </div>
  );
};

export default ImageGrid;
