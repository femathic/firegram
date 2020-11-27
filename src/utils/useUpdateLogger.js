import { useEffect } from 'react';

export default function useUpdateLogger(variable, callback = console.info) {
  useEffect(() => callback(variable), [variable, callback]);
  // useEffect(() => callback(`%c ${variable}`, 'background: #000; color: #fff'), [variable, callback]);
}

import React, { useEffect, Suspense } from 'react';
import Loader from './components/loader';
import useLocalStorage from './utils/useLocalStorage';
import useUpdateLogger from './utils/useUpdateLogger';


const Title = React.lazy(() => import('./components/title'));

const App = () => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  useEffect(() => {
    const metaColor = document.querySelector('meta[name="theme-color"]');
    if (darkMode) {
      metaColor.setAttribute('content', '#191B25');
    } else {
      metaColor.setAttribute('content', '#FFFFFF');
    }
  }, [darkMode]);

  useUpdateLogger(darkMode);

  return (
    <div className={`${darkMode ? 'scheme-dark' : ''}`}>
      <div className="text-white bg-white dark:bg-gray-800 dark:hover:text-red-600 min-h-screen transition duration-500 ease-in">
        <Suspense fallback={<Loader/>}>
          <Title toggleDarkMode={() => setDarkMode(!darkMode)} />
        </Suspense>
      </div>
    </div>
  );
};

export default App;