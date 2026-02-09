import React from 'react';
import { motion } from 'framer-motion';
import swal from '@sweetalert/with-react';
import useFirestore from '../hooks/useFirestore';
import { projectFirestore } from '../firebase/config';
import { ImageInterface } from '../utils/interface';
import useUpdateLogger from '../hooks/useUpdateLogger';
import Loader from './loader';

const ImageGrid = () => {
  const { docs }: { docs: ImageInterface[] } = useFirestore('images');
  useUpdateLogger(docs);

  const downloadImage = async (img: ImageInterface) => {
    try {
      const res = await fetch(img.url);
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = img.name || 'image';
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      window.open(img.url, '_blank');
    }
  };

  const showImage = (image: ImageInterface) => {
    swal({
      content: (
        <div className="relative">
          <motion.img
            src={image.url}
            alt={image.name}
            className="min-w-full min-h-full shadow-lg rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              swal.close();
            }}
            style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
            className="absolute top-4 right-4 px-3 py-2 rounded-full text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 hover:bg-black/70"
            aria-label="Close"
          >
            <i className="fas fa-times" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              downloadImage(image);
            }}
            style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
            className="absolute bottom-4 right-4 px-3 py-2 rounded-full text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 hover:bg-black/70"
            aria-label="Download"
          >
            <i className="fas fa-download" aria-hidden="true" />
          </button>
        </div>
      ),
      buttons: false,
    });
  };

  const deleteImage = async (e: React.MouseEvent, image: ImageInterface) => {
    e.stopPropagation();
    const result = await swal({
      title: 'Delete image?',
      icon: 'warning',
      buttons: { cancel: true, confirm: true },
      dangerMode: true,
    });
    if (result?.isConfirmed === true || result === true) {
      try {
        await projectFirestore.collection('images').doc(image.id).delete();
      } catch (err) {
        swal({ title: 'Failed to delete', icon: 'error' });
      }
    }
  };

  return (
    <>
      {docs.length > 0 ? (
        <div className="max-w-screen-lg mx-4 pt-8 pb-12 lg:mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          { docs.map((image) => (
            <div
              key={image.id}
              className="group relative py-2 md:py-0 px-5 sm:px-2 md:px-1"
            >
              <motion.button
                type="button"
                layout
                onClick={(): void => showImage(image)}
                style={{ opacity: 0.95 }}
                className="focus:outline-none w-full"
                whileHover={{ scale: 1.1, opacity: 1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.95 }}
              >
                <img src={image.url} alt={image.name} width="1000" height="1000" className="min-w-full min-h-full shadow-xl rounded" loading="lazy" />
              </motion.button>
              <button
                type="button"
                onClick={(e): void => { deleteImage(e, image); }}
                style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                className="absolute bottom-2 right-2 px-3 py-2 rounded-full text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 hover:bg-black/70"
                aria-label="Delete image"
              >
                <i className="fas fa-trash-alt drop-shadow-lg" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ImageGrid;
