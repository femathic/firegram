import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';

const ProgressBar = ({ file, setFile }: { file: object, setFile: Function }) => {
  const { url, progress }: { url: null | string, progress: number } = useStorage(file);

  useEffect(() => {
    if (url) setFile(null);
  }, [url, setFile]);

  return (
    <div className="shadow w-1/2 mx-auto bg-grey-light rounded h-1">
      <div
        className="rounded-lg bg-red-300 h-1"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
