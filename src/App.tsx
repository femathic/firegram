import React, { useState, useEffect } from 'react';
import Title from './components/title';
import UploadForm from './components/UploadForm';
import ImageGrid from './components/ImageGrid';

const App = () => {
  const [darkMode, setDarkMode] = useState(Boolean(localStorage.getItem('darkMode')));
  useEffect(() => {
    const metaColor: any = document.querySelector('meta[name="theme-color"]');
    if (darkMode) {
      localStorage.setItem('darkMode', 'true');
      metaColor.setAttribute('content', '#4a5568');
    } else {
      localStorage.removeItem('darkMode');
      metaColor.setAttribute('content', '#FB5C00');
    }
  }, [darkMode]);
  return (
    <div className={`${darkMode ? 'scheme-dark' : ''}`}>
      <div className="text-white bg-white dark:bg-gray-800 dark:hover:text-red-60 min-h-screen transition duration-500 ease-in">
        <Title darkMode={darkMode} setDarkMode={setDarkMode} />
        <UploadForm />
        <ImageGrid />
      </div>
    </div>
  );
};

export default App;
