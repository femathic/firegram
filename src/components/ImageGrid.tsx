import React from 'react';
import { motion } from 'framer-motion';
import swal from '@sweetalert/with-react';
import useFirestore from '../hooks/useFirestore';
import { ImageInterface } from '../utils/interface';
import useUpdateLogger from '../hooks/useUpdateLogger';
import Loader from './loader';

const ImageGrid = () => {
  const { docs }: { docs: ImageInterface[] } = useFirestore('images');
  useUpdateLogger(docs);

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
    <>
      {docs.length > 0 ? (
        <div className="max-w-screen-lg mx-4 pt-8 pb-12 lg:mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          { docs.map((image) => (
            <motion.button
              key={image.id}
              type="button"
              layout
              onClick={(): void => showImage(image)}
              style={{ opacity: 0.95 }}
              className="focus:outline-none py-2 md:py-0 px-5 sm:px-2 md:px-1"
              whileHover={{ scale: 1.1, opacity: 1 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
            >
              <img src={image.url} alt={image.name} width="1000" height="1000" className="min-w-full min-h-full shadow-xl rounded" loading="lazy" />
            </motion.button>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ImageGrid;
