import React, { useState } from 'react';
import { motion } from 'framer-motion';
import swal from '@sweetalert/with-react';
import useFirestore from '../hooks/useFirestore';
import { ImageInterface } from '../utils/interface';

const ImageGrid = () => {
  const { docs }: { docs: ImageInterface[] } = useFirestore('images');
  const [scroll, setScroll] = useState({ x: 0, y: 0 });
  window.addEventListener(
    'scroll',
    () => {
      setScroll({ ...scroll, x: window.scrollX, y: window.scrollY });
    },
    false,
  );

  const showImage = (image: ImageInterface) => {
    swal({
      content: (
        <motion.img
          src={image.url}
          alt={image.name}
          className="min-w-full min-h-full shadow-lg rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
      ),
      buttons: false,
    });
  };

  return (
    <div className="max-w-screen-lg mx-4 my-8 lg:mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {docs ? (
        docs.map((image) => (
          <motion.button
            key={image.id}
            type="button"
            layout
            onClick={(): void => showImage(image)}
            style={{ opacity: 0.95 }}
            className="focus:outline-none"
            whileHover={{ scale: 1.1, opacity: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            // transition={{ delay: 1 }}
          >
            <img src={image.url} alt={image.name} className="min-w-full min-h-full shadow-lg rounded" loading="lazy" />
          </motion.button>
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
