import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useStorage from '../hooks/useStorage';

const ProgressBar = (props: any) => {
  const { croppedFile, setCroppedFile }: { croppedFile: object, setCroppedFile: Function } = props;
  const { url, progress }: { url: null | string, progress: number } = useStorage(croppedFile);

  useEffect(() => {
    if (url) setCroppedFile(null);
  }, [url, setCroppedFile]);

  return (
    <div className="shadow w-1/2 mx-auto bg-grey-light rounded h-1">
      <motion.div
        className="rounded-lg bg-red-300 h-1"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
