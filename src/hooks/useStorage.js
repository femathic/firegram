import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../firebase/config';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  useEffect(() => {
    // references
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection('images');

    storageRef.put(file).on(
      'state_changed',
      (snap) => {
        const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => setError(err),
      async () => {
        const fileUrl = await storageRef.getDownloadURL();
        collectionRef.add({ url: fileUrl, createdAt: timestamp(), name: file.name });
        setUrl(fileUrl);
      },
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
