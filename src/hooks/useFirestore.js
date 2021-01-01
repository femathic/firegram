import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

// import firebase from 'firebase/app';
// import 'firebase/auth'; // This line is important
// const googleProvider = new firebase.auth.GoogleAuthProvider();

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsubscribe = projectFirestore.collection(collection)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        const document = [];
        snap.forEach((doc) => {
          document.push({ ...doc.data(), id: doc.id });
        });
        setDocs(document);
      });
    return () => unsubscribe();
  }, [collection]);

  return { docs };
};

export default useFirestore;
