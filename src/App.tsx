import React, { useEffect, Suspense } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import useUpdateLogger from './hooks/useUpdateLogger';
// import Loader from './components/loader';

const Title = React.lazy(() => import('./components/title'));
const UploadForm = React.lazy(() => import('./components/UploadForm'));
const ImageGrid = React.lazy(() => import('./components/imageGrid'));
const Loader = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div
      className="animate-spin ease-linear rounded-full border-8 border-t-8 border-gray-400 dark:border-gray-200 h-20 w-20"
      style={{ borderTopColor: '#FB5C00' }}
    />
  </div>
);

const App = () => {

  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  useEffect(() => {
    const metaColor: any = document.querySelector('meta[name="theme-color"]');
    if (darkMode) {
      metaColor.setAttribute('content', '#4a5568');
    } else {
      metaColor.setAttribute('content', '#FB5C00');
    }
  }, [darkMode]);

  useUpdateLogger(darkMode, console.info);

  return (
    <div className={`${darkMode ? 'scheme-dark' : ''}`}>
      <div className="text-white bg-white dark:bg-gray-800 dark:hover:text-red-60 min-h-screen transition duration-500 ease-in">
        <Suspense fallback={<Loader />}>
          <Title darkMode={darkMode} setDarkMode={setDarkMode} />
          <UploadForm />
          <ImageGrid />
        </Suspense>
      </div>
    </div>
  );

};

export default App;
